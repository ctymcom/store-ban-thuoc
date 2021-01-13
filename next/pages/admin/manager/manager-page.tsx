import { DashboardLayout } from "../../../layouts/dashboard-layout";
import { Card } from '../../../components/shared/card/card';
// import { BasicStatistics } from '../admin/components/basic-statistics'
// import { ChartMember } from './components/chart-member'
// import { ChartPoint } from './components/chart-point'
import dynamic from 'next/dynamic';
const BasicStatistics = dynamic<any>(() =>
  import('../components/basic-statistics').then((mod) => mod.BasicStatistics)
)
const ChartMember = dynamic<any>(() =>
  import('../components/chart-member').then((mod) => mod.ChartMember)
)
const ChartPoint = dynamic<any>(() =>
  import('../components/chart-point').then((mod) => mod.ChartPoint)
)
export function ManagerPage() {

  return <DashboardLayout>
    <div className="grid grid-cols-2 gap-4 max-w-6xl">
      <div className="col-span-2">
      <Card>
      <BasicStatistics />
      </Card>
        
      </div>
      <div className="col">
      <Card>
          <ChartMember></ChartMember>
        </Card>
      </div>
      <div className="col">
      <Card >
      <ChartPoint></ChartPoint>
    </Card>
      </div>
      
    </div>
    
    
    


  </DashboardLayout>
}