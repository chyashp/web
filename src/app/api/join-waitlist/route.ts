import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Basic validation
    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      );
    }

    // Here you would typically:
    // 1. Validate the email format
    // 2. Store the email in your database
    // 3. Maybe send a confirmation email
    // 4. Integrate with your waitlist service (like Mailchimp, ConvertKit, etc.)
    
    // For now, we'll just log it and return success
    console.log(`Adding email to waitlist: ${email}`);
    
    // Mock successful submission
    return NextResponse.json(
      { 
        success: true, 
        message: 'Successfully joined the waitlist' 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing waitlist join:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'An error occurred while processing your request' 
      },
      { status: 500 }
    );
  }
} 