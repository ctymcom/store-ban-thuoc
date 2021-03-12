import { PostsProvider } from "../components/index/posts/providers/posts-provider";
import { DefaultLayout } from "../layouts/default-layout";
import { PostsPage } from "./../components/index/posts/posts";
import { NextSeo } from "next-seo";
import SEO from "../lib/helpers/seo";

export default function Posts(props) {
  return (
    <>
      <NextSeo {...props.seo} />
      <PostsProvider>
        <PostsPage />
      </PostsProvider>
    </>
  );
}

Posts.Layout = DefaultLayout;

export async function getServerSideProps(context) {
  const seo = await SEO("Trang tin tức");
  return {
    props: JSON.parse(
      JSON.stringify({
        seo,
      })
    ),
  };
}
