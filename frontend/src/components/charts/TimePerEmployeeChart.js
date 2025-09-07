import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const TimePerEmployeeChart = ({ employees, timeLogs }) => {
  // Calculate total time per employee
  const data = useMemo(() => {
    return employees.map((emp) => {
      const empLogs = timeLogs.filter((log) => log.user?.id === emp.id);
      const totalMinutes = empLogs.reduce((sum, log) => sum + (log.duration || 0), 0);
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      return {
        name: emp.name,
        totalMinutes,
        display: `${hours}h ${minutes}m`,
      };
    });
  }, [employees, timeLogs]);

  // Set fixed chart height and allow scroll for overflow
  const maxVisibleEmployees = 8; // number of employees to show without scroll
  const rowHeight = 50;
  const chartHeight = Math.min(data.length, maxVisibleEmployees) * rowHeight;

  return (
    <div
      style={{
        width: "100%",
        height: chartHeight,
        overflowY: data.length > maxVisibleEmployees ? "auto" : "visible",
        
        borderRadius: "8px",
        padding: "8px",
      }}
    >
      <ResponsiveContainer width="100%" height={data.length > maxVisibleEmployees ? data.length * rowHeight : "100%"}>
        <BarChart layout="vertical" data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis
            dataKey="name"
            type="category"
            width={120}
            tick={{ fontSize: 13 }}
          />
          <Tooltip
            formatter={(value, name, props) => {
              return props.payload.display;
            }}
          />
          <Bar dataKey="totalMinutes" fill=" rgb(43, 232, 176)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TimePerEmployeeChart;
