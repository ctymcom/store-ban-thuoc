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

Details.Layout = AdminLayout;
