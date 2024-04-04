import { MantineThemeOverride } from '@mantine/core'

export const theme: MantineThemeOverride = {
  defaultRadius: 'md',

  white: '#FDFDFD',
  black: '#28282B',

  fontFamily: 'var(--font-work-sans)',
  lineHeights: {
    xs: '1.4',
    sm: '1.45',
    md: '1.55',
    lg: '1.6',
    xl: '1.65'
  },

  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.25rem',
    xl: '1.5rem'
  },

  headings: {
    fontFamily: 'var(--font-lora)'
  },

  components: {
    Button: {
      defaultProps: {
        variant: 'gradient'
      }
    }
  },

  spacing: {
    xs: '0.9rem',
    sm: '1.2rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '2.5rem'
  },

  defaultGradient: { from: '#C93D76', to: '#8D2C8B', deg: 60 }
}
