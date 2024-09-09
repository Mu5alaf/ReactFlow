import React, { useState, useEffect } from 'react';
import { Handle, Position } from 'react-flow-renderer';//import Ui component
import { useScraper } from './ScraperContext'; //calling useScraper from ScraperContext file

//node component in ui
export const ScrapperNode = () => {
  const { setScrapedContent } = useScraper();
  const [url, setUrl] = useState('');//holding user entered url
//The useEffect Hook allows you to perform side effects in your components. (fetchScrapedData)
  useEffect(() => {
    const fetchScrapedData = async () => {
      if (!url) return;//check if url is not empty
      try {
        const response = await fetch('http://127.0.0.1:8000/api/scrape/', {//pass url to backend api
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url })
          });
          if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
          }
        const scrapedData = await response.json(); //get backend respond
        console.log(scrapedData)
        // console.log('Scrapped Data:', scrapedData);
        setScrapedContent(scrapedData); //update data that we got from backend
      } catch (error) {
        console.error('Error scraping data', error);
      }
    };

    fetchScrapedData();//calling both fun
  }, [url, setScrapedContent]);

  return (
    <div className="node webscrapper">
      <Handle type="source" position={Position.Right} />
      <img src={require('../image/web.png')} alt="Logo" width="30" height="30" />
      <input
        type="text"
        placeholder="Enter URL"
        value={url}
        //onChange tracking url update and generate with the new url
        onChange={(e) => setUrl(e.target.value)}
      />
    </div>
  );
};
