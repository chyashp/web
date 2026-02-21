interface IllustrationProps {
  className?: string;
}

export function HeroIllustration({ className = "" }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 500 450"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="hero-orange" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FF6B2B" />
          <stop offset="100%" stopColor="#FF8F5E" />
        </linearGradient>
        <linearGradient id="hero-navy" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a365d" />
          <stop offset="100%" stopColor="#2a4a7f" />
        </linearGradient>
        <linearGradient id="hero-screen-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0f2440" />
          <stop offset="100%" stopColor="#1a365d" />
        </linearGradient>
        <radialGradient id="hero-ambient" cx="50%" cy="45%" r="45%">
          <stop offset="0%" stopColor="#FF6B2B" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#FF6B2B" stopOpacity="0" />
        </radialGradient>
        <filter id="hero-shadow">
          <feDropShadow dx="0" dy="5" stdDeviation="10" floodColor="#1a365d" floodOpacity="0.18" />
        </filter>
        <filter id="hero-glow">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Ambient background glow */}
      <ellipse cx="250" cy="210" rx="200" ry="160" fill="url(#hero-ambient)" />

      {/* Stacked browser windows — back layer */}
      <g filter="url(#hero-shadow)" opacity="0.5" transform="translate(95, 55)">
        <rect width="310" height="210" rx="12" fill="white" />
        <rect y="0" width="310" height="28" rx="12" fill="#f1f5f9" />
        <circle cx="16" cy="14" r="4" fill="#e2e8f0" />
        <circle cx="30" cy="14" r="4" fill="#e2e8f0" />
        <circle cx="44" cy="14" r="4" fill="#e2e8f0" />
      </g>

      {/* Main browser window — front layer */}
      <g filter="url(#hero-shadow)" transform="translate(110, 75)">
        <rect width="310" height="220" rx="12" fill="white" />
        <rect width="310" height="28" rx="12" fill="#f8fafc" />
        <rect x="0" y="16" width="310" height="12" fill="#f8fafc" />
        {/* Window dots */}
        <circle cx="18" cy="14" r="4.5" fill="#ff5f57" opacity="0.8" />
        <circle cx="34" cy="14" r="4.5" fill="#febc2e" opacity="0.8" />
        <circle cx="50" cy="14" r="4.5" fill="#28c840" opacity="0.8" />
        {/* URL bar */}
        <rect x="70" y="7" width="170" height="14" rx="7" fill="#f1f5f9" />
        <rect x="80" y="11" width="80" height="6" rx="3" fill="#1a365d" opacity="0.12" />
        <circle cx="230" cy="14" r="3" fill="#22c55e" opacity="0.4" />

        {/* App UI inside browser */}
        {/* Top nav */}
        <rect x="0" y="28" width="310" height="36" fill="#fafafa" />
        <rect x="16" y="36" width="50" height="8" rx="4" fill="url(#hero-orange)" opacity="0.7" />
        <rect x="16" y="48" width="30" height="4" rx="2" fill="#1a365d" opacity="0.15" />
        <rect x="200" y="38" width="45" height="22" rx="8" fill="url(#hero-orange)" opacity="0.8" />
        <rect x="212" y="44" width="22" height="4" rx="2" fill="white" opacity="0.9" />
        <rect x="212" y="50" width="16" height="3" rx="1.5" fill="white" opacity="0.5" />
        <rect x="255" y="42" width="40" height="14" rx="7" fill="#1a365d" opacity="0.06" />
        <rect x="263" y="46" width="24" height="6" rx="3" fill="#1a365d" opacity="0.2" />

        {/* Hero section of the app */}
        <rect x="16" y="72" width="180" height="10" rx="3" fill="#1a365d" opacity="0.6" />
        <rect x="16" y="88" width="140" height="8" rx="3" fill="#1a365d" opacity="0.25" />
        <rect x="16" y="100" width="160" height="6" rx="3" fill="#1a365d" opacity="0.12" />

        {/* CTA button in app */}
        <rect x="16" y="116" width="80" height="24" rx="12" fill="url(#hero-orange)" opacity="0.75" />
        <rect x="28" y="124" width="50" height="6" rx="3" fill="white" opacity="0.8" />

        {/* Cards row */}
        <rect x="16" y="152" width="88" height="60" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="0.8" />
        <rect x="24" y="160" width="30" height="30" rx="6" fill="#FF6B2B" opacity="0.08" />
        <g transform="translate(31, 167)">
          <path d="M8 0 L10 6 L16 8 L10 10 L8 16 L6 10 L0 8 L6 6 Z" fill="#FF6B2B" opacity="0.5" />
        </g>
        <rect x="24" y="196" width="60" height="4" rx="2" fill="#1a365d" opacity="0.25" />
        <rect x="24" y="204" width="40" height="3" rx="1.5" fill="#1a365d" opacity="0.12" />

        <rect x="112" y="152" width="88" height="60" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="0.8" />
        <rect x="120" y="160" width="30" height="30" rx="6" fill="#1a365d" opacity="0.06" />
        <g transform="translate(127, 168)">
          <path d="M0 6 L8 0 L16 6 L16 14 L0 14 Z" stroke="#1a365d" strokeWidth="1.2" fill="none" opacity="0.35" />
          <path d="M5 14 L5 9 L11 9 L11 14" stroke="#1a365d" strokeWidth="1" fill="none" opacity="0.25" />
        </g>
        <rect x="120" y="196" width="55" height="4" rx="2" fill="#1a365d" opacity="0.25" />
        <rect x="120" y="204" width="35" height="3" rx="1.5" fill="#1a365d" opacity="0.12" />

        <rect x="208" y="152" width="88" height="60" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="0.8" />
        <rect x="216" y="160" width="30" height="30" rx="6" fill="#FF6B2B" opacity="0.06" />
        <g transform="translate(224, 168)">
          <rect x="0" y="2" width="14" height="10" rx="2" stroke="#FF6B2B" strokeWidth="1.2" fill="none" opacity="0.4" />
          <line x1="0" y1="6" x2="14" y2="6" stroke="#FF6B2B" strokeWidth="0.8" opacity="0.3" />
          <rect x="3" y="0" width="3" height="4" rx="1" fill="#FF6B2B" opacity="0.3" />
          <rect x="9" y="0" width="3" height="4" rx="1" fill="#FF6B2B" opacity="0.3" />
        </g>
        <rect x="216" y="196" width="65" height="4" rx="2" fill="#1a365d" opacity="0.25" />
        <rect x="216" y="204" width="45" height="3" rx="1.5" fill="#1a365d" opacity="0.12" />
      </g>

      {/* Floating badge — top right: success notification */}
      <g filter="url(#hero-shadow)" transform="translate(400, 50)">
        <rect width="88" height="38" rx="19" fill="white" />
        <rect width="88" height="38" rx="19" stroke="#22c55e" strokeWidth="1" opacity="0.25" />
        <circle cx="22" cy="19" r="10" fill="#22c55e" opacity="0.12" />
        <path d="M18 19 L21 22 L27 16" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="40" y="12" width="38" height="5" rx="2.5" fill="#1a365d" opacity="0.35" />
        <rect x="40" y="21" width="26" height="4" rx="2" fill="#1a365d" opacity="0.15" />
      </g>

      {/* Floating badge — left: analytics mini */}
      <g filter="url(#hero-shadow)" transform="translate(20, 200)">
        <rect width="78" height="65" rx="12" fill="white" />
        <rect width="78" height="65" rx="12" stroke="#FF6B2B" strokeWidth="0.8" opacity="0.1" />
        <rect x="10" y="10" width="36" height="5" rx="2.5" fill="#1a365d" opacity="0.3" />
        <rect x="10" y="19" width="24" height="10" rx="2" fill="url(#hero-orange)" opacity="0.15" />
        <text x="14" y="27" fill="#FF6B2B" fontSize="8" fontWeight="700" opacity="0.7">+42%</text>
        {/* Mini spark line */}
        <polyline points="10,48 20,42 30,45 40,36 50,38 60,30 68,32" stroke="#FF6B2B" strokeWidth="2" fill="none" opacity="0.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="68" cy="32" r="2.5" fill="#FF6B2B" opacity="0.6" />
      </g>

      {/* Floating badge — bottom right: code snippet */}
      <g filter="url(#hero-shadow)" transform="translate(430, 280)">
        <rect width="65" height="55" rx="10" fill="#1a365d" opacity="0.95" />
        <rect x="8" y="10" width="30" height="4" rx="2" fill="#FF6B2B" opacity="0.6" />
        <rect x="8" y="18" width="45" height="4" rx="2" fill="white" opacity="0.2" />
        <rect x="14" y="26" width="35" height="4" rx="2" fill="#22c55e" opacity="0.4" />
        <rect x="14" y="34" width="25" height="4" rx="2" fill="white" opacity="0.15" />
        <rect x="8" y="42" width="20" height="4" rx="2" fill="#FF6B2B" opacity="0.35" />
      </g>

      {/* Cursor */}
      <g transform="translate(340, 140)">
        <path d="M0 0 L0 16 L5 12 L9 20 L12 19 L8 11 L14 10 Z" fill="#1a365d" opacity="0.6" />
      </g>

      {/* Dashed connection lines */}
      <path d="M98 232 Q105 220 115 210" stroke="#FF6B2B" strokeWidth="1" opacity="0.12" strokeDasharray="3 4" />
      <path d="M430 300 Q425 298 420 295" stroke="#1a365d" strokeWidth="1" opacity="0.1" strokeDasharray="3 4" />

      {/* Sparkle accents */}
      <g transform="translate(60, 80)" filter="url(#hero-glow)">
        <path d="M8 0 L10 6 L16 8 L10 10 L8 16 L6 10 L0 8 L6 6 Z" fill="#FF6B2B" opacity="0.5" />
      </g>
      <g transform="translate(470, 180)">
        <path d="M5 0 L6 3.5 L10 5 L6 6.5 L5 10 L4 6.5 L0 5 L4 3.5 Z" fill="#FF6B2B" opacity="0.3" />
      </g>
      <g transform="translate(240, 390)">
        <path d="M4 0 L5 3 L8 4 L5 5 L4 8 L3 5 L0 4 L3 3 Z" fill="#1a365d" opacity="0.15" />
      </g>

      {/* Scattered dots */}
      <circle cx="490" cy="130" r="3" fill="#FF6B2B" opacity="0.2" />
      <circle cx="10" cy="330" r="3" fill="#1a365d" opacity="0.1" />
      <circle cx="480" cy="380" r="2.5" fill="#FF6B2B" opacity="0.12" />
      <circle cx="55" cy="380" r="2" fill="#1a365d" opacity="0.08" />
      <circle cx="350" cy="420" r="3" fill="#FF6B2B" opacity="0.1" />
    </svg>
  );
}

