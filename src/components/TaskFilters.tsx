
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface TaskFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const TaskFilters = ({ activeFilter, onFilterChange }: TaskFiltersProps) => {
  const filters = [
    { key: "all", label: "All Tasks" },
    { key: "today", label: "Due Today" },
    { key: "overdue", label: "Overdue" },
    { key: "pending", label: "Pending" },
    { key: "in-progress", label: "In Progress" },
    { key: "completed", label: "Completed" },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <Button
          key={filter.key}
          variant={activeFilter === filter.key ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange(filter.key)}
          className={activeFilter === filter.key 
            ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" 
            : "hover:bg-slate-50"
          }
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
};

export default TaskFilters;
