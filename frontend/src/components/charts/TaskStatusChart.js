import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#ffa81d", "#3faef8", "rgb(43, 232, 176)"]; // TODO, IN_PROGRESS, DONE

const TaskStatusChart = ({ tasks }) => {
  const statusCounts = {
    TODO: 0,
    IN_PROGRESS: 0,
    DONE: 0,
  };

  tasks.forEach((task) => {
    if (statusCounts[task.status] !== undefined) {
      statusCounts[task.status]++;
    }
  });

  const total = tasks.length || 1;

  const data = [
    { name: "To Do", value: statusCounts.TODO },
    { name: "In Progress", value: statusCounts.IN_PROGRESS },
    { name: "Done", value: statusCounts.DONE },
  ];

  return (
    <div style={{ width: "100%", height: 250 }}>
      <h4 style={{ textAlign: "center" }}>Task Status Overview</h4>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            className="pie-chart"
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
           
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      <div className="tasks-summary">
      <p>Total No. of task(s): {tasks.length}</p>
      <p>Unstarted Task(s): {statusCounts.TODO}</p>
      <p>In Progress Task(s): {statusCounts.IN_PROGRESS}</p>
      <p>Completed Task(s): {statusCounts.DONE}</p>
      
      </div>
    </div>
  );
};

export default TaskStatusChart;