export function ServicesIllustration({ className = "" }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 500 450"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="svc-card-1" x1="0" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="#fff7ed" />
        </linearGradient>
        <linearGradient id="svc-orange" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FF6B2B" />
          <stop offset="100%" stopColor="#ff8f5e" />
        </linearGradient>
        <linearGradient id="svc-navy" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1a365d" />
          <stop offset="100%" stopColor="#2a5080" />
        </linearGradient>
        <filter id="svc-shadow">
          <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#1a365d" floodOpacity="0.12" />
        </filter>
        <filter id="svc-glow">
          <feDropShadow dx="0" dy="0" stdDeviation="12" floodColor="#FF6B2B" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* Central glowing hub */}
      <circle cx="250" cy="225" r="60" fill="#FF6B2B" opacity="0.04" />
      <circle cx="250" cy="225" r="30" fill="#FF6B2B" opacity="0.06" />
      <circle cx="250" cy="225" r="14" fill="url(#svc-orange)" opacity="0.7" filter="url(#svc-glow)" />
      <circle cx="250" cy="225" r="5" fill="white" opacity="0.9" />

      {/* Orbital ring */}
      <ellipse cx="250" cy="225" rx="140" ry="140" stroke="#FF6B2B" strokeWidth="0.8" opacity="0.1" strokeDasharray="6 8" />
      <ellipse cx="250" cy="225" rx="200" ry="200" stroke="#1a365d" strokeWidth="0.5" opacity="0.06" strokeDasharray="4 10" />

      {/* Connection lines from hub to cards */}
      <line x1="236" y1="212" x2="150" y2="110" stroke="#FF6B2B" strokeWidth="1.5" opacity="0.15" />
      <line x1="264" y1="212" x2="370" y2="90" stroke="#1a365d" strokeWidth="1.5" opacity="0.12" />
      <line x1="236" y1="238" x2="120" y2="320" stroke="#FF6B2B" strokeWidth="1.5" opacity="0.12" />
      <line x1="264" y1="238" x2="390" y2="330" stroke="#1a365d" strokeWidth="1.5" opacity="0.12" />

      {/* Card 1 - AI/ML (top-left) */}
      <g filter="url(#svc-shadow)" transform="translate(30, 30)">
        <rect x="0" y="0" width="170" height="120" rx="14" fill="url(#svc-card-1)" />
        <rect x="0" y="0" width="170" height="120" rx="14" stroke="#FF6B2B" strokeWidth="1" opacity="0.15" />
        <rect x="16" y="16" width="44" height="44" rx="12" fill="#FF6B2B" opacity="0.1" />
        {/* Brain/sparkle icon */}
        <circle cx="38" cy="38" r="12" stroke="#FF6B2B" strokeWidth="1.5" fill="none" opacity="0.4" />
        <path d="M38 26 L40 32 L46 34 L40 36 L38 42 L36 36 L30 34 L36 32 Z" fill="#FF6B2B" opacity="0.7" />
        <rect x="72" y="20" width="70" height="7" rx="3" fill="#1a365d" opacity="0.55" />
        <rect x="72" y="34" width="50" height="5" rx="2" fill="#1a365d" opacity="0.2" />
        <rect x="16" y="72" width="138" height="5" rx="2" fill="#1a365d" opacity="0.12" />
        <rect x="16" y="84" width="100" height="5" rx="2" fill="#1a365d" opacity="0.08" />
        <rect x="16" y="100" width="60" height="8" rx="4" fill="#FF6B2B" opacity="0.15" />
        <rect x="16" y="100" width="60" height="8" rx="4" stroke="#FF6B2B" strokeWidth="0.8" opacity="0.3" />
      </g>

      {/* Card 2 - Web Dev (top-right) */}
      <g filter="url(#svc-shadow)" transform="translate(300, 15)">
        <rect x="0" y="0" width="170" height="120" rx="14" fill="url(#svc-card-1)" />
        <rect x="0" y="0" width="170" height="120" rx="14" stroke="#1a365d" strokeWidth="1" opacity="0.1" />
        <rect x="16" y="16" width="44" height="44" rx="12" fill="#1a365d" opacity="0.08" />
        {/* Browser icon */}
        <rect x="24" y="24" width="28" height="22" rx="4" stroke="#1a365d" strokeWidth="1.5" fill="none" opacity="0.5" />
        <line x1="24" y1="32" x2="52" y2="32" stroke="#1a365d" strokeWidth="1" opacity="0.3" />
        <circle cx="29" cy="28" r="1.5" fill="#FF6B2B" opacity="0.6" />
        <circle cx="35" cy="28" r="1.5" fill="#fbbf24" opacity="0.6" />
        <circle cx="41" cy="28" r="1.5" fill="#22c55e" opacity="0.6" />
        <rect x="72" y="20" width="75" height="7" rx="3" fill="#1a365d" opacity="0.55" />
        <rect x="72" y="34" width="55" height="5" rx="2" fill="#1a365d" opacity="0.2" />
        <rect x="16" y="72" width="138" height="5" rx="2" fill="#1a365d" opacity="0.12" />
        <rect x="16" y="84" width="110" height="5" rx="2" fill="#1a365d" opacity="0.08" />
        <rect x="16" y="100" width="60" height="8" rx="4" fill="#1a365d" opacity="0.1" />
        <rect x="16" y="100" width="60" height="8" rx="4" stroke="#1a365d" strokeWidth="0.8" opacity="0.2" />
      </g>

      {/* Card 3 - Mobile (bottom-left) */}
      <g filter="url(#svc-shadow)" transform="translate(15, 275)">
        <rect x="0" y="0" width="170" height="120" rx="14" fill="url(#svc-card-1)" />
        <rect x="0" y="0" width="170" height="120" rx="14" stroke="#FF6B2B" strokeWidth="1" opacity="0.12" />
        <rect x="16" y="16" width="44" height="44" rx="12" fill="#FF6B2B" opacity="0.08" />
        {/* Phone icon */}
        <rect x="28" y="22" width="20" height="32" rx="4" stroke="#FF6B2B" strokeWidth="1.5" fill="none" opacity="0.5" />
        <rect x="32" y="28" width="12" height="16" rx="1" fill="#FF6B2B" opacity="0.12" />
        <circle cx="38" cy="50" r="2" fill="#FF6B2B" opacity="0.4" />
        <rect x="72" y="20" width="65" height="7" rx="3" fill="#1a365d" opacity="0.55" />
        <rect x="72" y="34" width="80" height="5" rx="2" fill="#1a365d" opacity="0.2" />
        <rect x="16" y="72" width="138" height="5" rx="2" fill="#1a365d" opacity="0.12" />
        <rect x="16" y="84" width="120" height="5" rx="2" fill="#1a365d" opacity="0.08" />
        <rect x="16" y="100" width="60" height="8" rx="4" fill="#FF6B2B" opacity="0.15" />
        <rect x="16" y="100" width="60" height="8" rx="4" stroke="#FF6B2B" strokeWidth="0.8" opacity="0.3" />
      </g>

      {/* Card 4 - Custom Software (bottom-right) */}
      <g filter="url(#svc-shadow)" transform="translate(315, 290)">
        <rect x="0" y="0" width="170" height="120" rx="14" fill="url(#svc-card-1)" />
        <rect x="0" y="0" width="170" height="120" rx="14" stroke="#1a365d" strokeWidth="1" opacity="0.1" />
        <rect x="16" y="16" width="44" height="44" rx="12" fill="#1a365d" opacity="0.08" />
        {/* Gear icon */}
        <circle cx="38" cy="38" r="12" stroke="#1a365d" strokeWidth="2" fill="none" opacity="0.4" />
        <circle cx="38" cy="38" r="5" fill="#1a365d" opacity="0.35" />
        {/* Gear teeth */}
        <rect x="36" y="22" width="4" height="6" rx="2" fill="#1a365d" opacity="0.4" />
        <rect x="36" y="48" width="4" height="6" rx="2" fill="#1a365d" opacity="0.4" />
        <rect x="22" y="36" width="6" height="4" rx="2" fill="#1a365d" opacity="0.4" />
        <rect x="48" y="36" width="6" height="4" rx="2" fill="#1a365d" opacity="0.4" />
        <rect x="72" y="20" width="80" height="7" rx="3" fill="#1a365d" opacity="0.55" />
        <rect x="72" y="34" width="55" height="5" rx="2" fill="#1a365d" opacity="0.2" />
        <rect x="16" y="72" width="138" height="5" rx="2" fill="#1a365d" opacity="0.12" />
        <rect x="16" y="84" width="100" height="5" rx="2" fill="#1a365d" opacity="0.08" />
        <rect x="16" y="100" width="60" height="8" rx="4" fill="#1a365d" opacity="0.1" />
        <rect x="16" y="100" width="60" height="8" rx="4" stroke="#1a365d" strokeWidth="0.8" opacity="0.2" />
      </g>

      {/* Orbital dots on ring */}
      <circle cx="110" cy="225" r="5" fill="#FF6B2B" opacity="0.5" />
      <circle cx="390" cy="225" r="5" fill="#1a365d" opacity="0.4" />
      <circle cx="250" cy="85" r="4" fill="#FF6B2B" opacity="0.4" />
      <circle cx="250" cy="365" r="4" fill="#1a365d" opacity="0.3" />

      {/* Sparkles */}
      <g transform="translate(245, 160)">
        <path d="M6 0 L7.5 4.5 L12 6 L7.5 7.5 L6 12 L4.5 7.5 L0 6 L4.5 4.5 Z" fill="#FF6B2B" opacity="0.35" />
      </g>
      <g transform="translate(480, 220)">
        <path d="M5 0 L6 3.5 L10 5 L6 6.5 L5 10 L4 6.5 L0 5 L4 3.5 Z" fill="#FF6B2B" opacity="0.25" />
      </g>
      <g transform="translate(5, 200)">
        <path d="M4 0 L5 3 L8 4 L5 5 L4 8 L3 5 L0 4 L3 3 Z" fill="#1a365d" opacity="0.2" />
      </g>
    </svg>
  );
}

