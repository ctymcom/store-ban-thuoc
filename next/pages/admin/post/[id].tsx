import React from "react";
import { PostDetailsPage } from "../../../components/admin/post/post-details-page";
import { PostDetailsProvider } from "../../../components/admin/post/providers/post-details-provider";
import { AdminLayout } from "../../../layouts/admin-layout";

export default function Details(props) {
  return (
    <PostDetailsProvider>
      <PostDetailsPage />
    </PostDetailsProvider>
  );
}

// export async function getServerSideProps(context) {
//   const { slug } = context.query;
//   const post = await PostModel.findOne({ slug });
//   if (!post) Redirect(context.res, "/404");
//   return {
//     props: {
//       post: JSON.parse(
//         JSON.stringify({
//           id: post.id,
//           title: post.title,
//           excerpt: post.excerpt,
//           featureImage: post.featureImage,
//         })
//       ),
//     },
//   };
// }

Details.Layout = AdminLayout;
