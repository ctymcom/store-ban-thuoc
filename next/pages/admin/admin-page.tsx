import { DashboardLayout } from "../../layouts/dashboard-layout";
import { Card } from '../../components/shared/card/card';
import { BasicStatistics } from '../../layouts/components/basic-statistics'
export function AdminPage() {
    return <DashboardLayout>
        <Card>
            <BasicStatistics></BasicStatistics>
        </Card>


    </DashboardLayout>
}