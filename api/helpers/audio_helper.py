from helpers import youtube_helper


def get_genres(youtube_url):
    """
    Downloads audio file, processes it, and returns genre classifications
    """
    file_id = youtube_helper.download_audio_from_youtube(youtube_url)
    file_name = file_id + '.m4a'
    youtube_helper.delete_audio_file(file_name)
