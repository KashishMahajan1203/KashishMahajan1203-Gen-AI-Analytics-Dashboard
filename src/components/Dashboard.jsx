// File: src/components/Dashboard.jsx
import React from 'react';
import QueryPanel from './QueryPanel';
import QueryHistory from './QueryHistory';
import ResultsPanel from './ResultsPanel';
import '../index.css'; // Assuming you have Tailwind CSS set up

const Dashboard = () => {
  // const { loading: queryLoading } = useSelector(state => state.queries);
  // const { loading: resultsLoading, data: resultsData } = useSelector(state => state.results);
  
  return (
    <div className="full-height">
      <header className="header ">
        <div className="container ">
          <h1 className="dashboard-title">Gen AI Analytics Dashboard</h1>
          <p className="text-gray ">Ask questions, get instant insights</p>
        </div>
      </header>
      
      <main className="main">
        <div className="grid-container">
          {/* Left column: Query input and history */}
          <div className="col-span-1 space-y-6">
            <QueryPanel />
            <QueryHistory />
          </div>
          
          {/* Right column: Results visualization */}
          <div className="col-span-2">
            <ResultsPanel />
          </div>
        </div>
      </main>
      
      <footer className="footer">
        <div className="container">
          Gen AI Analytics Tool - Demo Dashboard
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;