import requests
import json
import os
from dotenv import load_dotenv
from flask import Flask
from flask import request, jsonify
from helpers import audio_helper

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


@app.route('/api/get_genres', methods=['POST'])
def get_genres():
    """
    Downloads the audio file and passes it to the machine learning model for classification.
    :return: Response object with genre classifications
    """
    youtube_url = request.json['youtube_url']
    audio_helper.get_genres(youtube_url)
    res = {'foo': 'bar'}  # Placeholder response for testing purposes
    return jsonify(res)
