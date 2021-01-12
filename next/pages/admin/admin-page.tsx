import { DashboardLayout } from "../../layouts/dashboard-layout";
import { Card } from '../../components/shared/card/card';
// import { BasicStatistics } from '../admin/components/basic-statistics'
// import { ChartMember } from './components/chart-member'
// import { ChartPoint } from './components/chart-point'
import dynamic from 'next/dynamic';
const BasicStatistics = dynamic<any>(() =>
  import('./components/basic-statistics').then((mod) => mod.BasicStatistics)
)
const ChartMember = dynamic<any>(() =>
  import('./components/chart-member').then((mod) => mod.ChartMember)
)
const ChartPoint = dynamic<any>(() =>
  import('./components/chart-point').then((mod) => mod.ChartPoint)
)
export function AdminPage() {
    
    return <DashboardLayout>
        <Card width={'max-w-4xl'}>
            <BasicStatistics />
        </Card>
        <Card width={'max-w-md w-1/2 mr-1 inline-block'}>
            <ChartMember></ChartMember>
        </Card>
        <Card width={'max-w-md w-1/2 ml-1 inline-block'}>
            <ChartPoint></ChartPoint>
        </Card>


    </DashboardLayout>
}