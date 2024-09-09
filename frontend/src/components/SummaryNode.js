import React, { useState, useEffect, useCallback } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { useScraper } from './ScraperContext';
//Ui component node
export const SummaryNode = () => {
  const { scrapedContent } = useScraper(); // Use context to get the scraped content
  const [summary, setSummary] = useState('');
//useCallback make recall when summary content change upon user change url and get ne content
  const generateSummary = useCallback(async () => {
    if (!scrapedContent) return; // If there's no content, don't attempt to generate a summary
    try {
      const response = await fetch('http://127.0.0.1:8000/api/summary/',{
        method : 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({data: scrapedContent })
      });
      if(!response.ok){
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const result = await response.json();
      setSummary(result.summary);
    } catch (error) {
      console.error('Error generating summary', error);
    }
  }, [scrapedContent]);
//Hook alow to perform the effects on node
  useEffect(() => {
    //debug line
    console.log('SummaryNode - Scraped Content:', scrapedContent);
    //check if theres content to display in node summary
    if (scrapedContent) {
      generateSummary();
    }
  }, [scrapedContent, generateSummary]);

  return (
    <div className="node summary">
      <Handle type="target" position={Position.Left} />
      <div className="title-card">
        <h5 className="card-title">
          <img src={require('../image/profile.png')} alt="Logo" width="30" height="30" />
          Summary
        </h5>
      </div>
      <p className="card-text">
        {/* check if summary is start to generated */}
        {summary || (scrapedContent ? 'Generating summary...' : 'Waiting for scraped content...')}
      </p>
    </div>
  );
};
