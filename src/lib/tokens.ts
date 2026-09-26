export const colors = {
  navy: {
    900: '#1f3a5f',
    800: '#1b3a6b',
  },
  cream: {
    50: '#fbf7ef',
    100: '#f4ede0',
    200: '#ede5d8',
    300: '#ddd5c8',
    400: '#d8cebc',
    500: '#c8bfb0',
  },
  amber: {
    500: '#e8a63c',
    600: '#9a6a10',
  },
  text: {
    primary: '#1f3a5f',
    secondary: '#3d3a34',
    tertiary: '#6b6760',
    muted: '#a09890',
    subtle: '#a8b8cc',
    placeholder: '#7a8ea0',
    onDark: '#f4ede0',
    onDarkSecondary: '#a8b8cc',
    onDarkMuted: '#7a8ea0',
    heading: '#fbf7ef',
  },
  line: {
    western: '#1b3a6b',
    central: '#c0392b',
    harbour: '#27ae60',
    metro: '#9b59b6',
  },
  crowd: {
    light: { bg: '#d4f4f2', text: '#1a7a76' },
    moderate: { bg: '#fdf0d5', text: '#9a6a10' },
    crowded: { bg: '#fbddd7', text: '#8b2a1a' },
  },
  success: '#27ae60',
  border: {
    light: '#ede5d8',
    medium: '#d8cebc',
    dark: '#ddd5c8',
  },
  toggle: {
    on: '#e8a63c',
    off: '#d8cebc',
  },
} as const;

export const fonts = {
  heading: "'Fraunces', serif",
  body: "'Inter', sans-serif",
} as const;

export const fontVariation = {
  fraunces: { fontVariationSettings: '"SOFT" 0, "WONK" 1' },
} as const;

export const radii = {
  sm: '4px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  full: '9999px',
} as const;
