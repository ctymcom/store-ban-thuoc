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
    <Card width={'max-w-4xl w-full'}>
      <BasicStatistics />
    </Card>
    <Card width={'max-w-md w-6/12 mr-0.5 inline-block '}>
      <ChartMember></ChartMember>
    </Card>
    <Card width={'max-w-md w-6/12 ml-0.5 inline-block '}>
      <ChartPoint></ChartPoint>
    </Card>


  </DashboardLayout>
}