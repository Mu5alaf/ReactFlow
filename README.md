# Web Scraper and Summarizer API

This Django REST API project provides endpoints for web scraping and text summarization using Mistral AI

## Features

- Web scraping endpoint: Scrapes text content from a given URL
- Text summarization endpoint: Generates a summary of provided text using OpenAI's GPT-3

## Requirements

- Python
- Django
- Django REST Framework
- Beautiful Soup
- Requests
- OpenAI Python library
- React

## Setup

1. Install the required packages:
   pip install -r requirements.txt

2. Set up your OpenAI API key:
   - Create a `.env` file in the project root
   - Add your Mistral AI API_KEY

3. Apply database migrations:
   python manage.py migrate

4. Run the development server:
   python manage.py runserver

## Usage

### Web Scraping

Send a POST request to `/api/scrape/` with a JSON body:

{
    "url": "https://example.com"
}

The API will return the scraped text content.

### Text Summarization

Send a POST request to `/api/summarize/` with a JSON body:

{
    "input_data": "Your long text to be summarized goes here..."
}

The API will return a summary of the provided text.

## API Endpoints

- POST /api/scrape/: Web scraping endpoint
- POST /api/summary/: Text summarization endpoint

## Error Handling

The API returns appropriate HTTP status codes and error messages for various scenarios:

- 200 OK: Successful operation
- 400 Bad Request: Invalid input data
- 500 Internal Server Error: Server-side errors (e.g., issues with web scraping or OpenAI API)

## Demo
Uploading Cloudilic0.mp4…


