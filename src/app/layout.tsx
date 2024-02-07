import clsx from 'clsx'
import { ReactNode } from 'react'
import type { Metadata } from 'next'
import { MantineProvider, ColorSchemeScript } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { Work_Sans, Lora } from 'next/font/google'

import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import '@mantine/notifications/styles.css'
import './globals.css'

import { theme } from '@config/theme'
import Structure from '@components/structure'

export const metadata: Metadata = {
  metadataBase: new URL('https://ecb.sbacbank.com'),
  title: {
    default: 'SBAC EmpDirectory - Find, Connect, Collaborate',
    template: '%s - SBAC EmpDirectory'
  },
  description:
    'SBAC EmpDirectory: A tool for SBAC Bank employees to easily find and connect with colleagues across all departments, fostering collaboration. Start using SBAC EmpDirectory today!',
  authors: [{ name: 'Jobayer Al Mahmud Ahad', url: 'https://www.jobayerahad.com' }],
  publisher: 'SBAC Bank'
}

const work_sans = Work_Sans({
  subsets: ['latin'],
  variable: '--font-work-sans',
  display: 'swap'
})

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap'
})

const RootLayout = ({ children }: { children: ReactNode }) => (
  <html lang="en" className={clsx(work_sans.variable, lora.variable)}>
    <head>
      <ColorSchemeScript defaultColorScheme="auto" />
    </head>

    <body suppressHydrationWarning>
      <MantineProvider theme={theme} defaultColorScheme="auto" classNamesPrefix="sbac">
        <Notifications />

        <Structure>{children}</Structure>
      </MantineProvider>
    </body>
  </html>
)

export default RootLayout
