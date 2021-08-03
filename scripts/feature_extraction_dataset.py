import librosa
import json
import os


DATASET_DIR_PATH = "relative/path/to/folder"
JSON_FILE_PATH = "filename.json"
SAMPLE_RATE = 22050
TRACK_LENGTH = 30  # Length of the track measured in seconds
TOTAL_SAMPLES = SAMPLE_RATE * TRACK_LENGTH
NUM_SEGMENTS = 10
NUM_SAMPLES_PER_SEGMENT = int(TOTAL_SAMPLES / NUM_SEGMENTS)


def main():
    """
    Process the dataset audio files to save their mel spectograms and
    ground truth labels to create a JSON file that stores their processed
    information so that the dataset will not need to be processed every
    time it is used.  Each song will be split into 10 segments to
    increase number of training examples for the neural network and to
    decrease the melspectrogram array produced.
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

    for (dirpath, dirname, filenames) in os.walk(DATASET_DIR_PATH):

        if dirpath is not DATASET_DIR_PATH:

            ground_truth_label = dirpath.split("\\")[-1]

            for f in filenames:

                audio_time_series, sampling_rate = librosa.load(
                    os.path.join(dirpath, f))

                for i in range(NUM_SEGMENTS):

                    start_time = NUM_SAMPLES_PER_SEGMENT * i
                    finish_time = start_time + NUM_SAMPLES_PER_SEGMENT

                    mel_spectrogram = librosa.feature.melspectrogram(
                        audio_time_series[start_time:finish_time],
                        sampling_rate
                    )

                    if mel_spectrogram.shape == (128, 130):
                        audio_data["genre_label"].append(
                            genre_label_dict[ground_truth_label])
                        audio_data["mel_spectogram_features"].append(
                            mel_spectrogram.tolist())
                    else:
                        print(f"File failed: {ground_truth_label}, "
                              f"Shape is {mel_spectrogram.shape}")

    with open(JSON_FILE_PATH, 'w') as fp:
        json.dump(audio_data, fp)


if __name__ == '__main__':
    main()
