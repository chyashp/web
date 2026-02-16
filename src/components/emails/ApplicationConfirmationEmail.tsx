import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from '@react-email/components'

interface ApplicationConfirmationEmailProps {
  name: string
  missionTitle: string
  weeklyCommitment: string
}

export default function ApplicationConfirmationEmail({
  name,
  missionTitle,
  weeklyCommitment,
}: ApplicationConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>thanks for applying to join the mission!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>application received</Heading>
          
          <Text style={text}>hi {name.toLowerCase()},</Text>
          
          <Text style={text}>
            thank you for applying to the mission: <strong>{missionTitle.toLowerCase()}</strong>
          </Text>

          <Text style={text}>
            we&apos;ve received your application with a commitment of {weeklyCommitment.toLowerCase()} hours per week.
            our team will review your application and get back to you soon.
          </Text>

          <Text style={text}>
            in the meantime, if you have any questions, feel free to reach out to us at hello@nanushi.org
          </Text>

          <Text style={text}>
            best regards,<br />
            the nanushi team
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

const main: React.CSSProperties = {
  backgroundColor: '#ffffff',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  textTransform: 'lowercase'
}

const container: React.CSSProperties = {
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '560px',
}

const h1: React.CSSProperties = {
  color: '#1a365d',
  fontSize: '24px',
  fontWeight: '600',
  lineHeight: '40px',
  margin: '0 0 20px',
  textTransform: 'lowercase'
}

const text: React.CSSProperties = {
  color: '#000',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '0 0 16px',
  textTransform: 'lowercase'
} 