export function AboutIllustration({ className = "" }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 500 450"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="about-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FF6B2B" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#1a365d" stopOpacity="0.08" />
        </linearGradient>
        <filter id="about-shadow">
          <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#1a365d" floodOpacity="0.12" />
        </filter>
        <filter id="about-glow">
          <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#FF6B2B" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* Background hexagonal network */}
      <path d="M100 80 L180 50 L260 80 L260 140 L180 170 L100 140 Z" stroke="#1a365d" strokeWidth="0.8" opacity="0.06" fill="none" />
      <path d="M240 200 L320 170 L400 200 L400 260 L320 290 L240 260 Z" stroke="#FF6B2B" strokeWidth="0.8" opacity="0.06" fill="none" />

      {/* Central project hub */}
      <g filter="url(#about-shadow)">
        <rect x="175" y="140" width="150" height="170" rx="16" fill="white" />
        <rect x="175" y="140" width="150" height="170" rx="16" stroke="#e2e8f0" strokeWidth="1" />
        {/* Header bar */}
        <rect x="175" y="140" width="150" height="35" rx="16" fill="#1a365d" opacity="0.06" />
        <rect x="190" y="150" width="60" height="6" rx="3" fill="#FF6B2B" opacity="0.6" />
        <rect x="190" y="160" width="40" height="4" rx="2" fill="#1a365d" opacity="0.25" />
        {/* Task items */}
        <g transform="translate(190, 188)">
          <rect x="0" y="0" width="120" height="24" rx="6" fill="#f0fdf4" />
          <circle cx="12" cy="12" r="5" stroke="#22c55e" strokeWidth="1.5" fill="none" />
          <path d="M9 12 L11 14 L15 10" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="24" y="7" width="60" height="5" rx="2" fill="#1a365d" opacity="0.35" />
          <rect x="24" y="15" width="40" height="3" rx="1.5" fill="#1a365d" opacity="0.15" />
        </g>
        <g transform="translate(190, 218)">
          <rect x="0" y="0" width="120" height="24" rx="6" fill="#fff7ed" />
          <circle cx="12" cy="12" r="5" stroke="#FF6B2B" strokeWidth="1.5" fill="none" />
          <rect x="24" y="7" width="70" height="5" rx="2" fill="#1a365d" opacity="0.35" />
          <rect x="24" y="15" width="45" height="3" rx="1.5" fill="#1a365d" opacity="0.15" />
        </g>
        <g transform="translate(190, 248)">
          <rect x="0" y="0" width="120" height="24" rx="6" fill="#eff6ff" />
          <circle cx="12" cy="12" r="5" stroke="#3b82f6" strokeWidth="1.5" fill="none" />
          <rect x="24" y="7" width="55" height="5" rx="2" fill="#1a365d" opacity="0.35" />
          <rect x="24" y="15" width="35" height="3" rx="1.5" fill="#1a365d" opacity="0.15" />
        </g>
        {/* Progress bar */}
        <rect x="190" y="282" width="120" height="6" rx="3" fill="#e2e8f0" />
        <rect x="190" y="282" width="80" height="6" rx="3" fill="#FF6B2B" opacity="0.6" />
      </g>

      {/* Team member 1 - top left */}
      <g filter="url(#about-shadow)" transform="translate(40, 60)">
        <circle cx="35" cy="35" r="35" fill="white" />
        <circle cx="35" cy="35" r="35" stroke="#FF6B2B" strokeWidth="2" opacity="0.2" />
        <circle cx="35" cy="28" r="8" fill="#1a365d" opacity="0.5" />
        <path d="M22 50 Q35 40 48 50" fill="#1a365d" opacity="0.35" />
      </g>

      {/* Team member 2 - top right */}
      <g filter="url(#about-shadow)" transform="translate(380, 40)">
        <circle cx="35" cy="35" r="35" fill="white" />
        <circle cx="35" cy="35" r="35" stroke="#1a365d" strokeWidth="2" opacity="0.15" />
        <circle cx="35" cy="28" r="8" fill="#FF6B2B" opacity="0.5" />
        <path d="M22 50 Q35 40 48 50" fill="#FF6B2B" opacity="0.3" />
      </g>

      {/* Team member 3 - bottom left */}
      <g filter="url(#about-shadow)" transform="translate(30, 300)">
        <circle cx="30" cy="30" r="30" fill="white" />
        <circle cx="30" cy="30" r="30" stroke="#FF6B2B" strokeWidth="1.5" opacity="0.15" />
        <circle cx="30" cy="24" r="7" fill="#FF6B2B" opacity="0.45" />
        <path d="M18 42 Q30 34 42 42" fill="#FF6B2B" opacity="0.25" />
      </g>

      {/* Team member 4 - bottom right */}
      <g filter="url(#about-shadow)" transform="translate(400, 310)">
        <circle cx="30" cy="30" r="30" fill="white" />
        <circle cx="30" cy="30" r="30" stroke="#1a365d" strokeWidth="1.5" opacity="0.15" />
        <circle cx="30" cy="24" r="7" fill="#1a365d" opacity="0.45" />
        <path d="M18 42 Q30 34 42 42" fill="#1a365d" opacity="0.25" />
      </g>

      {/* Connection lines - dashed, from people to hub */}
      <path d="M110 95 L185 180" stroke="#FF6B2B" strokeWidth="1.5" opacity="0.15" strokeDasharray="5 5" />
      <path d="M415 110 L325 190" stroke="#1a365d" strokeWidth="1.5" opacity="0.12" strokeDasharray="5 5" />
      <path d="M90 330 L185 270" stroke="#FF6B2B" strokeWidth="1.5" opacity="0.12" strokeDasharray="5 5" />
      <path d="M400 340 L325 280" stroke="#1a365d" strokeWidth="1.5" opacity="0.12" strokeDasharray="5 5" />

      {/* Lightbulb */}
      <g transform="translate(140, 20)" filter="url(#about-glow)">
        <path d="M10 0 C4 0 0 5 0 10 C0 14 4 17 5 20 L15 20 C16 17 20 14 20 10 C20 5 16 0 10 0 Z" fill="#FF6B2B" opacity="0.5" />
        <rect x="5" y="22" width="10" height="3" rx="1.5" fill="#FF6B2B" opacity="0.4" />
      </g>

      {/* Chat bubbles */}
      <g transform="translate(370, 180)">
        <rect x="0" y="0" width="55" height="28" rx="8" fill="#FF6B2B" opacity="0.08" />
        <rect x="0" y="0" width="55" height="28" rx="8" stroke="#FF6B2B" strokeWidth="0.8" opacity="0.15" />
        <rect x="10" y="9" width="28" height="4" rx="2" fill="#FF6B2B" opacity="0.3" />
        <rect x="10" y="17" width="18" height="3" rx="1.5" fill="#FF6B2B" opacity="0.2" />
      </g>
      <g transform="translate(80, 210)">
        <rect x="0" y="0" width="50" height="25" rx="8" fill="#1a365d" opacity="0.06" />
        <rect x="0" y="0" width="50" height="25" rx="8" stroke="#1a365d" strokeWidth="0.8" opacity="0.12" />
        <rect x="10" y="8" width="25" height="4" rx="2" fill="#1a365d" opacity="0.25" />
        <rect x="10" y="15" width="15" height="3" rx="1.5" fill="#1a365d" opacity="0.15" />
      </g>

      {/* Sparkles */}
      <g transform="translate(340, 145)">
        <path d="M6 0 L7.5 5 L12 6 L7.5 7.5 L6 12 L4.5 7.5 L0 6 L4.5 5 Z" fill="#FF6B2B" opacity="0.4" />
      </g>
      <g transform="translate(460, 150)">
        <path d="M4 0 L5 3 L8 4 L5 5 L4 8 L3 5 L0 4 L3 3 Z" fill="#1a365d" opacity="0.25" />
      </g>

      {/* Decorative dots */}
      <circle cx="250" cy="420" r="3" fill="#FF6B2B" opacity="0.3" />
      <circle cx="480" cy="250" r="4" fill="#1a365d" opacity="0.15" />
      <circle cx="15" cy="170" r="3" fill="#FF6B2B" opacity="0.2" />
    </svg>
  );
}

