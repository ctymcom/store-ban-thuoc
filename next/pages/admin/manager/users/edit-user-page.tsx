import { useState } from 'react'
import { HeaderEditUserPage } from "./component/header-edit-userpage"
import { AccountDecentralization } from './component/acount-decentralization'
import { AccountOverview } from './component/account-overview'
import { DashboardLayout } from '../../../../layouts/dashboard-layout'
import { Card } from '../../../../components/shared/card/card'
import { UserpageData } from './component/userpage-data'

export function EditUserPage(props) {
    const { User } = props
    const [Session, setSession] = useState(1)
    const handleClick = (e) => {
        setSession(e)
    }
    return (
        <>
            <DashboardLayout
                breadcrumbs={Session == 1 ?
                    [
                        { title: "Quản trị", path: '/admin/manager' },
                        { title: "Tài khoản", path: '/admin/manager/users' },
                        { title: "Chỉnh sửa tài khoản", path: '/admin/manager/users/edit' }
                    ] :
                    [
                        { title: "Quản trị", path: '/admin/manager' },
                        { title: "Tài khoản", path: '/admin/manager/users' },
                        { title: "Phân quyền", path: '/admin/manager/users/edit' }
                    ]
                }
                activeMenu="Quản trị"
                activeSubmenu="Tài khoản">
                <Card>
                    <HeaderEditUserPage onclick={handleClick} />
                    {
                        Session == 1 ?
                            <AccountOverview User={UserpageData[0]} /> :
                            <AccountDecentralization />
                    }
                </Card>
            </DashboardLayout>

        </>
    )
}