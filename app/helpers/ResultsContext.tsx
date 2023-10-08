import React, { createContext, useContext, useState } from 'react';

// Create the context
const ResultsContext = createContext();

// Provide a provider component to wrap your application
export const ResultsProvider = ({ children }) => {
    const [results, setResults] = useState({}); // Initialize results in state

    return (
        <ResultsContext.Provider value={{ results, setResults }}>
            {children}
        </ResultsContext.Provider>
    );
};

// Export a custom hook to consume the context
export const useResults = () => {
    return useContext(ResultsContext);
};