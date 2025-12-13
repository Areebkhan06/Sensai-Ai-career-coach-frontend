import { Badge } from "@/components/ui/badge";
import {
  Brain,
  Briefcase,
  LineChart,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const DashBoardView = ({ userInfo }) => {
  const insights = userInfo?.industryInsights || {};

  const salaryData =
    insights.salaryRanges?.map((range) => ({
      name: range.role || "N/A",
      min: range.min ? range.min / 1000 : 0,
      max: range.max ? range.max / 1000 : 0,
      median: range.median ? range.median / 1000 : 0,
    })) || [];

  const getDemandLevelColor = (level) => {
    if (!level) return "bg-gray-500";
    switch (level.toLowerCase()) {
      case "high":
        return "bg-green-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getMarketOutLookInfo = (outlook) => {
    if (!outlook) return { icon: LineChart, color: "text-gray-500" };
    switch (outlook.toLowerCase()) {
      case "positive":
        return { icon: TrendingUp, color: "text-green-500" };
      case "neutral":
        return { icon: LineChart, color: "text-yellow-500" };
      case "negative":
        return { icon: TrendingDown, color: "text-red-500" };
      default:
        return { icon: LineChart, color: "text-gray-500" };
    }
  };

  const outlookInfo = getMarketOutLookInfo(insights.marketOutlook);
  const OutlookIcon = outlookInfo.icon;
  const outlookColor = outlookInfo.color;

  const nextUpdate = insights.nextUpdate ? new Date(insights.nextUpdate) : null;
  const lastUpdate = userInfo?.updatedAt ? new Date(userInfo.updatedAt) : null;

  let daysLeft = null;
  if (nextUpdate) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const next = new Date(
      nextUpdate.getFullYear(),
      nextUpdate.getMonth(),
      nextUpdate.getDate()
    );
    const diffTime = next - today;
    daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Badge variant={"outline"}>
          Last updated: {lastUpdate?.toLocaleDateString() || "N/A"}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
        {/* Market Outlook */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Market Outlook</CardTitle>
            <OutlookIcon className={`w-4 h-4 ${outlookColor}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {insights.marketOutlook || "N/A"}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Next update in {daysLeft ?? "N/A"} Days
            </p>
          </CardContent>
        </Card>

        {/* Industry Growth */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Industry Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {insights.growthRate != null
                ? insights.growthRate.toFixed(1) + "%"
                : "N/A"}
            </div>
            <Progress value={insights.growthRate || 0} className="mt-2" />
          </CardContent>
        </Card>

        {/* Demand Level */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Demand Level</CardTitle>
            <Briefcase className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{insights.demandLevel || "N/A"}</div>
            <div
              className={`w-full h-2 rounded-full mt-2 ${getDemandLevelColor(
                insights.demandLevel
              )}`}
            />
          </CardContent>
        </Card>

        {/* Top Skills */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0">
            <CardTitle className="text-sm font-medium">Top Skills</CardTitle>
            <Brain className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1">
              {insights.topSkills?.length
                ? insights.topSkills.map((skill, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))
                : "N/A"}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Salary Range */}
      <Card>
        <CardHeader>
          <CardTitle>Salary Range</CardTitle>
          <CardDescription>
            Displaying minimum, median, maximum salaries (in thousands)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={salaryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-background p-2 border shadow rounded">
                          <p className="font-bold">{label}</p>
                          {payload?.map((item) => (
                            <p key={item.dataKey}>
                              {item.name}: ${item.value}k
                            </p>
                          ))}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend />
                <Bar dataKey="min" fill="#94a3b8" name="Min Salary (K)" />
                <Bar dataKey="median" fill="#64748b" name="Median Salary (K)" />
                <Bar dataKey="max" fill="#475569" name="Max Salary (K)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Trends & Recommended Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Key Industry Trends</CardTitle>
            <CardDescription>Current trends shaping the industry</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {insights.keyTrends?.length
                ? insights.keyTrends.map((trend, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span>{trend}</span>
                    </li>
                  ))
                : "N/A"}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Recommended Skills</CardTitle>
            <CardDescription>Skill to consider developing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {insights.recommendedSkills?.length
                ? insights.recommendedSkills.map((skill, i) => (
                    <Badge key={i} variant="outline">
                      {skill}
                    </Badge>
                  ))
                : "N/A"}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashBoardView;
