export default function MdxLayout({ children }: { children: React.ReactNode }) {
    // Create any shared layout or styles here
    return (
      <div className="prose dark:prose-invert prose-neutral pt-[1.75rem]">
        {children}
      </div>
    )
  }