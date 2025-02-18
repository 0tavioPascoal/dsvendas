'use server'

import { Dashboard } from "@/components/common/dashboard/dashboard";
import { Layout } from "@/components/Layout/layout";
import { useDashboardService } from "@/context/dashboardContext";
import { DashboardData } from "@/@types/dashboard/dashboardData";

export default async function DashboardPage() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const dashboardService = useDashboardService()
    const dashboard:DashboardData = await dashboardService.getDashboard()


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