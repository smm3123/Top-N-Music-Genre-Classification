import librosa
import numpy as np
import ffmpeg


class AudioFile:
    """
    Class containing relevant data about a given audio file
    """

    def __init__(self, path, is_for_machine_learning_input):
        # temp removing the durations calc..... ffmpeg.probe(path) is creating errors in the deployment
        #self.duration = self._get_duration(path)
        self.audio_time_series, self.sampling_rate = self._librosa_load(path, is_for_machine_learning_input)
        self.db_spectrogram = self._get_db_scaled_spectrogram()
        self.mel_spectrogram = self._get_mel_spectrogram()

    def _get_duration(self, path):
        """
        Uses ffmpeg to get audio clip duration
        :return: float value representing length in seconds
        """
        duration = ffmpeg.probe(path)['format']['duration']
        return float(duration)

    def _librosa_load(self, path, is_for_machine_learning_input):
        if is_for_machine_learning_input:
            # Input for the machine learning model takes a 3 second clip from 1/3 of the way through the audio file
            return librosa.load(path, duration=3, offset=30)
        else:
            # Use entire audio clip, primarily for generating audio analysis visuals
            return librosa.load(path)

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
        return mel_spectrogram
