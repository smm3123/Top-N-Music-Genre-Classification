import requests
import json
from youtube_dl import YoutubeDL


def youtube_search(search_str):
    """
    Function takes in a search string and returns a dict object containing
    Youtube search results. Details of returned object below:
    https://developers.google.com/youtube/v3/docs/search
    """
    api_key = "AIzaSyCfnPwKpsLH9lGp9bV5P3ZTI-rmZ3o8IPg"

    response = requests.get("https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=" + search_str +
                            "&type=video&key=" + api_key)

    return json.loads(response.text)


def youtube_downloader(url):
    """
    Takes a youtube url and downloads a audiofile to the current working directory
    full specs here: https://github.com/ytdl-org/youtube-dl
    TODO - the youtube_dl library lets you somewhat control the audiotype, may be useful for processing
    """

    audio_downloader = YoutubeDL({'format': 'bestaudio'})
    audio_downloader.extract_info(url)
