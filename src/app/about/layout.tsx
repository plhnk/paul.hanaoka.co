export default function AboutLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return <section className="max-w-2xl mx-auto my-32">{children}</section>
  }