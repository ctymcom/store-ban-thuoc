import { AdminLayout } from "../../../layouts/admin-layout";
import { CreatePost } from "./component/create-post";

export function CreatePostPage() {

    return <AdminLayout>
        <CreatePost />
    </AdminLayout>
}