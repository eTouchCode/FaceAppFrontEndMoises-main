import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Chart from 'chart.js/auto';

const AttendanceByLocationChart = () => {
  const [mapData, setMapData] = useState(null);
  const [barChartData, setBarChartData] = useState(null);

  useEffect(() => {
    // Mock data for demonstration purposes
    const locations = [
      { name: 'Office A', coordinates: [51.505, -0.09], attendance: 80 },
      { name: 'Office B', coordinates: [51.515, -0.1], attendance: 90 },
      { name: 'Office C', coordinates: [51.525, -0.11], attendance: 75 },
    ];

    // Map data
    const mapData = locations.map((location) => ({
      name: location.name,
      coordinates: location.coordinates,
    }));

    setMapData(mapData);

    // Bar chart data
    const barChartData = {
      labels: locations.map((location) => location.name),
      datasets: [
        {
          label: 'Attendance',
          data: locations.map((location) => location.attendance),
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };

    setBarChartData(barChartData);

    // Cleanup on component unmount
    return () => {
      setMapData(null);
      setBarChartData(null);
    };
  }, []);

  useEffect(() => {
    // Render the bar chart once data is available
    if (barChartData) {
      const ctx = document.getElementById('barChart').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: barChartData,
        options: {
          responsive: true,
          scales: {
            x: {
              stacked: true,
            },
            y: {
              stacked: true,
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [barChartData]);

  return (
    <div>
      {/* Map */}
      <MapContainer style={{ height: '300px', width: '100%' }} center={[51.505, -0.09]} zoom={13}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {mapData &&
          mapData.map((location) => (
            <Marker key={location.name} position={location.coordinates}>
              <Popup>{location.name}</Popup>
            </Marker>
          ))}
      </MapContainer>

      {/* Bar Chart */}
      {barChartData && (
        <canvas id="barChart" width="400" height="200" style={{ marginTop: '20px' }}></canvas>
      )}
    </div>
  );
};

export default AttendanceByLocationChart;
