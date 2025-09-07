import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

const TasksPerEmployeeChart = ({ employees, tasks }) => {
  const data = useMemo(() => {
    return employees.map((emp) => {
      const empTasks = tasks.filter((t) => t.assignedTo?.id === emp.id);

      // Count per status
      const todo = empTasks.filter((t) => t.status === "TODO").length;
      const inProgress = empTasks.filter((t) => t.status === "IN_PROGRESS").length;
      const done = empTasks.filter((t) => t.status === "DONE").length;

      return {
        name: emp.name,
        todo,
        inProgress,
        done,
      };
    });
  }, [employees, tasks]);

  const maxVisibleEmployees = 8;
  const rowHeight = 50;

  return (
    <div
      style={{
        width: "100%",
        height:
          data.length > maxVisibleEmployees
            ? maxVisibleEmployees * rowHeight
            : data.length * rowHeight,
        overflowY: data.length > maxVisibleEmployees ? "auto" : "visible",
        borderRadius: "8px",
        padding: "8px",
      }}
    >
      <ResponsiveContainer
        width="100%"
        height={data.length > maxVisibleEmployees ? data.length * rowHeight : "100%"}
      >
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" width={120} tick={{ fontSize: 13 }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="todo" stackId="a" fill="#ffa81d" name="To Do" />
          <Bar dataKey="inProgress" stackId="a" fill="#3faef8" name="In Progress" />
          <Bar dataKey="done" stackId="a" fill="rgb(43, 232, 176)" name="Done" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TasksPerEmployeeChart;
