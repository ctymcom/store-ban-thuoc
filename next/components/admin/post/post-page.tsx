import { DashboardLayoutAdmin } from "../../../layouts/dashboard-layout-admin";
import { ListPost } from "./component/list-post";

export function PostPage() {

    return <DashboardLayoutAdmin>
        <ListPost />
    </DashboardLayoutAdmin>
}