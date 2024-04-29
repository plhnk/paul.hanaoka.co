export default function MdxLayout({ children }: { children: React.ReactNode }) {
    // Create any shared layout or styles here
    return (
      <div className="pt-7 main-content block prose dark:prose-invert prose-neutral max:mx-auto prevent-orphans">
        {children}
      </div>
    )
  }