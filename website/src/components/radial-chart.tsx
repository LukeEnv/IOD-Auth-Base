"use client";

import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import { ChartConfig, ChartContainer } from "@/components/ui/chart";

interface ComponentProps {
  title: string;
  label: string;
  percentage: number;
}

export default function Component({
  title,
  label,
  percentage,
}: ComponentProps) {
  const start = 90;
  //const end = -270;

  // Calculate end angle based on percentage from 90 degrees to -270 degrees
  const endAngle = start - 360 * (percentage / 100);

  console.log(endAngle);

  const chartData = [
    { browser: "safari", data: 1000, fill: "rgb(17, 109, 244)" },
  ];

  const chartConfig = {
    data: {
      label: title,
    },
    safari: {
      label: "Safari",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[100px]"
    >
      <RadialBarChart
        data={chartData}
        startAngle={start}
        endAngle={endAngle}
        innerRadius={30}
        outerRadius={45}
      >
        <PolarGrid
          gridType="circle"
          radialLines={false}
          stroke="none"
          className="first:fill-muted last:fill-background"
          polarRadius={[32, 27]}
        />
        <RadialBar dataKey="data" background cornerRadius={10} />
        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={(viewBox.cy ?? 0) + 3}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-lg font-bold font-poppins fill-primary"
                  >
                    {label}
                  </text>
                );
              }
            }}
          />
        </PolarRadiusAxis>
      </RadialBarChart>
    </ChartContainer>
  );
}
