
import { DashboardLayout } from '../../../../layouts/dashboard-layout'
import { Card } from '../../../../components/shared/card/card'
import { CreateRule } from './component/create-rule';

export function CreateRulePage(props) {
    return <>
        <DashboardLayout
            breadcrumbs={[
                { title: "Quản trị", path: '/admin/manager' },
                { title: "Cấu hình hệ thống", path: '/admin/manager/config-system/config-system' },
                { title: "Tạo nguyên tắc", path: '/admin/manager/config-system/create-rule' }
            ]}
            activeMenu="Quản trị"
            activeSubmenu="Cấu hình hệ thống">
            <Card>
                <CreateRule />
            </Card>
        </DashboardLayout>
    </>
}