// File: src/components/QueryHistory.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadQueryFromHistory } from "../redux/slices/queriesSlice";
import { processQuery } from "../redux/thunks";
import "../index.css"; // Assuming you have Tailwind CSS set up

const QueryHistory = () => {
  const dispatch = useDispatch();
  const { history } = useSelector((state) => state.queries);

  // Load a query from history
  const handleHistoryItemClick = (queryText) => {
    dispatch(loadQueryFromHistory(queryText));
  };

  // Run a query from history
  const handleRunQuery = (queryText, e) => {
    e.stopPropagation();
    dispatch(loadQueryFromHistory(queryText));
    dispatch(processQuery(queryText));
  };

  if (history.length === 0) {
    return (
      <div className="card">
        <h2 className="recent-queries-title">Recent Queries</h2>
        <p className="no-queries-message">
          No queries yet. Try asking a business question above.
        </p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2 className="recent-queries-title">Recent Queries</h2>
      <ul className="space-y-3">
        {history.slice(0, 5).map((query) => (
          <li
            key={query.id}
            className="clickable-card"
            onClick={() => handleHistoryItemClick(query.text)}
          >
            <p className="text-gray-800 font-medium line-clamp-1">
              {query.text}
            </p>
            <div className="flex-container">
              <span className="text-xs text-gray-500">
                {new Date(query.timestamp).toLocaleTimeString()} •{" "}
                {new Date(query.timestamp).toLocaleDateString()}
              </span>
              <button
                onClick={(e) => handleRunQuery(query.text, e)}
                className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded hover:bg-indigo-200"
              >
                Run Again
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QueryHistory;
