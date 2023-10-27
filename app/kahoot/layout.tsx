import KahootSearchProvider from "@/components/kahoot/KahootSearchProvider"

export default function KahootLayout({ children }) {
  return <KahootSearchProvider>
    {children}
  </KahootSearchProvider>
}