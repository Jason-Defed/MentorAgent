import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import OCIDProvider from "../components/OCIDProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MentorAgent - AI-Powered Career Planning",
  description: "Blockchain-based AI platform for career planning and skill development",
    generator: 'MentorAgent'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <OCIDProvider>{children}</OCIDProvider>
      </body>
    </html>
  )
}


