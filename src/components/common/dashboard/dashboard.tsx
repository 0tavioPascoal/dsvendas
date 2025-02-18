'use client'
import { DashboardProps } from "@/@types/dashboard/dashboardProps"
import { Chart } from 'primereact/chart';
import { Card } from "primereact/card"
import { Months } from "@/utils/months";
import React, { useEffect, useState } from "react"

export const Dashboard:React.FC<DashboardProps> = ({clientCount, productCount, sellCount, sellPerMonth }) => {
  const [chartJs, setChartJs] = useState({})

  const graphic = () => {
    const labels: string[] = sellPerMonth?.map(sm => Months[(sm.month ?? 1) - 1]);
    const valuesGraphic= sellPerMonth?.map(vm => vm.value)

    const graphicData = {
      labels: labels,
      datasets:[{
        label: 'Month Value',
        backgroundColor: '#42A5F5',
        data: valuesGraphic
      }]
    }
    setChartJs(graphicData)
  }

  useEffect(graphic, [])

  return(
   <div className="p-fluid">
    <div className="p-grid">
      <div className="p-col">
        <Card title="Products" className="has-background-danger">
          <p className="p-m-0 has-text-weight-bold is-size-6 has-text-white">{productCount}</p>
        </Card>
      </div>
      <div className="p-col">
      <Card title="Clients" className="has-background-info" >
        <p className="p-m-0 has-text-weight-bold is-size-6 has-text-white">{clientCount}</p>
      </Card>
      </div>
      <div className="p-col">
      <Card title="Sells" className="has-background-primary">
        <p className="p-m-0 has-text-weight-bold is-size-6 has-text-white">{sellCount}</p>
      </Card>
      </div>
    </div>
    < div className="p-grid">
                <div className="p-col">
                <Chart type="bar" data={chartJs}/>
                </div>
            </div>
   </div>
  )
}