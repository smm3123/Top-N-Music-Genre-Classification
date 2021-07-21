from youtube_dl import YoutubeDL


def download_audio_from_youtube(url):
    """
    Takes a youtube url and downloads an audio file to the current working directory
    full specs here: https://github.com/ytdl-org/youtube-dl
    """

    audio_downloader = YoutubeDL({'format': 'bestaudio'})
    audio_downloader.extract_info(url)