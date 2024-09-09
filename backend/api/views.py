import requests
from bs4 import BeautifulSoup
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from mistralai import Mistral
from django.conf import settings

#SCRAPPING CLASS
class WebScraper(APIView):
    def post(self, request, *args, **kwargs):
        #getting post request user url
        url = request.data.get('url')
        #check if not usl
        if not url:
            #error handling
            return Response({"error": "URL is required"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            response = requests.get(url)
            soup = BeautifulSoup(response.content, 'html.parser')
            #Extracts all text from html 
            scraped_data = soup.get_text()
            # print(scraped_data)
            #return status if it ok
            return Response({'data': scraped_data}, status=status.HTTP_200_OK)
        #handling request error
        except requests.exceptions.RequestException as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
#SUMMARIZE CLASS
class Summary(APIView):
    def post(self, request, *args, **kwargs):
        #get WebScraper html text data
        data_content = request.data.get('data')
        #check if theres no content 
        if not data_content:
            return Response({"error": "Data is required"}, status=status.HTTP_400_BAD_REQUEST)
        #pass API key from Settings
        client = Mistral(api_key=settings.MISTRAL_API_KEY)
        #mistral model
        model = "mistral-tiny"
        try:
            print("About to make Mistral API call")
            response = client.chat.complete(
                model=model,
                #define personalty of model and the order of summarize content data
                messages=[
                    {"role": "system", "content": "You are a helpful assistant."},
                    {"role": "user", "content": f"Please summarize the following text: {data_content}"}
                ],
                #limit the token per request
                max_tokens=10
            )
            #cleaning the whitespace of AI answer 
            summary = response.choices[0].message.content
            print(summary)
            #debug line
            # print(f"The summary is: {summary}")
            return Response({'summary': summary}, status=status.HTTP_200_OK)
        #error handling for api fault
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
