import * as React from 'react';
import {
  Html,
  Body,
  Container,
  Text,
  Link,
  Hr,
  Preview
} from '@react-email/components';

interface WaitlistConfirmationEmailProps {
  email: string;
}

export const WaitlistConfirmationEmail: React.FC<WaitlistConfirmationEmailProps> = ({
  email
}) => (
  <Html>
    <Preview>Welcome to nanushi - thanks for joining our waitlist!</Preview>
    <Body style={{ backgroundColor: '#ffffff', fontFamily: 'system-ui' }}>
      <Container style={{ margin: '0 auto', padding: '20px 0 48px' }}>
        <Text style={{ fontSize: '28px', fontWeight: 'bold', textAlign: 'center' as const }}>
          Welcome to nanushi.
        </Text>
        <Text style={{ fontSize: '16px', lineHeight: '26px' }}>
          Thanks for joining our waitlist! We&apos;re excited to have you on board.
        </Text>
        <Text style={{ fontSize: '16px', lineHeight: '26px' }}>
          We&apos;ll keep you updated about:
        </Text>
        <Text style={{ fontSize: '16px', lineHeight: '26px', paddingLeft: '20px' }}>
          • Upcoming mission dates{'\n'}
          • Team formation opportunities{'\n'}
          • Project announcements{'\n'}
          • Early access to new features
        </Text>
        <Text style={{ fontSize: '16px', lineHeight: '26px' }}>
          In the meantime, you can learn more about how our product teams work and what to expect 
          in your upcoming mission.
        </Text>
        
        <Link
          href="https://nanushi.org/how-it-works"
          style={{
            display: 'inline-block',
            backgroundColor: '#FF6B2B',
            color: '#fff',
            padding: '12px 20px',
            borderRadius: '24px',
            textDecoration: 'none',
            textAlign: 'center' as const,
            fontSize: '16px',
            marginTop: '16px'
          }}
        >
          Learn More
        </Link>

        <Hr style={{ margin: '32px 0', borderColor: '#dddddd' }} />
        
        <Text style={{ fontSize: '14px', color: '#666666', marginTop: '12px' }}>
          You&apos;re receiving this email because {email} was added to the nanushi waitlist.
        </Text>
      </Container>
    </Body>
  </Html>
); 