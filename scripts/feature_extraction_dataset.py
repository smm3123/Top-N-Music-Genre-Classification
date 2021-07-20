import librosa
import numpy as np
import json
import os


DATASET_DIR_PATH = "Relative/Path/to/dataset/directory"
JSON_FILE_PATH = "dataset.json"


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
        mel_spectrogram = librosa.feature.melspectrogram(
            y=self.audio_time_series, sr=self.sampling_rate)
        return librosa.power_to_db(mel_spectrogram, ref=np.max)


def main():
    """
    Process the dataset audio files to save their mel spectograms and
    ground truth labels to create a JSON file that stores their processed
    information so that the dataset will not need to be processed every
    time it is used.
    """
    save_mel_spectogram(DATASET_DIR_PATH, JSON_FILE_PATH)


def load_audio_file(filename):
    """
    :return: AudioFile object based off of file given
    """
    audio_file = AudioFile(filename)
    return audio_file


def save_mel_spectogram(dataset_dir_path, json_file_path):
    """
    Processes the dataset audio files to get their mel spectogram features
    in the form of an np.ndarray.  These mel spectogram features as well as
    the ground truth label for the audio file are saved in lists in a JSON
    file format.
    """

    genre_label_dict = {
                        "blues": 0, "classical": 1, "country": 2, "disco": 3,
                        "hiphop": 4, "jazz": 5, "metal": 6, "pop": 7,
                        "reggae": 8, "rock": 9
                       }

    audio_data = {
                    "genre_label": [],
                    "mel_spectogram_features": []
                 }

    for (dirpath, dirname, filenames) in os.walk(dataset_dir_path):

        if dirpath is not dataset_dir_path:

            ground_truth_label = dirpath.split("\\")[-1]

            for f in filenames:

                audio_file = load_audio_file(os.path.join(dirpath, f))

                if audio_file.mel_spectrogram.shape == (128, 1293):
                    audio_data["genre_label"].append(
                        genre_label_dict[ground_truth_label])
                    audio_data["mel_spectogram_features"].append(
                        audio_file.mel_spectrogram.tolist())
                else:
                    print(f"File failed: {ground_truth_label}, "
                          f"Shape is {audio_file.mel_spectrogram.shape}")

    with open(json_file_path, 'w') as fp:
        json.dump(audio_data, fp)


if __name__ == '__main__':
    main()
