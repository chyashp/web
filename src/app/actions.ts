'use server'

import { supabase } from '@/lib/supabase'
import { User } from '@/lib/supabase'
import { Resend } from 'resend'
import { WaitlistConfirmationEmail } from '@/emails/WaitlistConfirmation'
import * as React from 'react'

const resend = new Resend(process.env.RESEND_API_KEY || 'placeholder')

export type WaitlistResponse = {
  success: boolean
  message: string
  data?: User | null
}

export async function joinWaitlist(email: string): Promise<WaitlistResponse> {
  try {
    // First check if user already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single()

    if (existingUser) {
      return {
        success: false,
        message: 'This email is already on our waitlist!',
        data: existingUser
      }
    }

    // Insert new user
    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          email,
          status: 'waitlist',
          created_at: new Date().toISOString()
        },
      ])
      .select()
      .single()

    if (error) {
      console.error('Error inserting user:', error)
      return {
        success: false,
        message: 'Something went wrong while joining the waitlist. Please try again.',
      }
    }

    // Send confirmation email
    try {
      await resend.emails.send({
        from: 'nanushi <hello@nanushi.org>',
        to: email,
        subject: 'Welcome to nanushi',
        react: React.createElement(WaitlistConfirmationEmail, { email })
      })
    } catch (emailError) {
      console.error('Error sending confirmation email:', emailError)
      // Don't return error to user since they're already added to waitlist
    }

    return {
      success: true,
      message: 'Successfully joined the waitlist!',
      data: data
    }
  } catch (error) {
    console.error('Error in joinWaitlist:', error)
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again later.',
    }
  }
} 