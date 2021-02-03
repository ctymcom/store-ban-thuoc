import React from "react";
import { CreatePostPage } from "../../../components/admin/post/create-post-page";
import { PostModel } from "../../../../dist/graphql/modules/post/post.model";
import { Redirect } from "../../../lib/redirect";

export default function EditPost(props) {
  return <CreatePostPage postId={props.post.id} />;
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
