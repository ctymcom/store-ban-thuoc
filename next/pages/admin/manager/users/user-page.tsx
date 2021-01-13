import { Card } from '../../../../components/shared/card/card';
import { DashboardLayout } from '../../../../layouts/dashboard-layout';
import { HeaderUserPage } from './component/header-userpage'
import { ViewListUserpage } from './component/view-list-userpage';
export function UserPage(props) {

    return <>
        <DashboardLayout>
            <div className="grid max-w-6xl">
                <Card>
                    <HeaderUserPage />
                    <ViewListUserpage />
                </Card>
            </div>
        </DashboardLayout>

    </>
}