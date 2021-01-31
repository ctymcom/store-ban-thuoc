import { DashboardLayoutAdmin } from "../../../layouts/dashboard-layout-admin";
import { CreatePost } from "./component/create-post";

export function CreatePostPage() {

    return <DashboardLayoutAdmin>
        <CreatePost />
    </DashboardLayoutAdmin>
}