export function ProjectsIllustration({ className = "" }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 500 450"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="proj-screen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a365d" />
          <stop offset="100%" stopColor="#0f2440" />
        </linearGradient>
        <filter id="proj-shadow">
          <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#1a365d" floodOpacity="0.12" />
        </filter>
        <filter id="proj-glow">
          <feDropShadow dx="0" dy="0" stdDeviation="10" floodColor="#FF6B2B" floodOpacity="0.2" />
        </filter>
      </defs>

      {/* Background grid pattern */}
      <g opacity="0.04">
        <line x1="100" y1="0" x2="100" y2="450" stroke="#1a365d" strokeWidth="1" />
        <line x1="200" y1="0" x2="200" y2="450" stroke="#1a365d" strokeWidth="1" />
        <line x1="300" y1="0" x2="300" y2="450" stroke="#1a365d" strokeWidth="1" />
        <line x1="400" y1="0" x2="400" y2="450" stroke="#1a365d" strokeWidth="1" />
        <line x1="0" y1="90" x2="500" y2="90" stroke="#1a365d" strokeWidth="1" />
        <line x1="0" y1="180" x2="500" y2="180" stroke="#1a365d" strokeWidth="1" />
        <line x1="0" y1="270" x2="500" y2="270" stroke="#1a365d" strokeWidth="1" />
        <line x1="0" y1="360" x2="500" y2="360" stroke="#1a365d" strokeWidth="1" />
      </g>

      {/* Main project window - layered */}
      {/* Back layer */}
      <g filter="url(#proj-shadow)" transform="translate(130, 50)">
        <rect x="10" y="10" width="240" height="170" rx="10" fill="#e2e8f0" opacity="0.5" />
      </g>
      {/* Middle layer */}
      <g filter="url(#proj-shadow)" transform="translate(130, 50)">
        <rect x="5" y="5" width="240" height="170" rx="10" fill="#f1f5f9" opacity="0.7" />
      </g>
      {/* Front layer - main window */}
      <g filter="url(#proj-shadow)" transform="translate(130, 50)">
        <rect x="0" y="0" width="240" height="170" rx="10" fill="white" />
        <rect x="0" y="0" width="240" height="30" rx="10" fill="#f8fafc" />
        <rect x="0" y="20" width="240" height="10" fill="#f8fafc" />
        <circle cx="16" cy="15" r="4" fill="#ff5f57" opacity="0.6" />
        <circle cx="30" cy="15" r="4" fill="#febc2e" opacity="0.6" />
        <circle cx="44" cy="15" r="4" fill="#28c840" opacity="0.6" />
        {/* App UI mockup inside */}
        <rect x="12" y="38" width="216" height="12" rx="3" fill="#1a365d" opacity="0.06" />
        <rect x="18" y="41" width="40" height="6" rx="2" fill="#FF6B2B" opacity="0.5" />
        <rect x="65" y="41" width="35" height="6" rx="2" fill="#1a365d" opacity="0.2" />
        <rect x="107" y="41" width="35" height="6" rx="2" fill="#1a365d" opacity="0.2" />
        {/* Content cards */}
        <rect x="12" y="58" width="68" height="50" rx="6" fill="#FF6B2B" opacity="0.08" />
        <rect x="20" y="66" width="40" height="5" rx="2" fill="#1a365d" opacity="0.3" />
        <rect x="20" y="76" width="52" height="4" rx="2" fill="#1a365d" opacity="0.15" />
        <rect x="20" y="84" width="44" height="4" rx="2" fill="#1a365d" opacity="0.1" />
        <rect x="20" y="96" width="28" height="6" rx="3" fill="#FF6B2B" opacity="0.3" />

        <rect x="86" y="58" width="68" height="50" rx="6" fill="#1a365d" opacity="0.04" />
        <rect x="94" y="66" width="44" height="5" rx="2" fill="#1a365d" opacity="0.3" />
        <rect x="94" y="76" width="52" height="4" rx="2" fill="#1a365d" opacity="0.15" />
        <rect x="94" y="84" width="38" height="4" rx="2" fill="#1a365d" opacity="0.1" />
        <rect x="94" y="96" width="28" height="6" rx="3" fill="#1a365d" opacity="0.15" />

        <rect x="160" y="58" width="68" height="50" rx="6" fill="#FF6B2B" opacity="0.05" />
        <rect x="168" y="66" width="48" height="5" rx="2" fill="#1a365d" opacity="0.3" />
        <rect x="168" y="76" width="40" height="4" rx="2" fill="#1a365d" opacity="0.15" />
        <rect x="168" y="84" width="52" height="4" rx="2" fill="#1a365d" opacity="0.1" />
        <rect x="168" y="96" width="28" height="6" rx="3" fill="#FF6B2B" opacity="0.25" />

        {/* Image placeholders row */}
        <rect x="12" y="116" width="105" height="40" rx="6" fill="#1a365d" opacity="0.06" />
        <rect x="123" y="116" width="105" height="40" rx="6" fill="#FF6B2B" opacity="0.06" />
      </g>

      {/* Phone mockup - right side */}
      <g filter="url(#proj-shadow)" transform="translate(400, 120)">
        <rect x="0" y="0" width="60" height="110" rx="10" fill="white" stroke="#e2e8f0" strokeWidth="1" />
        <rect x="18" y="6" width="24" height="3" rx="1.5" fill="#e2e8f0" />
        <rect x="6" y="14" width="48" height="80" rx="2" fill="#f8fafc" />
        {/* Mini app content */}
        <rect x="10" y="20" width="40" height="20" rx="3" fill="#FF6B2B" opacity="0.1" />
        <rect x="10" y="46" width="40" height="5" rx="2" fill="#1a365d" opacity="0.2" />
        <rect x="10" y="55" width="30" height="4" rx="2" fill="#1a365d" opacity="0.12" />
        <rect x="10" y="65" width="40" height="18" rx="3" fill="#1a365d" opacity="0.05" />
        <circle cx="30" cy="100" r="4" fill="#e2e8f0" />
      </g>

      {/* Terminal/CLI window - bottom left */}
      <g filter="url(#proj-shadow)" transform="translate(40, 280)">
        <rect x="0" y="0" width="180" height="110" rx="10" fill="url(#proj-screen)" />
        <rect x="0" y="0" width="180" height="24" rx="10" fill="#152d4a" />
        <rect x="0" y="14" width="180" height="10" fill="#152d4a" />
        <circle cx="14" cy="12" r="3.5" fill="#ff5f57" opacity="0.6" />
        <circle cx="26" cy="12" r="3.5" fill="#febc2e" opacity="0.6" />
        <circle cx="38" cy="12" r="3.5" fill="#28c840" opacity="0.6" />
        {/* Terminal content */}
        <text x="12" y="42" fontSize="9" fill="#22c55e" opacity="0.7" fontFamily="monospace">$ npm run build</text>
        <text x="12" y="56" fontSize="9" fill="#67e8f9" opacity="0.5" fontFamily="monospace">Building...</text>
        <text x="12" y="70" fontSize="9" fill="#22c55e" opacity="0.6" fontFamily="monospace">✓ Compiled</text>
        <text x="12" y="84" fontSize="9" fill="#22c55e" opacity="0.6" fontFamily="monospace">✓ 12 pages</text>
        <rect x="12" y="94" width="4" height="8" fill="#22c55e" opacity="0.5" />
      </g>

      {/* Tech stack badges */}
      <g transform="translate(260, 260)">
        <rect x="0" y="0" width="50" height="22" rx="11" fill="white" filter="url(#proj-shadow)" />
        <rect x="0" y="0" width="50" height="22" rx="11" stroke="#FF6B2B" strokeWidth="0.8" opacity="0.3" />
        <text x="25" y="15" fontSize="8" fill="#FF6B2B" textAnchor="middle" fontFamily="system-ui" fontWeight="600" opacity="0.7">React</text>
      </g>
      <g transform="translate(320, 252)">
        <rect x="0" y="0" width="38" height="22" rx="11" fill="white" filter="url(#proj-shadow)" />
        <rect x="0" y="0" width="38" height="22" rx="11" stroke="#1a365d" strokeWidth="0.8" opacity="0.2" />
        <text x="19" y="15" fontSize="8" fill="#1a365d" textAnchor="middle" fontFamily="system-ui" fontWeight="600" opacity="0.5">TS</text>
      </g>
      <g transform="translate(367, 260)">
        <rect x="0" y="0" width="48" height="22" rx="11" fill="white" filter="url(#proj-shadow)" />
        <rect x="0" y="0" width="48" height="22" rx="11" stroke="#FF6B2B" strokeWidth="0.8" opacity="0.3" />
        <text x="24" y="15" fontSize="8" fill="#FF6B2B" textAnchor="middle" fontFamily="system-ui" fontWeight="600" opacity="0.7">AI</text>
      </g>

      {/* Decorative elements */}
      <g transform="translate(80, 30)" filter="url(#proj-glow)">
        <path d="M8 0 L10 6 L16 8 L10 10 L8 16 L6 10 L0 8 L6 6 Z" fill="#FF6B2B" opacity="0.5" />
      </g>
      <circle cx="480" cy="50" r="4" fill="#FF6B2B" opacity="0.3" />
      <circle cx="20" cy="200" r="5" fill="#1a365d" opacity="0.15" />
      <circle cx="470" cy="400" r="6" fill="#FF6B2B" opacity="0.15" />

      {/* Connection lines */}
      <path d="M370 175 L400 165" stroke="#FF6B2B" strokeWidth="1" opacity="0.15" strokeDasharray="3 4" />
      <path d="M240 220 L180 280" stroke="#1a365d" strokeWidth="1" opacity="0.12" strokeDasharray="3 4" />
    </svg>
  );
}

