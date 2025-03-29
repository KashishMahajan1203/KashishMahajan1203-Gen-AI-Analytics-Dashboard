import { submitQuery, querySuccess, queryFailure } from './slices/queriesSlice';
import { setResultsLoading, setResultsData, setResultsError } from './slices/resultsSlice';

// Thunk for handling query submission
export const processQuery = (query) => async (dispatch) => {
  // Submit the query
  dispatch(submitQuery());
  dispatch(setResultsLoading());
  
  try {
    // Simulate API call with delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate mock results based on query
    const results = generateMockResults(query);
    
    dispatch(setResultsData(results));
    dispatch(querySuccess());
  } catch (error) {
    dispatch(setResultsError('Failed to process query. Please try again.'));
    dispatch(queryFailure('An error occurred while processing your query.'));
  }
};

// Helper function to generate mock results
function generateMockResults(query) {
  const lowercaseQuery = query.toLowerCase();
  
  // Default result structure
  let result = {
    query,
    timestamp: new Date().toISOString(),
    insight: "Analysis complete. Here are the insights based on your query.",
    visualization: "barChart"
  };
  
  // Revenue-related query
  if (lowercaseQuery.includes('revenue') || lowercaseQuery.includes('sales')) {
    result.data = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Revenue ($millions)",
          data: [4.3, 5.1, 5.8, 6.2, 6.8, 7.5]
        }
      ]
    };
    result.insight = "Revenue has shown a consistent growth pattern, with an average monthly increase of 12%.";
    result.visualization = "lineChart";
  }
  // Region-related query
  else if (lowercaseQuery.includes('region') || lowercaseQuery.includes('geographic')) {
    result.data = {
      labels: ["North America", "Europe", "Asia", "South America", "Africa", "Oceania"],
      datasets: [
        {
          label: "Sales (units)",
          data: [12500, 9800, 15200, 4300, 2100, 3600]
        }
      ]
    };
    result.insight = "Asia has become our top-performing region, surpassing North America by 21.6% this quarter.";
    result.visualization = "barChart";
  }
  // User-related query
  else if (lowercaseQuery.includes('user') || lowercaseQuery.includes('customer')) {
    result.data = {
      labels: ["Q1", "Q2", "Q3", "Q4"],
      datasets: [
        {
          label: "New Users",
          data: [2400, 3100, 3800, 4200]
        },
        {
          label: "Returning Users",
          data: [1800, 2100, 2700, 3400]
        }
      ]
    };
    result.insight = "User retention has improved by 15% while new user acquisition continues to grow steadily.";
    result.visualization = "multiLineChart";
  }
  // Marketing-related query
  else if (lowercaseQuery.includes('marketing') || lowercaseQuery.includes('campaign')) {
    result.data = {
      labels: ["Search", "Social", "Email", "Direct", "Referral"],
      datasets: [
        {
          label: "Conversion Rate (%)",
          data: [3.2, 2.8, 4.5, 2.1, 3.7]
        }
      ]
    };
    result.insight = "Email campaigns show the highest conversion rate at 4.5%, suggesting we should increase investment in this channel.";
    result.visualization = "pieChart";
  }
  // Default response for other queries
  else {
    result.data = {
      labels: ["Category A", "Category B", "Category C", "Category D", "Category E"],
      datasets: [
        {
          label: "Values",
          data: [65, 78, 52, 91, 43]
        }
      ]
    };
    result.insight = "Analysis complete based on your query. Please refine your question for more specific insights.";
    result.visualization = "barChart";
  }
  
  return result;
}
