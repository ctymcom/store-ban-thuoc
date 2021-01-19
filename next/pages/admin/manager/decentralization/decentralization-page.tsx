
import { HeaderDecentralizationPage } from "./component/header-decentralization"
import { DashboardLayout } from '../../../../layouts/dashboard-layout'
import { Card } from '../../../../components/shared/card/card'
import { Decentralization } from "./component/decentralization"
export function DecentralizationPage(props) {
    return <>
        <DashboardLayout
            breadcrumbs={
                [
                    { title: "Quản trị", path: '/admin/manager' },
                    { title: "Phân quyền", path: '/admin/manager/decentralization' }
                ]
            }
            activeMenu="Quản trị"
            activeSubmenu="Phân quyền">
            <Card>
                <HeaderDecentralizationPage />
                <Decentralization />
            </Card>
        </DashboardLayout>
    </>
}