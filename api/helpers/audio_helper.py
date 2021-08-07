from helpers import youtube_helper
from models.audio_file import AudioFile


def get_genres(youtube_url):
    """
    Downloads audio file, processes it, and returns genre classifications
    """
    file_id = youtube_helper.download_audio_from_youtube(youtube_url)
    file_name = file_id + '.m4a'
    file_path = f'temp/{file_name}'
    audio_file = AudioFile(file_path, False)
    classifier_input = AudioFile(file_path, True).mel_spectrogram  # Gets Mel spectrogram data for 3 second clip
    youtube_helper.delete_audio_file(file_path)
