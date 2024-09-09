//creating scraper context to shear data between components
import React, { createContext, useState, useContext } from 'react';

//create new context object share data globally within a component tree without having to pass props manually at each level. 
const ScraperContext = createContext();
//Provides context values to its children.
export const ScraperProvider = ({ children }) => {
  //to pass the context value to children
  const [scrapedContent, setScrapedContent] = useState('');

  return (
    <ScraperContext.Provider value={{ scrapedContent, setScrapedContent }}>
      {children}
    </ScraperContext.Provider>
  );
};
//access to ScraperContext
export const useScraper = () => useContext(ScraperContext);
