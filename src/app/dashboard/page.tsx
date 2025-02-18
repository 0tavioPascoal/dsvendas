'use server'

import { Dashboard } from "@/components/common/dashboard/dashboard";
import { Layout } from "@/components/Layout/layout";
import { useDashboardService } from "@/context/dashboardContext";
import { DashboardData } from "@/types/dashboard/dashboardData";
import { redirect } from "next/navigation";
import { auth } from "@/auth"



export default async function Home() {
  const session = await auth()
  if(!session) return redirect("/")
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dashboarService = useDashboardService()
  const dashboard:DashboardData = await dashboarService.getDashboard()

  if(!dashboard.clientCount || !dashboard.productCount || !dashboard.sellCount || !dashboard.sellPerMonth){
    return <div>loading...</div>
  }
  

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