import { useState } from 'react'
import { HeaderEditUserPage } from "./header-edit-userpage"
import { AccountDecentralization } from './acount-decentralization'
import { AccountOverview } from './account-overview'

export function EditUser(props) {
    const { User } = props
    const [Session, setSession] = useState(1)
    const handleClick = (e) => {
        setSession(e)
    }
    return (
        <>
            <HeaderEditUserPage onclick={handleClick} />
            {
                Session == 1 ?
                    <AccountOverview User={User} /> :
                    <AccountDecentralization />
            }
        </>
    )
}