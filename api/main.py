import requests
import json
import os
from dotenv import load_dotenv
from youtube_dl import YoutubeDL
from flask import Flask

app = Flask(__name__, static_folder="../build", static_url_path='/')


@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.route('/api/youtube-search-results/<query>', methods=['GET'])
def youtube_search(query):
    """
    Function takes in a search string and returns a dict object containing
    Youtube search results. Details of returned object below:
    https://developers.google.com/youtube/v3/docs/search
    """
    load_dotenv()
    api_key = os.getenv('YOUTUBE_API_KEY')

    response = requests.get("https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=" + query +
                            "&type=video&key=" + api_key)

    return json.loads(response.text)


@app.route('/api/youtube-audio/<url>', methods=['GET'])
def youtube_downloader(url):
    """
    Takes a youtube url and downloads a audiofile to the current working directory
    full specs here: https://github.com/ytdl-org/youtube-dl
    """

    audio_downloader = YoutubeDL({'format': 'bestaudio'})
    audio_downloader.extract_info(url)
