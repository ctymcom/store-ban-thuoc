import { useState } from 'react'
import { DashboardLayout } from '../../../../layouts/dashboard-layout'
import { Card } from '../../../../components/shared/card/card'
import { HeaderConfigSystemPage } from './component/header-configSystem-page'
import { InformationCompany } from './component/information-company';
import { InformationApp } from './component/information-app';
import { ConfigAccount } from './component/config-account';
export function ConfigSystemPage(props) {
    const [Session, setSession] = useState(1);
    var Session_view
    if (Session == 1) {
        Session_view = <InformationCompany />
    } else if (Session == 2) {
        Session_view = <InformationApp />
    } else if (Session == 3) {
        Session_view = <ConfigAccount />
    }
    return <>
        <DashboardLayout
            breadcrumbs={
                [
                    { title: "Quản trị", path: '/admin/manager' },
                    { title: "Cấu hình hệ thống", path: '/admin/manager/configsystem' }
                ]
            }
            activeMenu="Quản trị"
            activeSubmenu="Cấu hình hệ thống">
            <Card>
                <HeaderConfigSystemPage onclick={(e) => { setSession(e) }} />
                {
                    Session_view
                }
            </Card>
        </DashboardLayout>
    </>
}