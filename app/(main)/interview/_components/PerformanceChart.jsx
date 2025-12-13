"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const PerformanceChart = ({ assesments }) => {
  const [chartData, setchartData] = useState([]);

  useEffect(() => {
    if (!assesments.length) return;

    const formattedData = assesments.map((a) => ({
      date: new Date(a.createdAt).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      score: a.quizScore * 10, // if out of 10
    }));

    setchartData(formattedData);
  }, [assesments]);


  return (
    <Card>
      <CardHeader>
        <CardTitle className={"text-3xl md:text-4xl gradient-title"}>
          Performace Trend
        </CardTitle>
        <CardDescription>Your quiz score over time</CardDescription>
      </CardHeader>
      <CardContent className={"bg-transparent"}>
        <div className="h-[300px]">
          <ResponsiveContainer>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 100]} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-background border rounded-lg p-2 shadow-md">
                        <p className="text-sm font-medium">
                          Score: {payload[0].value}%
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Date: {payload[0].payload.date}
                        </p>
                      </div>
                    );
                  }
                  return null; // ← important!
                }}
              />

              <Legend />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#fff"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceChart;
