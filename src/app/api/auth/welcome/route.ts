import { Resend } from 'resend'
import WelcomeEmail from '@/emails/WelcomeEmail'

const resend = new Resend(process.env.RESEND_API_KEY || 'placeholder')

export async function POST(request: Request) {
  try {
    console.log('Starting welcome email process')
    
    // Log if we have the API key
    console.log('Resend API key exists:', !!process.env.RESEND_API_KEY)
    
    const { email } = await request.json()
    console.log('Attempting to send welcome email to:', email)
    
    try {
      const result = await resend.emails.send({
        from: 'nanushi <no-reply@nanushi.org>',
        to: email,
        subject: 'welcome to nanushi',
        react: WelcomeEmail(),
      })
      
      console.log('Resend API response:', result)
      return Response.json({ success: true })
      
    } catch (sendError: unknown) {
      if (sendError instanceof Error) {
        console.error('Resend API error:', {
          message: sendError.message,
          name: sendError.name,
          stack: sendError.stack
        })
      }
      throw sendError
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Welcome email route error:', {
        message: error.message,
        stack: error.stack
      })
      return Response.json({ error: 'Failed to send welcome email', details: error.message }, { status: 500 })
    }
    return Response.json({ error: 'Failed to send welcome email' }, { status: 500 })
  }
} 