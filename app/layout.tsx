import './globals.css'
import { Inter, Poppins } from 'next/font/google'
import Header from './components/Header'
import Footer from './components/Footer'
import { ContentProvider } from './contexts/ContentContext'
import ContentRefreshIndicator from './components/ContentRefreshIndicator'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
})

export const metadata = {
  title: 'THIRSTEE - Free Water Bottles with Purpose',
  description: 'Providing free custom-labeled water bottles for advertising, corporate solutions, and events while helping those in need.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-sans">
        <ContentProvider>
          <ContentRefreshIndicator />
          <Header />
          <main>{children}</main>
          <Footer />
        </ContentProvider>
      </body>
    </html>
  )
}