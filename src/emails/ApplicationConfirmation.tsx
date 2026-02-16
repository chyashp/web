import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
} from '@react-email/components'
import * as React from 'react'

// Define all styles as React.CSSProperties objects
const main: React.CSSProperties = {
  backgroundColor: '#ffffff',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container: React.CSSProperties = {
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '580px',
}

const h1: React.CSSProperties = {
  color: '#1a365d',
  fontSize: '24px',
  fontWeight: '600',
  lineHeight: '1.25',
  padding: '17px 0 0',
  textTransform: 'lowercase' as const,
}

const text: React.CSSProperties = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '1.5',
  textTransform: 'lowercase' as const,
}

interface ApplicationConfirmationEmailProps {
  missionId: string
  applicationId: string
}

export default function ApplicationConfirmationEmail({
  missionId,
  applicationId,
}: ApplicationConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your nanushi mission application has been received</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Application Received</Heading>
          <Text style={text}>
            Thank you for applying to join our mission! We&apos;ve received your
            application and will review it shortly.
          </Text>
          <Text style={text}>
            You can track your application status here:
            <Link
              href={`https://nanushi.org/missions/${missionId}/applications/${applicationId}`}
              style={text}
            >
              View Application Status
            </Link>
          </Text>
          <Text style={text}>
            We&apos;ll notify you of any updates to your application status.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

// Email styles... 