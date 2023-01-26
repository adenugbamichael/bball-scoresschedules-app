import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className='antialiased'>
      <body className='mt-60'>{children}</body>
    </html>
  )
}
