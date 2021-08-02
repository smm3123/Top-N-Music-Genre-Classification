from youtube_dl import YoutubeDL
import uuid
import os


def download_audio_from_youtube(url):
    """
    Takes a youtube url and downloads an audio file to the current working directory
    full specs here: https://github.com/ytdl-org/youtube-dl
    :return: The unique UUID audio file name
    """
    file_id = str(uuid.uuid4())  # UUID ensures no duplicate file names are saved
    audio_downloader = YoutubeDL({
        'format': 'm4a',
        'outtmpl': 'temp/' + file_id + '.%(ext)s'  # Saves audio file in a temp folder
    })
    audio_downloader.extract_info(url)
    return file_id


def delete_audio_file(file_name):
    """
    Deletes the given audio file from the temp folder
    :param file_name: audio file name with the following format: UUID.m4a
    :return: bool value representing operation success
    """
    success = False
    path = 'temp/' + file_name
    if os.path.exists(path):
        os.remove(path)
        success = True
    return success
