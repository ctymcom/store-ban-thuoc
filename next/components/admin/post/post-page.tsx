import { AdminLayout } from "../../../layouts/admin-layout";
import { ListPost } from "./component/list-post";

export function PostPage() {

    return <AdminLayout>
        <ListPost />
    </AdminLayout>
}