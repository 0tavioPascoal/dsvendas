'use server'

import { Dashboard } from "@/components/common/dashboard/dashboard";
import { Layout } from "@/components/Layout/layout";
import { useDashboardService } from "@/context/dashboardContext";
import { DashboardData } from "@/types/dashboard/dashboardData";
import { HomeProps } from "@/types/homeProps";

export default async function Home<HomeProps>() {
  const dashboarService = useDashboardService()
  const dashboard:DashboardData = await dashboarService.getDashboard()
  

  return (
    <div >
     <Layout titulo="Dashboard">
        <Dashboard 
        clientCount={dashboard.clientCount}
         productCount={dashboard.productCount} 
         sellCount={dashboard.sellCount}
         sellPerMonth={dashboard.sellPerMonth ?? []}
         />
     </Layout>
    </div>
  );
}