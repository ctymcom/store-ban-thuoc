import React from "react";
import { PostModel } from "../../../dist/graphql/modules/post/post.model";
import { Redirect } from "../../lib/helpers/redirect";
import { DefaultLayout } from "../../layouts/default-layout";
import { PostDetailsProvider } from "../../components/index/post-details/providers/post-details-provider";
import { PostDetailsPage } from "../../components/index/post-details/post-details-page";
import SEO from "../../lib/helpers/seo";
import { GetServerSidePropsContext } from "next";
import { NextSeo } from "next-seo";

export default function Details(props) {
  return (
    <>
      <NextSeo {...props.seo} />
      <PostDetailsProvider postId={props.id}>
        <PostDetailsPage />
      </PostDetailsProvider>
    </>
  );
}

Details.Layout = DefaultLayout;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { slug } = context.query;
  const post = await PostModel.findOne({ slug }, "_id title excerpt featureImage");
  if (!post) Redirect(context.res, "/404");
  const seo = await SEO(post.title, { description: post.excerpt, image: post.featureImage });
  return {
    props: JSON.parse(
      JSON.stringify({
        id: post.id,
        seo,
      })
    ),
  };
}
