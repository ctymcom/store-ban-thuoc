import React from "react";
import { PostModel } from "../../../dist/graphql/modules/post/post.model";
import { Redirect } from "../../lib/redirect";
import { DefaultLayout } from "../../layouts/default-layout";
import { PostDetailsProvider } from "../../components/index/post-details/providers/post-details-provider";
import { PostDetailsPage } from "../../components/index/post-details/post-details-page";

export default function Details(props) {
  return (
    <PostDetailsProvider postId={props.post.id}>
      <PostDetailsPage />
    </PostDetailsProvider>
  );
}

export async function getServerSideProps(context) {
  const { slug } = context.query;
  const post = await PostModel.findOne({ slug });
  if (!post) Redirect(context.res, "/404");
  return {
    props: {
      post: JSON.parse(
        JSON.stringify({
          id: post.id,
          title: post.title,
          excerpt: post.excerpt,
          featureImage: post.featureImage,
        })
      ),
    },
  };
}

Details.Layout = DefaultLayout;
