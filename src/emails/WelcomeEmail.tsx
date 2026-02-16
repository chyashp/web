import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from '@react-email/components'
import * as React from 'react'

export default function WelcomeEmail() {
  return (
    <Html>
      <Head />
      <Preview>Welcome to nanushi</Preview>
      <Body style={{
        backgroundColor: '#ffffff',
        fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
      }}>
        <Container style={{ margin: '0 auto', padding: '20px 0 48px', maxWidth: '580px' }}>
          <Heading style={{ color: '#1a365d', fontSize: '24px', fontWeight: '600', textTransform: 'lowercase' as const }}>
            welcome to nanushi!
          </Heading>
          <Text style={{ color: '#333', fontSize: '16px', textTransform: 'lowercase' as const }}>
            we&apos;re excited to have you join our community of developers. explore available missions and start your journey today.
          </Text>
        </Container>
      </Body>
    </Html>
  )
} 