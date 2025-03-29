import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  history: [],
  current: '',
  suggestions: [],
  loading: false,
  error: null,
};

export const queriesSlice = createSlice({
  name: 'queries',
  initialState,
  reducers: {
    setCurrentQuery: (state, action) => {
      state.current = action.payload;
      
      // Simulate AI-powered suggestions
      if (action.payload.length > 3) {
        state.suggestions = generateSuggestions(action.payload);
      } else {
        state.suggestions = [];
      }
    },
    submitQuery: (state) => {
      state.loading = true;
      state.error = null;
      
      // Add to history if not empty
      if (state.current.trim() !== '') {
        state.history.unshift({
          text: state.current,
          timestamp: new Date().toISOString(),
          id: Date.now().toString()
        });
      }
    },
    querySuccess: (state) => {
      state.loading = false;
    },
    queryFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearSuggestions: (state) => {
      state.suggestions = [];
    },
    loadQueryFromHistory: (state, action) => {
      state.current = action.payload;
    }
  },
});

// Helper function to generate AI-powered suggestions
function generateSuggestions(query) {
  const suggestionBank = [
    "What was our revenue growth last quarter?",
    "Show me sales performance by region",
    "Compare customer acquisition cost across marketing channels",
    "Analyze product usage patterns for premium users",
    "What is our customer retention rate over the past year?",
    "Identify top-performing marketing campaigns",
    "Show monthly active users trend",
    "What departments have the highest expenses?",
    "Compare conversion rates across different landing pages"
  ];
  
  // Filter suggestions that match the current query
  return suggestionBank
    .filter(suggestion => 
      suggestion.toLowerCase().includes(query.toLowerCase()) && 
      suggestion.toLowerCase() !== query.toLowerCase()
    )
    .slice(0, 3); // Limit to 3 suggestions
}

export const { 
  setCurrentQuery, 
  submitQuery, 
  querySuccess, 
  queryFailure, 
  clearSuggestions,
  loadQueryFromHistory
} = queriesSlice.actions;

export default queriesSlice.reducer;
