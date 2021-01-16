import { useState } from 'react';

import { Card } from '../../../../components/shared/card/card';
import { DashboardLayout } from '../../../../layouts/dashboard-layout';
import { HeaderUserPage } from './component/header-userpage';
import { UserpageData } from './component/userpage-data';
import { ViewGridUserpage } from './component/view-grid-userpage';
import { ViewListUserpage } from './component/view-list-userpage';

export function UserPage(props) {
    const [View, setView] = useState(0);
    const handleView = (e) => {
        setView(e)
    }
    return <>
        <DashboardLayout>
            <div className="max-w-6xl">
                <Card>
                    <HeaderUserPage handleView={handleView} />
                    {
                        View == 0 ?
                            <ViewGridUserpage ListUserData={UserpageData} /> :
                            <ViewListUserpage ListUserData={UserpageData} />
                    }
                </Card>
            </div>
        </DashboardLayout>
    </>
}