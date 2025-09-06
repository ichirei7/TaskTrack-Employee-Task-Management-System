import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { getAllTimeLogs } from "../../services/timeLogService";

const TimeLoggedChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchTimeLogs = async () => {
      try {
        const res = await getAllTimeLogs();
        const logs = res.data;

        // Aggregate duration by project name
        const projectDurations = {};

        logs.forEach((log) => {
          const project = log.task?.project;
          if (project && project.name) {
            const name = project.name;
            const duration = log.duration || 0;

            if (!projectDurations[name]) {
              projectDurations[name] = 0;
            }
            projectDurations[name] += duration;
          }
        });

        // Convert to chart-friendly format
        const formattedData = Object.entries(projectDurations).map(([name, duration]) => ({
          project: name,
          hours: Math.round(duration / 60), // assuming duration is in minutes
        }));

        setChartData(formattedData);
      } catch (err) {
        console.error("Error fetching time logs:", err);
      }
    };

    fetchTimeLogs();
  }, []);

  return (
    <div style={{ width: "100%", height: 400 }}>
      <h4 style={{ textAlign: "center" }}>⏱️ Time Logged per Project</h4>
      <ResponsiveContainer>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="project" />
          <YAxis label={{ value: "Hours", angle: -90, position: "insideLeft" }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="hours" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TimeLoggedChart;
