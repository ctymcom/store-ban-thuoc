import { PostListPage } from "../../../components/admin/post/post-list-page";
import { PostListProvider } from "../../../components/admin/post/providers/post-list-provider";
import { AdminLayout } from "../../../layouts/admin-layout";

export default function List() {
    return <PostListProvider>
        <PostListPage/>
    </PostListProvider> 
}
List.Layout = AdminLayout