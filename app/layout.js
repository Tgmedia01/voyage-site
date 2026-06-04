export const metadata = {
  title: 'Voyage Group',
  description: 'Luxury Hospitality Media',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: '#0d0d0d' }}>
        {children}
      </body>
    </html>
  )
}
