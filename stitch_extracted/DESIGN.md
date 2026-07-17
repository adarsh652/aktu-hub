---
name: Academic Nexus
colors:
  surface: '#f9f9ff'
  surface-dim: '#cfdaf1'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e7eeff'
  surface-container-high: '#dee8ff'
  surface-container-highest: '#d8e3fa'
  on-surface: '#111c2c'
  on-surface-variant: '#43474e'
  inverse-surface: '#263142'
  inverse-on-surface: '#ebf1ff'
  outline: '#74777f'
  outline-variant: '#c4c6cf'
  surface-tint: '#455f88'
  primary: '#002045'
  on-primary: '#ffffff'
  primary-container: '#1a365d'
  on-primary-container: '#86a0cd'
  inverse-primary: '#adc7f7'
  secondary: '#006a66'
  on-secondary: '#ffffff'
  secondary-container: '#81f2eb'
  on-secondary-container: '#006f6a'
  tertiary: '#002141'
  on-tertiary: '#ffffff'
  tertiary-container: '#003765'
  on-tertiary-container: '#68a2e9'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d6e3ff'
  primary-fixed-dim: '#adc7f7'
  on-primary-fixed: '#001b3c'
  on-primary-fixed-variant: '#2d476f'
  secondary-fixed: '#84f5ee'
  secondary-fixed-dim: '#66d8d2'
  on-secondary-fixed: '#00201e'
  on-secondary-fixed-variant: '#00504d'
  tertiary-fixed: '#d3e4ff'
  tertiary-fixed-dim: '#a2c9ff'
  on-tertiary-fixed: '#001c38'
  on-tertiary-fixed-variant: '#004881'
  background: '#f9f9ff'
  on-background: '#111c2c'
  surface-variant: '#d8e3fa'
typography:
  headline-xl:
    fontFamily: Public Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Public Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Public Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-md:
    fontFamily: Public Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Public Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Public Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Public Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Public Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style

The design system is engineered for "Academic, Trustworthy, and Efficient" interactions. It serves as a centralized hub for students, prioritizing high-velocity information retrieval and long-form reading comfort. The aesthetic is **Corporate Modern** with a focus on functional clarity and structured hierarchy.

The brand personality is authoritative yet helpful—acting as a reliable digital campus. The UI avoids unnecessary ornamentation, leveraging generous whitespace to foster a "distraction-free" environment that reduces cognitive load during exam preparation and resource searching.

## Colors

The palette is anchored in scholarly tradition and modern accessibility:

- **Primary (#1A365D):** A deep Navy Blue used for global navigation, primary headers, and high-level structural elements to establish authority.
- **Secondary (#38B2AC):** A Fresh Teal used sparingly for action-oriented accents, success states, and progress indicators to inject energy into the academic workspace.
- **Tertiary (#2B6CB0):** A brighter Trustworthy Blue for interactive elements like links and primary buttons to ensure they are easily identifiable against the off-white backdrop.
- **Neutral (#4A5568):** Slate Greys provide high-contrast legibility for body text and metadata, avoiding the harshness of pure black.
- **Background (#F7FAFC):** A clean Off-White surface that reduces eye strain during prolonged study sessions.

## Typography

This design system utilizes **Public Sans**, an institutional typeface designed for high legibility and neutrality. 

- **Scale:** Headings utilize a tight tracking and heavy weights to create a strong visual anchor for page sections.
- **Body Text:** Optimized for readability with a generous 1.5x line height to support dense academic content.
- **Mobile Adaptivity:** Display headers (XL/LG) scale down on mobile to prevent awkward line breaks while maintaining their bold character.

## Layout & Spacing

The design system employs a **12-column fixed grid** for desktop, transitioning to a fluid single-column layout for mobile devices. 

- **Philosophy:** Content is grouped into "Information Clusters" using generous internal padding.
- **Rhythm:** A 4px baseline grid ensures consistent vertical rhythm. Use `stack-lg` (32px) between major sections to maintain the "distraction-free" requirement.
- **Margins:** Desktop margins are set to 40px to provide a breathable frame for the central content repository.

## Elevation & Depth

Hierarchy is established through **Ambient Shadows** and tonal layering:

- **Base Level:** The background (#F7FAFC) serves as the canvas.
- **Surface Level:** Content resides on white (#FFFFFF) cards.
- **Elevation:** Use low-opacity, extra-diffused shadows (e.g., `0px 4px 20px rgba(26, 54, 93, 0.08)`) to lift cards off the background. 
- **Interaction:** On hover, cards should subtly increase their shadow spread and lift (Y-axis translation) to provide tactile feedback without utilizing heavy borders.

## Shapes

The design system uses a **Rounded** shape language to appear approachable and modern while remaining professional.

- **Primary Radius:** 0.5rem (8px) for small components like inputs and buttons.
- **Container Radius:** 1rem (16px) for major cards and "Quick Access" modules to create a distinct, friendly visual container.
- **Search Bars:** Should utilize the `rounded-xl` (1.5rem / 24px) setting to differentiate the primary search utility from static content cards.

## Components

### Buttons
- **Primary:** Solid #2B6CB0 with white text. 8px rounded corners. Use 16px horizontal padding.
- **Secondary:** Outlined with a 1.5px stroke of #2B6CB0. 

### Quick Access Cards
- High-visibility containers with 16px padding and 16px corner radius.
- Must include a 40px icon placeholder in Secondary Teal (#38B2AC) to allow for rapid visual scanning.

### Search Bar
- Centrally located with a 24px corner radius.
- **Focus State:** 2px solid #38B2AC stroke with a soft outer glow.
- Include a persistent search icon (20px) on the left.

### Input Fields
- Subtle #E2E8F0 border with 8px radius.
- Label text uses `label-md` in Primary Navy.

### Lists & Resources
- Row-based list items with subtle dividers (#EDF2F7).
- Hover states should apply a faint #F7FAFC background fill to indicate interactivity.

### Progress Indicators
- Linear bars using the Secondary Teal (#38B2AC) to denote completion of academic modules or document downloads.