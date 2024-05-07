export default function MdxLayout({ children }: { children: React.ReactNode }) {
    // Create any shared layout or styles here
    return (
      <div className="pt-7 main-content ml-[unset] block prose dark:prose-invert prose-neutral prevent-orphans">
        {children}
      </div>
    )
  }