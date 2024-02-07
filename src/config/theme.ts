import { MantineThemeOverride } from '@mantine/core'

export const theme: MantineThemeOverride = {
  defaultRadius: 'md',

  fontFamily: 'var(--font-work-sans)',

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

  defaultGradient: { from: '#C93D76', to: '#8D2C8B', deg: 60 }
}
