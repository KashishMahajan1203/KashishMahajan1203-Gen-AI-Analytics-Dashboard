import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
  visualization: 'bar',
  loading: false,
  error: null,
};

export const resultsSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {
    setResultsLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setResultsData: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    setResultsError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setVisualizationType: (state, action) => {
      state.visualization = action.payload;
    },
    clearResults: (state) => {
      state.data = null;
      state.error = null;
    }
  },
});

export const { 
  setResultsLoading, 
  setResultsData, 
  setResultsError, 
  setVisualizationType,
  clearResults
} = resultsSlice.actions;

export default resultsSlice.reducer;