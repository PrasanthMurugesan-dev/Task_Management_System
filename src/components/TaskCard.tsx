
import { Task, TaskStatus } from "@/types/task";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Calendar, User, MoreVertical, Check, Clock, AlertCircle } from "lucide-react";
import { format } from "date-fns";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onStatusChange: (taskId: string, status: TaskStatus) => void;
}

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }: TaskCardProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800 border-red-200";
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800 border-green-200";
      case "in-progress": return "bg-blue-100 text-blue-800 border-blue-200";
      case "pending": return "bg-gray-100 text-gray-800 border-gray-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <Check className="w-4 h-4" />;
      case "in-progress": return <Clock className="w-4 h-4" />;
      case "pending": return <AlertCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const isOverdue = task.dueDate && task.dueDate < new Date() && task.status !== "completed";

  return (
    <Card className={`transition-all duration-200 hover:shadow-md ${isOverdue ? 'border-red-200 bg-red-50/30' : ''}`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-3 mb-3">
              <h3 className={`text-lg font-semibold ${task.status === 'completed' ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                {task.title}
              </h3>
              <div className="flex items-center space-x-2">
                <Badge className={`${getPriorityColor(task.priority)} border`}>
                  {task.priority}
                </Badge>
                <Badge className={`${getStatusColor(task.status)} border flex items-center space-x-1`}>
                  {getStatusIcon(task.status)}
                  <span>{task.status}</span>
                </Badge>
              </div>
            </div>
            
            {task.description && (
              <p className="text-slate-600 mb-4 line-clamp-2">
                {task.description}
              </p>
            )}
            
            <div className="flex items-center space-x-4 text-sm text-slate-500">
              {task.dueDate && (
                <div className={`flex items-center space-x-1 ${isOverdue ? 'text-red-600 font-medium' : ''}`}>
                  <Calendar className="w-4 h-4" />
                  <span>{format(task.dueDate, 'MMM dd, yyyy')}</span>
                  {isOverdue && <span className="text-red-600">(Overdue)</span>}
                </div>
              )}
              
              {task.assignedTo && (
                <div className="flex items-center space-x-1">
                  <User className="w-4 h-4" />
                  <span>{task.assignedTo}</span>
                </div>
              )}
              
              {task.sharedWith.length > 0 && (
                <div className="flex items-center space-x-2">
                  <span className="text-xs">Shared with:</span>
                  <div className="flex -space-x-1">
                    {task.sharedWith.slice(0, 3).map((email, index) => (
                      <Avatar key={index} className="w-6 h-6 border-2 border-white">
                        <AvatarFallback className="text-xs">
                          {email.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {task.sharedWith.length > 3 && (
                      <div className="w-6 h-6 bg-slate-100 border-2 border-white rounded-full flex items-center justify-center text-xs text-slate-600">
                        +{task.sharedWith.length - 3}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-2">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white border border-slate-200 shadow-lg z-50">
              <DropdownMenuItem onClick={() => onEdit(task)}>
                Edit Task
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onStatusChange(task.id, task.status === 'completed' ? 'pending' : 'completed')}
              >
                {task.status === 'completed' ? 'Mark Incomplete' : 'Mark Complete'}
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onDelete(task.id)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                Delete Task
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
