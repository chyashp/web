import { Resend } from 'resend'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import ApplicationConfirmationEmail from '@/components/emails/ApplicationConfirmationEmail'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    // Create the Supabase client directly with cookies()
    const supabase = createRouteHandlerClient({ cookies })
    
    const body = await request.json()
    const { missionId, application } = body

    // Check for existing application
    const { data: existingApplication } = await supabase
      .from('mission_applications')
      .select('id')
      .eq('mission_id', missionId)
      .filter('application_data->>email', 'eq', application.email)
      .maybeSingle()

    if (existingApplication) {
      return NextResponse.json(
        { 
          error: 'You have already submitted an application for this mission with this email address',
          code: 'DUPLICATE_APPLICATION'
        },
        { status: 400 }
      )
    }

    // Get mission details for the email
    const { data: mission } = await supabase
      .from('missions')
      .select('title')
      .eq('id', missionId)
      .single()

    if (!mission) {
      return NextResponse.json(
        { error: 'Mission not found' },
        { status: 404 }
      )
    }

    // Insert application
    const { data, error } = await supabase
      .from('mission_applications')
      .insert([
        {
          mission_id: missionId,
          user_id: null,
          application_data: application,
          status: 'pending'
        }
      ])
      .select()
      .single()

    if (error) {
      console.error('Error inserting application:', error)
      return NextResponse.json(
        { error: 'Failed to submit application' },
        { status: 500 }
      )
    }

    // Send confirmation email with guaranteed mission data
    console.log(`Sending confirmation email to ${application.email} for mission: ${mission.title}`)
    
    await resend.emails.send({
      from: 'nanushi <hello@nanushi.org>',
      to: application.email,
      subject: `Application Received - ${mission.title}`,
      react: ApplicationConfirmationEmail({
        name: application.name,
        missionTitle: mission.title,
        weeklyCommitment: application.weeklyCommitment,
      })
    })
    
    console.log(`✅ Confirmation email sent successfully to ${application.email}`)

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Error in applications route:', error)
    if (error instanceof Error) {
      console.error('Email sending failed:', error.message)
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 