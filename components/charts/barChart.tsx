"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { useState, useEffect } from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart"

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

interface ChartData {
  mes: string;
  kilometros: number;
  precio: number;
}

const monthOrder: { [key: string]: number } = {
  "Enero": 0,
  "Febrero": 1,
  "Marzo": 2,
  "Abril": 3,
  "Mayo": 4,
  "Junio": 5,
  "Julio": 6,
  "Agosto": 7,
  "Septiembre": 8,
  "Octubre": 9,
  "Noviembre": 10,
  "Diciembre": 11,
};

function CustomBarChart() {
  const [chartData, setChartData] = useState<ChartData[]>([]);

  const getChartData = () => {
    const storedData = localStorage.getItem('userData');
    const jsonArray: Array<{ dof: string; kilometers: number; price: number }> = storedData ? JSON.parse(storedData) : [];

    const arrayData: ChartData[] = [];

    jsonArray.forEach((item) => {
      const date = new Date(item.dof);
      const monthString = date.toLocaleString('es-ES', { month: 'long' });
      const capitalizedMonth = monthString.charAt(0).toUpperCase() + monthString.slice(1);

      const existingData = arrayData.find((data) => data.mes === capitalizedMonth);
      
      if (existingData) {
        existingData.kilometros += item.kilometers;
        existingData.precio += item.price;
      } else {
        arrayData.push({
          mes: capitalizedMonth,
          kilometros: item.kilometers,
          precio: item.price
        });
      }
    });

    arrayData.sort((a, b) => monthOrder[a.mes] - monthOrder[b.mes]);
    setChartData(arrayData);
  };

  useEffect(() => {
    if (chartData.length === 0) getChartData();
  }, [chartData]);


  return (
    <div className="flex flex-col gap-4">
      <Card>
      <CardHeader>
        <CardTitle>Kilometros/mes</CardTitle>
        <CardDescription>Enero - Diciembre 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[100px]">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="mes"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => value}
              width={20}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="kilometros" fill="var(--color-mobile)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
    <Card >
      <CardHeader>
        <CardTitle>Gasto/mes</CardTitle>
        <CardDescription>Enero - Diciembre 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[100px]">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="mes"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => value}
              width={20} 
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="precio" fill="var(--color-desktop)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>

    </div>
  )
}

export {CustomBarChart}