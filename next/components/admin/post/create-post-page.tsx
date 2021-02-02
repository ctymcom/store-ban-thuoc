import { AdminLayout } from "../../../layouts/admin-layout";
import { CreatePost } from "./component/create-post";
import { EditPostProvider } from "./providers/edit-post-provider";
type CreatePostPageProps = {
  [x: string]: any;
  postId?: string;
};
export function CreatePostPage({ postId }: CreatePostPageProps) {
  return (
    <AdminLayout>
      <EditPostProvider postId={postId}>
        <CreatePost />
      </EditPostProvider>
    </AdminLayout>
  );
}
