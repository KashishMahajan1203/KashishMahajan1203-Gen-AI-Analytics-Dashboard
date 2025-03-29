// File: src/components/ResultsPanel.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { BarChart, LineChart, PieChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Bar, Line, Pie } from 'recharts';

const ResultsPanel = () => {
  const { loading, error, data } = useSelector(state => state.results);
  
  // Show loading state
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6 h-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Analyzing your data...</p>
          <p className="text-sm text-gray-500 mt-2">Our AI is processing your query</p>
        </div>
      </div>
    );
  }
  
  // Show error state
  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6 h-full">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error processing query</h3>
              <p className="mt-2 text-sm text-red-700">{error}</p>
              <p className="mt-2 text-sm text-red-700">Please try a different query or rephrase your question.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Show empty state
  if (!data) {
    return (
      <div className="bg-white rounded-lg shadow p-6 h-full flex items-center justify-center">
        <div className="text-center max-w-md">
          <svg className="h-12 w-12 text-indigo-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900">No data to display</h3>
          <p className="mt-2 text-sm text-gray-500">
            Ask a business question using the query panel to see insights and visualizations.
          </p>
        </div>
      </div>
    );
  }
  
  // Render visualization based on the visualization type
  const renderVisualization = () => {
    if (!data.data || !data.data.labels || !data.data.datasets) {
      return <p className="text-red-500">Invalid data format for visualization</p>;
    }
    
    const chartData = data.data.labels.map((label, index) => {
      const dataPoint = { name: label };
      data.data.datasets.forEach((dataset) => {
        dataPoint[dataset.label] = dataset.data[index];
      });
      return dataPoint;
    });
    
    switch (data.visualization) {
      case 'barChart':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              {data.data.datasets.map((dataset, index) => (
                <Bar 
                  key={index}
                  dataKey={dataset.label}
                  fill={index === 0 ? "#4f46e5" : "#818cf8"}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        );
        
      case 'lineChart':
      case 'multiLineChart':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              {data.data.datasets.map((dataset, index) => (
                <Line 
                  key={index}
                  type="monotone"
                  dataKey={dataset.label}
                  stroke={index === 0 ? "#4f46e5" : "#818cf8"}
                  activeDot={{ r: 8 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        );
        
      case 'pieChart':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                dataKey={data.data.datasets[0].label}
                nameKey="name"
                data={chartData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#4f46e5"
                label
              />
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );
        
      default:
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              {data.data.datasets.map((dataset, index) => (
                <Bar 
                  key={index}
                  dataKey={dataset.label}
                  fill={index === 0 ? "#4f46e5" : "#818cf8"}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        );
    }
  };
  
  // Render results with visualization
  return (
    <div className="bg-white rounded-lg shadow p-6 h-full">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Results</h2>
        <p className="text-gray-500">{data.query}</p>
      </div>
      
      <div className="mb-6">
        {renderVisualization()}
      </div>
      
      <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-100">
        <h3 className="text-md font-medium text-indigo-800 mb-2">AI Insight</h3>
        <p className="text-indigo-700">{data.insight}</p>
      </div>
    </div>
  );
};

export default ResultsPanel;