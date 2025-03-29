// File: src/components/QueryPanel.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentQuery } from '../redux/slices/queriesSlice';
import { processQuery } from '../redux/thunks';
import '../index.css'; // Assuming you have Tailwind CSS set up

const QueryPanel = () => {
  const dispatch = useDispatch();
  const { current, suggestions, loading } = useSelector(state => state.queries);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);
  
  // Handle query input change
  const handleInputChange = (e) => {
    dispatch(setCurrentQuery(e.target.value));
    setShowSuggestions(true);
  };
  
  // Handle query submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (current.trim()) {
      dispatch(processQuery(current));
      setShowSuggestions(false);
    }
  };
  
  // Handle suggestion selection
  const handleSuggestionClick = (suggestion) => {
    dispatch(setCurrentQuery(suggestion));
    setShowSuggestions(false);
    inputRef.current.focus();
  };
  
  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target) && 
          inputRef.current && !inputRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <div className="card">
<h2 className="ask-question-title">Ask your business question</h2>      
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={current}
            onChange={handleInputChange}
            placeholder="e.g. What was our revenue growth last quarter?"
            className="full-width px-4 py-3 border border-gray-300 rounded-lg focus"
            disabled={loading}
          />
          
          {/* AI Suggestions */}
          {showSuggestions && suggestions.length > 0 && (
            <div 
              ref={suggestionsRef}
              className="absolute top-full left-0 right-0 bg-white mt-1 border border-gray-300 rounded-lg shadow-lg z-10"
            >
              <ul>
                {suggestions.map((suggestion, index) => (
                  <li 
                    key={index}
                    className="px-4 py-2 hover:bg-indigo-50 cursor-pointer text-gray-700"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <button
          type="submit"
          disabled={loading || !current.trim()}
          className={`mt-4 w-full px-4 py-3 rounded-lg ${
            loading || !current.trim() 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          } transition-colors`}
        >
          {loading ? 'Processing...' : 'Get Insights'}
        </button>
      </form>
    </div>
  );
};

export default QueryPanel;