import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const MonthlyComparisonChart = () => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Mock data for demonstration purposes
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    const presentData = [18, 19, 20, 17, 20, 18, 19, 20, 18, 20, 19, 18];
    const officialOff = [8,   6,  9,  5,  8, 10,  6,  8,  4, 9 ,  6, 12];
    const absentData = [daysInMonth[0] - presentData[0] - officialOff[0], daysInMonth[1] - presentData[1]  - officialOff[1], daysInMonth[2] - presentData[2]  - officialOff[2], daysInMonth[3] - presentData[3]  - officialOff[3], daysInMonth[4] - presentData[4]  - officialOff[4], daysInMonth[5] - presentData[5]  - officialOff[5], daysInMonth[6] - presentData[6]  - officialOff[6], daysInMonth[7] - presentData[7]   - officialOff[7], daysInMonth[8] - presentData[8]  - officialOff[8], daysInMonth[9] - presentData[9]   - officialOff[9], daysInMonth[10] - presentData[10]   - officialOff[10], daysInMonth[11] - presentData[11]   - officialOff[11]];

    const data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
        {
          label: 'Present',
          data: presentData,
          backgroundColor: 'rgba(0, 45, 98, 1)',
          borderColor: 'rgba(0, 45, 98, 1)',
          borderWidth: 1,
        },
        {
          label: 'Absent',
          data: absentData,
          backgroundColor: 'rgba(249, 98, 159, 1)',
          borderColor: 'rgba(249, 98, 159, 1)',
          borderWidth: 1,
        },
        {
          label: 'OfficialOff',
          data: officialOff,
          backgroundColor: 'rgba(137, 207, 240, 1)',
          borderColor: 'rgba(137, 207, 240, 1)',
          borderWidth: 1,
        },
      ],
    };

    setChartData(data);

    // Cleanup on component unmount
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
      setChartData(null);
    };
  }, []);

  useEffect(() => {
    // Render the chart once data is available
    if (chartData) {
      const ctx = document.getElementById('monthlyComparisonChart').getContext('2d');

      // Destroy previous chart instance if it exists
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      // Create a new chart instance
      chartRef.current = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: {
          responsive: true,
          scales: {
            x: {
              stacked: true,
            },
            y: {
              stacked: true,
            },
          },
        },
      });
    }
  }, [chartData]);

  return <canvas id="monthlyComparisonChart" width="400" height="105"></canvas>;
};

export default MonthlyComparisonChart;
