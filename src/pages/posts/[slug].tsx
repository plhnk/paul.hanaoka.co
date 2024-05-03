import { useRouter } from 'next/router';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { getFiles, getFileBySlug } from '../../lib/mdx';

interface PostPageProps {
  mdxSource: MDXRemoteSerializeResult;
  frontMatter: {
    title: string;
    // Add other frontMatter properties here
  };
}

export default function PostPage({ mdxSource, frontMatter }: PostPageProps) {
  const router = useRouter();
  const { slug } = router.query;
  const content = <MDXRemote {...mdxSource} />;

  return (
    <div>
      <h1>{frontMatter.title}</h1>
      {content}
    </div>
  );
}

export async function getStaticPaths() {
  const slugs = await getFiles('src/posts');
  const paths = slugs.map(slug => ({ params: { slug } }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const post = await getFileBySlug('src/posts', params.slug);

  return { props: post };
}