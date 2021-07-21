import librosa
import numpy as np


class AudioFile:
    """
    Class containing relevant data about a given audio file
    """

    def __init__(self, path):
        self.audio_time_series, self.sampling_rate = librosa.load(path)
        self.db_spectrogram = self._get_db_scaled_spectrogram()
        self.mel_spectrogram = self._get_mel_spectrogram()

    def _get_db_scaled_spectrogram(self):
        """
        Converts an amplitude spectrogram to dB-scaled spectrogram.
        :return: np.ndarray of the dB-scaled spectrogram
        """
        stft = librosa.stft(self.audio_time_series)
        db_spectrogram = librosa.amplitude_to_db(np.abs(stft))
        return db_spectrogram

    def _get_mel_spectrogram(self):
        """
        :return: np.ndarray of mel spectrogram
        """
        mel_spectrogram = librosa.feature.melspectrogram(y=self.audio_time_series, sr=self.sampling_rate)
        return librosa.power_to_db(mel_spectrogram, ref=np.max)
