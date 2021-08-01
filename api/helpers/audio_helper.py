from helpers import youtube_helper
from models.audio_file import AudioFile


def get_genres(youtube_url):
    """
    Downloads audio file, processes it, and returns genre classifications
    """
    file_id = youtube_helper.download_audio_from_youtube(youtube_url)
    file_name = file_id + '.m4a'
    audio_file = AudioFile('temp/' + file_name)
    is_delete_successful = youtube_helper.delete_audio_file(file_name)
