'use client'

import dynamic from 'next/dynamic'
import MDXImage from '@/components/mdx-image'

const MDXRemote: any = dynamic(() => import('next-mdx-remote').then(mod => mod.MDXRemote), { ssr: false })

const components = {
  img: MDXImage,
}

export default function ClientPostContent({ content }: { content: any }) {
  return <MDXRemote {...content} components={components} />
}