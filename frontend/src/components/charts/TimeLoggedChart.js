import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { getTotalDurationByProject } from "../../services/timeLogService";

const TimeLoggedChart = ({ projects }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDurations = async () => {
      if (!projects || projects.length === 0) return;

      const results = await Promise.all(
        projects.map(async (proj) => {
          try {
            const res = await getTotalDurationByProject(proj.id || proj._id);
            const totalMinutes = res.data || 0;
            const hours = Math.floor(totalMinutes / 60);
            const minutes = totalMinutes % 60;
            return {
              name: proj.name,
              totalMinutes,
              hours,
              minutes,
              display: `${hours}h ${minutes}m`,
              totalHours: totalMinutes / 60, // for X-axis
            };
          } catch (err) {
            console.error("Error fetching duration for project", proj.name, err);
            return {
              name: proj.name,
              totalMinutes: 0,
              hours: 0,
              minutes: 0,
              display: "0h 0m",
              totalHours: 0,
            };
          }
        })
      );

      // Sort descending (busiest first)
      results.sort((a, b) => b.totalMinutes - a.totalMinutes);

      setData(results);
      console.log("⏱️ Project time data (hours):", results);
    };

    fetchDurations();
  }, [projects]);

  return (
    <div className="chart-card">
      <h3>⏱️ Time Logged Per Project</h3>
      <ResponsiveContainer width="100%" height={50 * data.length}>
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          {/* X-axis in hours */}
          <XAxis
            type="number"
            dataKey="totalHours"
            label={{ value: "Hours", position: "insideBottom", offset: -5 }}
            tickFormatter={(val) => val.toFixed(1)} // show 1 decimal
          />
          <YAxis type="category" dataKey="name" width={200} tick={{ fontSize: 13 }}/>
          <Tooltip
            formatter={(value, name, props) =>
              props.payload.totalMinutes > 0
                ? [props.payload.display, "Total Time"]
                : ["No work logged yet", "Total Time"]
            }
          />
          <Bar
            dataKey="totalHours"
            fill=" rgb(43, 232, 176)"
            radius={[0, 0, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
      <p className="chart-note">
        This chart shows the total tracked time for each project (via Start/Stop timer), in hours.
      </p>
    </div>
  );
};

export default TimeLoggedChart;
