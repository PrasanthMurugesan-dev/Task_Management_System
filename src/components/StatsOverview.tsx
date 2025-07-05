
import { Task } from "@/types/task";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, AlertCircle, Calendar } from "lucide-react";

interface StatsOverviewProps {
  tasks: Task[];
}

const StatsOverview = ({ tasks }: StatsOverviewProps) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === "completed").length;
  const inProgressTasks = tasks.filter(task => task.status === "in-progress").length;
  const pendingTasks = tasks.filter(task => task.status === "pending").length;
  const overdueTasks = tasks.filter(task => 
    task.dueDate && 
    task.dueDate < new Date() && 
    task.status !== "completed"
  ).length;

  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const stats = [
    {
      title: "Completed",
      value: completedTasks,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "In Progress",
      value: inProgressTasks,
      icon: Clock,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "Pending",
      value: pendingTasks,
      icon: AlertCircle,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100"
    },
    {
      title: "Overdue",
      value: overdueTasks,
      icon: Calendar,
      color: "text-red-600",
      bgColor: "bg-red-100"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium text-slate-600">Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-slate-900">{completionRate}%</div>
          <div className="text-sm text-slate-500">Completion Rate</div>
          <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
            <div 
              className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${completionRate}%` }}
            />
          </div>
        </div>
        
        <div className="space-y-3">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.title} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`w-8 h-8 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                    <Icon className={`w-4 h-4 ${stat.color}`} />
                  </div>
                  <span className="text-sm text-slate-600">{stat.title}</span>
                </div>
                <Badge variant="secondary" className="font-medium">
                  {stat.value}
                </Badge>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsOverview;
