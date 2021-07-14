import requests
import json


def youtube_search(search_str):
    """
    Function takes in a search string and returns a dict object containing
    Youtube search results.
    {
      "kind": "youtube#searchResult",
      "etag": etag,
      "id": {
        "kind": string,
        "videoId": string,
        "channelId": string,
        "playlistId": string
      },
      "snippet": {
        "publishedAt": datetime,
        "channelId": string,
        "title": string,
        "description": string,
        "thumbnails": {
          (key): {
            "url": string,
            "width": unsigned integer,
            "height": unsigned integer
          }
        },
        "channelTitle": string,
        "liveBroadcastContent": string
      }
    """
    api_key = "AIzaSyCfnPwKpsLH9lGp9bV5P3ZTI-rmZ3o8IPg"

    response = requests.get("https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=" + search_str +
                            "&type=video&key=" + api_key)

    return json.loads(response.text)
