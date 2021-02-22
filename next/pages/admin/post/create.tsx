import { PostDetailsPage } from "../../../components/admin/post/post-details-page";
import { PostDetailsProvider } from "../../../components/admin/post/providers/post-details-provider";
import { AdminLayout } from "../../../layouts/admin-layout";

export default function Create() {
  return <PostDetailsProvider>
      <PostDetailsPage/>
    </PostDetailsProvider>
}

Create.Layout = AdminLayout