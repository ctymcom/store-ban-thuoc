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
            <DashboardLayout>
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