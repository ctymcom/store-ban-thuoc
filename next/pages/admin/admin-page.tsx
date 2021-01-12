import { DashboardLayout } from "../../layouts/dashboard-layout";
import { Card } from '../../components/shared/card/card';
import { BasicStatistics } from '../../layouts/components/basic-statistics'
import { ChartMember } from '../../layouts/components/chart-member'

export function AdminPage() {
    return <DashboardLayout>
        <Card width={'max-w-4xl'}>
            <BasicStatistics></BasicStatistics>
        </Card>
        <Card width={'max-w-md w-1/2 inline-block'}>
            <ChartMember></ChartMember>
        </Card>
        <Card width={'max-w-md w-1/2 inline-block'}>
            <ChartMember></ChartMember>
        </Card>


    </DashboardLayout>
}