import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { getPosts } from "~/.server/posts";
import { Post } from "~/components/post";

export const loader = () => {
  const posts = getPosts();
  return json(posts.filter((post) => post.frontmatter.featured));
};

export default function Index() {
  // const featuredPosts = useLoaderData<typeof loader>();

  return (
    <div>
      index content
    </div>
  );
}