export function CommunityIllustration({ className = "" }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 500 450"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="comm-path" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#1a365d" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#FF6B2B" stopOpacity="0.4" />
        </linearGradient>
        <filter id="comm-shadow">
          <feDropShadow dx="0" dy="3" stdDeviation="6" floodColor="#1a365d" floodOpacity="0.1" />
        </filter>
        <filter id="comm-glow">
          <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#FF6B2B" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* Ascending path - curved */}
      <path d="M60 400 C60 350 120 320 140 280 C160 240 180 220 220 190 C260 160 300 140 340 100 C380 60 420 40 450 20" stroke="url(#comm-path)" strokeWidth="3" strokeLinecap="round" fill="none" />

      {/* Path glow trail */}
      <path d="M60 400 C60 350 120 320 140 280 C160 240 180 220 220 190 C260 160 300 140 340 100 C380 60 420 40 450 20" stroke="#FF6B2B" strokeWidth="8" strokeLinecap="round" fill="none" opacity="0.04" />

      {/* Milestone 1 - Getting Started */}
      <g filter="url(#comm-shadow)" transform="translate(30, 355)">
        <rect x="0" y="0" width="130" height="65" rx="12" fill="white" />
        <rect x="0" y="0" width="130" height="65" rx="12" stroke="#1a365d" strokeWidth="0.8" opacity="0.1" />
        <rect x="12" y="12" width="28" height="28" rx="8" fill="#1a365d" opacity="0.08" />
        <text x="26" y="31" fontSize="14" fill="#1a365d" opacity="0.5" fontFamily="monospace" textAnchor="middle">{"</>"}</text>
        <rect x="48" y="15" width="65" height="6" rx="3" fill="#1a365d" opacity="0.45" />
        <rect x="48" y="27" width="45" height="4" rx="2" fill="#1a365d" opacity="0.2" />
        <rect x="12" y="48" width="100" height="5" rx="2" fill="#1a365d" opacity="0.08" />
      </g>
      <circle cx="60" cy="400" r="8" fill="white" stroke="#1a365d" strokeWidth="2" opacity="0.4" />
      <circle cx="60" cy="400" r="3" fill="#1a365d" opacity="0.5" />

      {/* Milestone 2 - Team Collaboration */}
      <g filter="url(#comm-shadow)" transform="translate(100, 238)">
        <rect x="0" y="0" width="130" height="65" rx="12" fill="white" />
        <rect x="0" y="0" width="130" height="65" rx="12" stroke="#FF6B2B" strokeWidth="0.8" opacity="0.15" />
        <rect x="12" y="12" width="28" height="28" rx="8" fill="#FF6B2B" opacity="0.08" />
        {/* People icon */}
        <circle cx="22" cy="22" r="5" fill="#FF6B2B" opacity="0.4" />
        <circle cx="32" cy="24" r="4" fill="#FF6B2B" opacity="0.3" />
        <path d="M14 36 Q22 30 30 36" fill="#FF6B2B" opacity="0.25" />
        <rect x="48" y="15" width="60" height="6" rx="3" fill="#1a365d" opacity="0.45" />
        <rect x="48" y="27" width="50" height="4" rx="2" fill="#1a365d" opacity="0.2" />
        <rect x="12" y="48" width="100" height="5" rx="2" fill="#FF6B2B" opacity="0.1" />
      </g>
      <circle cx="140" cy="280" r="8" fill="white" stroke="#FF6B2B" strokeWidth="2" opacity="0.4" />
      <circle cx="140" cy="280" r="3" fill="#FF6B2B" opacity="0.5" />

      {/* Milestone 3 - Build & Ship */}
      <g filter="url(#comm-shadow)" transform="translate(230, 148)">
        <rect x="0" y="0" width="130" height="65" rx="12" fill="white" />
        <rect x="0" y="0" width="130" height="65" rx="12" stroke="#FF6B2B" strokeWidth="0.8" opacity="0.2" />
        <rect x="12" y="12" width="28" height="28" rx="8" fill="#FF6B2B" opacity="0.1" />
        {/* Rocket icon */}
        <path d="M26 34 L26 22 L32 16 L38 22 L38 34 L32 30 Z" fill="#FF6B2B" opacity="0.5" />
        <circle cx="32" cy="24" r="2" fill="white" opacity="0.8" />
        <rect x="48" y="15" width="70" height="6" rx="3" fill="#1a365d" opacity="0.45" />
        <rect x="48" y="27" width="55" height="4" rx="2" fill="#1a365d" opacity="0.2" />
        {/* Progress */}
        <rect x="12" y="48" width="100" height="5" rx="2.5" fill="#e2e8f0" />
        <rect x="12" y="48" width="75" height="5" rx="2.5" fill="#FF6B2B" opacity="0.5" />
      </g>
      <circle cx="260" cy="190" r="8" fill="white" stroke="#FF6B2B" strokeWidth="2" opacity="0.5" />
      <circle cx="260" cy="190" r="3" fill="#FF6B2B" opacity="0.6" />

      {/* Milestone 4 - Launch / Success */}
      <g filter="url(#comm-shadow)" transform="translate(350, 48)">
        <rect x="0" y="0" width="130" height="65" rx="12" fill="white" />
        <rect x="0" y="0" width="130" height="65" rx="12" stroke="#FF6B2B" strokeWidth="1" opacity="0.25" />
        <rect x="12" y="12" width="28" height="28" rx="8" fill="#FF6B2B" opacity="0.12" />
        {/* Star/trophy */}
        <path d="M26 18 L28 24 L34 24 L29 28 L31 34 L26 30 L21 34 L23 28 L18 24 L24 24 Z" fill="#FF6B2B" opacity="0.6" />
        <rect x="48" y="15" width="55" height="6" rx="3" fill="#1a365d" opacity="0.45" />
        <rect x="48" y="27" width="65" height="4" rx="2" fill="#1a365d" opacity="0.2" />
        <rect x="12" y="48" width="100" height="5" rx="2.5" fill="#22c55e" opacity="0.2" />
        <text x="62" y="54" fontSize="7" fill="#22c55e" textAnchor="middle" fontFamily="system-ui" fontWeight="600" opacity="0.6">Complete</text>
      </g>
      <circle cx="380" cy="90" r="10" fill="white" stroke="#FF6B2B" strokeWidth="2.5" opacity="0.6" filter="url(#comm-glow)" />
      <circle cx="380" cy="90" r="4" fill="#FF6B2B" opacity="0.7" />

      {/* Floating community members */}
      <g opacity="0.6">
        <circle cx="60" cy="180" r="14" fill="white" filter="url(#comm-shadow)" />
        <circle cx="60" cy="176" r="5" fill="#1a365d" opacity="0.4" />
        <path d="M52 190 Q60 184 68 190" fill="#1a365d" opacity="0.25" />
      </g>
      <g opacity="0.5">
        <circle cx="440" cy="200" r="12" fill="white" filter="url(#comm-shadow)" />
        <circle cx="440" cy="197" r="4.5" fill="#FF6B2B" opacity="0.4" />
        <path d="M433 209 Q440 204 447 209" fill="#FF6B2B" opacity="0.25" />
      </g>
      <g opacity="0.4">
        <circle cx="480" cy="130" r="10" fill="white" filter="url(#comm-shadow)" />
        <circle cx="480" cy="127" r="4" fill="#1a365d" opacity="0.4" />
        <path d="M474 137 Q480 133 486 137" fill="#1a365d" opacity="0.2" />
      </g>

      {/* Sparkles */}
      <g transform="translate(430, 15)" filter="url(#comm-glow)">
        <path d="M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8 Z" fill="#FF6B2B" opacity="0.5" />
      </g>
      <g transform="translate(10, 130)">
        <path d="M5 0 L6 3.5 L10 5 L6 6.5 L5 10 L4 6.5 L0 5 L4 3.5 Z" fill="#1a365d" opacity="0.2" />
      </g>

      {/* Decorative dots */}
      <circle cx="200" cy="400" r="3" fill="#1a365d" opacity="0.15" />
      <circle cx="350" cy="360" r="4" fill="#FF6B2B" opacity="0.12" />
      <circle cx="15" cy="320" r="3" fill="#FF6B2B" opacity="0.2" />
    </svg>
  );
}

