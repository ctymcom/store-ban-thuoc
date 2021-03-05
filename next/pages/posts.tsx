import { PostsProvider } from "../components/index/posts/providers/posts-provider";
import { DefaultLayout } from "../layouts/default-layout";
import { PostsPage } from "./../components/index/posts/posts";

export default function Posts() {
  return (
    <PostsProvider>
      <PostsPage />
    </PostsProvider>
  );
}

Posts.Layout = DefaultLayout;
