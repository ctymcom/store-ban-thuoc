import { useState } from 'react'
import { DashboardLayout } from '../../../../layouts/dashboard-layout'
import { Card } from '../../../../components/shared/card/card'
import { HeaderConfigSystemPage } from './component/header-configSystem-page'
import { InformationCompany } from './component/information-company';
import { InformationApp } from './component/information-app';
import { ConfigAccount } from './component/config-account';
import { AntiFraud } from './component/anti-fraud';
import { UserpageData } from '../users/component/userpage-data';

export function ConfigSystemPage(props) {
    const [Session, setSession] = useState(1);
    var breadcrumbs = []
    var Session_view
    if (Session == 1) {
        Session_view = <InformationCompany />
        breadcrumbs = [
            { title: "Quản trị", path: '/admin/manager' },
            { title: "Cấu hình hệ thống", path: '/admin/manager/config-system/config-system' },
            { title: "Thông tin doanh nghiệp", path: '/admin/manager/config-system/config-system' }
        ]

    } else if (Session == 2) {
        Session_view = <InformationApp />
        breadcrumbs = [
            { title: "Quản trị", path: '/admin/manager' },
            { title: "Cấu hình hệ thống", path: '/admin/manager/config-system/config-system' },
            { title: "Thông tin chương trình", path: '/admin/manager/config-system/config-system' }
        ]
    } else if (Session == 3) {
        Session_view = <ConfigAccount />
        breadcrumbs = [
            { title: "Quản trị", path: '/admin/manager' },
            { title: "Cấu hình hệ thống", path: '/admin/manager/config-system/config-system' },
            { title: "Tài khoản", path: '/admin/manager/config-system/config-system' }
        ]
    } else if (Session == 4) {
        Session_view = <AntiFraud ListUserData={UserpageData} />
        breadcrumbs = [
            { title: "Quản trị", path: '/admin/manager' },
            { title: "Cấu hình hệ thống", path: '/admin/manager/config-system/config-system' },
            { title: "Chống gian lận", path: '/admin/manager/config-system/config-system' }
        ]
    }
    return <>
        <DashboardLayout
            breadcrumbs={
                breadcrumbs
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