export function ProcessIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 500 420" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="proc-orange" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FF6B2B" />
          <stop offset="100%" stopColor="#FF8F5E" />
        </linearGradient>
        <linearGradient id="proc-navy" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a365d" />
          <stop offset="100%" stopColor="#2a4a7f" />
        </linearGradient>
        <filter id="proc-shadow">
          <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#1a365d" floodOpacity="0.15" />
        </filter>
        <filter id="proc-glow">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      {/* Flowing connector path */}
      <path d="M80 80 C160 80, 160 180, 250 180 C340 180, 340 280, 420 280" stroke="#1a365d" strokeWidth="3" strokeDasharray="8 6" opacity="0.2" fill="none" />
      <path d="M80 80 C160 80, 160 180, 250 180 C340 180, 340 280, 420 280" stroke="url(#proc-orange)" strokeWidth="2" strokeDasharray="8 6" opacity="0.4" fill="none" />

      {/* Step 1 - Discovery (lightbulb) */}
      <g filter="url(#proc-shadow)">
        <rect x="20" y="30" width="120" height="100" rx="16" fill="white" />
        <rect x="20" y="30" width="120" height="100" rx="16" stroke="#1a365d" strokeWidth="1" opacity="0.08" />
      </g>
      <circle cx="80" cy="65" r="18" fill="#FF6B2B" opacity="0.12" />
      <path d="M74 60 Q80 48 86 60 L84 70 L76 70 Z" fill="url(#proc-orange)" opacity="0.8" />
      <line x1="76" y1="73" x2="84" y2="73" stroke="#FF6B2B" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="77" y1="76" x2="83" y2="76" stroke="#FF6B2B" strokeWidth="1.5" strokeLinecap="round" />
      <text x="80" y="100" textAnchor="middle" fill="#1a365d" fontSize="11" fontWeight="600">Discovery</text>
      {/* Step number badge */}
      <circle cx="30" cy="40" r="11" fill="url(#proc-orange)" />
      <text x="30" y="44" textAnchor="middle" fill="white" fontSize="10" fontWeight="700">1</text>

      {/* Step 2 - Design (pencil + wireframe) */}
      <g filter="url(#proc-shadow)">
        <rect x="145" y="130" width="120" height="100" rx="16" fill="white" />
        <rect x="145" y="130" width="120" height="100" rx="16" stroke="#1a365d" strokeWidth="1" opacity="0.08" />
      </g>
      <rect x="185" y="150" width="30" height="22" rx="3" fill="#1a365d" opacity="0.1" />
      <rect x="187" y="152" width="26" height="4" rx="1" fill="#1a365d" opacity="0.15" />
      <rect x="187" y="158" width="16" height="4" rx="1" fill="#FF6B2B" opacity="0.3" />
      <rect x="187" y="164" width="22" height="4" rx="1" fill="#1a365d" opacity="0.1" />
      {/* Pencil icon */}
      <g transform="translate(220, 148)" opacity="0.7">
        <path d="M2 16 L0 20 L4 18 L16 6 L12 2 Z" fill="url(#proc-orange)" />
        <path d="M12 2 L16 6 L18 4 L14 0 Z" fill="#1a365d" opacity="0.6" />
      </g>
      <text x="205" y="200" textAnchor="middle" fill="#1a365d" fontSize="11" fontWeight="600">Design</text>
      <circle cx="155" cy="140" r="11" fill="url(#proc-orange)" />
      <text x="155" y="144" textAnchor="middle" fill="white" fontSize="10" fontWeight="700">2</text>

      {/* Step 3 - Build (code brackets) */}
      <g filter="url(#proc-shadow)">
        <rect x="270" y="220" width="120" height="100" rx="16" fill="white" />
        <rect x="270" y="220" width="120" height="100" rx="16" stroke="#1a365d" strokeWidth="1" opacity="0.08" />
      </g>
      <g transform="translate(305, 240)">
        <path d="M15 0 L0 14 L15 28" stroke="#1a365d" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.5" />
        <path d="M35 0 L50 14 L35 28" stroke="#FF6B2B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.7" />
        <line x1="30" y1="0" x2="20" y2="28" stroke="#1a365d" strokeWidth="2" opacity="0.3" />
      </g>
      <text x="330" y="295" textAnchor="middle" fill="#1a365d" fontSize="11" fontWeight="600">Build</text>
      <circle cx="280" cy="230" r="11" fill="url(#proc-orange)" />
      <text x="280" y="234" textAnchor="middle" fill="white" fontSize="10" fontWeight="700">3</text>

      {/* Step 4 - Launch (rocket) */}
      <g filter="url(#proc-shadow)">
        <rect x="360" y="320" width="120" height="100" rx="16" fill="white" />
        <rect x="360" y="320" width="120" height="100" rx="16" stroke="#1a365d" strokeWidth="1" opacity="0.08" />
      </g>
      <g transform="translate(400, 340)">
        <ellipse cx="20" cy="28" rx="14" ry="5" fill="#FF6B2B" opacity="0.15" />
        <path d="M20 5 Q14 12 14 22 L20 26 L26 22 Q26 12 20 5Z" fill="url(#proc-orange)" opacity="0.8" />
        <circle cx="20" cy="16" r="3" fill="white" opacity="0.6" />
        <path d="M14 22 L8 26 L12 20Z" fill="#1a365d" opacity="0.3" />
        <path d="M26 22 L32 26 L28 20Z" fill="#1a365d" opacity="0.3" />
        {/* Exhaust */}
        <path d="M17 26 Q20 32 23 26" stroke="#FF6B2B" strokeWidth="1.5" fill="none" opacity="0.4" />
        <path d="M18 28 Q20 34 22 28" stroke="#FF6B2B" strokeWidth="1" fill="none" opacity="0.25" />
      </g>
      <text x="420" y="395" textAnchor="middle" fill="#1a365d" fontSize="11" fontWeight="600">Launch</text>
      <circle cx="370" cy="330" r="11" fill="url(#proc-orange)" />
      <text x="370" y="334" textAnchor="middle" fill="white" fontSize="10" fontWeight="700">4</text>

      {/* Milestone dots on connector */}
      <circle cx="80" cy="80" r="6" fill="url(#proc-orange)" />
      <circle cx="80" cy="80" r="3" fill="white" />
      <circle cx="250" cy="180" r="6" fill="url(#proc-orange)" />
      <circle cx="250" cy="180" r="3" fill="white" />
      <circle cx="420" cy="280" r="6" fill="url(#proc-orange)" />
      <circle cx="420" cy="280" r="3" fill="white" />

      {/* Sparkles */}
      <g transform="translate(460, 50)" filter="url(#proc-glow)">
        <path d="M8 0 L10 6 L16 8 L10 10 L8 16 L6 10 L0 8 L6 6 Z" fill="#FF6B2B" opacity="0.4" />
      </g>
      <g transform="translate(5, 200)">
        <path d="M5 0 L6 3.5 L10 5 L6 6.5 L5 10 L4 6.5 L0 5 L4 3.5 Z" fill="#1a365d" opacity="0.15" />
      </g>
      <g transform="translate(240, 380)">
        <path d="M5 0 L6 3.5 L10 5 L6 6.5 L5 10 L4 6.5 L0 5 L4 3.5 Z" fill="#FF6B2B" opacity="0.2" />
      </g>
    </svg>
  );
}
