import matplotlib.pyplot as plt
import librosa.display
import numpy as np


class AudioFile:
    """
    Class containing relevant data about the audio file
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


def main():
    """
    Retrieves relative path for audio file and outputs various visualizations
    """

    # Keep looping until user opts to exit the program
    while True:
        user_input = get_user_input()
        if user_input == 1:
            audio_file = AudioFile('blues.00001.wav')
        elif user_input == 2:
            audio_file = AudioFile('country.00001.wav')
        elif user_input == 3:
            audio_file = AudioFile('jazz.00001.wav')
        elif user_input == 4:
            audio_file = load_custom_audio_file()
        else:
            break

        display_feature_visualizations(audio_file)


def get_user_input():
    """
    :return: User input as an integer value
    """
    return int(input("Choose an option from the following genres to visualize:"
                     "\n1. Blues\n2. Country\n3. Jazz\n4. Custom .wav audio file\n5. Exit\n"))


def load_custom_audio_file():
    """
    :return: AudioFile object based off of file from user-inputted relative path
    """
    path = input("Enter the relative path of the .wav audio file: ")
    audio_file = AudioFile(path)
    return audio_file


def display_feature_visualizations(audio_file):
    """
    Sets figure dimensions and displays feature visualizations
    """
    plt.figure(figsize=(14, 5))
    display_waveplot(audio_file)
    display_spectrogram(audio_file)
    display_mel_spectrogram(audio_file)


def display_waveplot(audio_file):
    librosa.display.waveplot(audio_file.audio_time_series, sr=audio_file.sampling_rate)
    plt.title("Waveform")
    plt.show()


def display_spectrogram(audio_file):
    librosa.display.specshow(audio_file.db_spectrogram, sr=audio_file.sampling_rate, x_axis='time', y_axis='hz')
    plt.colorbar()
    plt.title("Spectrogram")
    plt.show()


def display_mel_spectrogram(audio_file):
    librosa.display.specshow(audio_file.mel_spectrogram, y_axis='log', x_axis='time')
    plt.colorbar()
    plt.title("Mel Spectrogram")
    plt.show()


if __name__ == '__main__':
    main()
