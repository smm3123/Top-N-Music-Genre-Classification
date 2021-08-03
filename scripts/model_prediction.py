import librosa
import numpy as np
import os
import wave
import contextlib
import sys
# os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2' # Uncomment to hide tensorflow logs
import tensorflow.keras as keras


MODEL = 'filename.h5'
SAMPLE_RATE = 22050
TRACK_LENGTH = 30  # Length of the track measured in seconds
TOTAL_SAMPLES = SAMPLE_RATE * TRACK_LENGTH
NUM_SEGMENTS = 10
NUM_SAMPLES_PER_SEGMENT = int(TOTAL_SAMPLES / NUM_SEGMENTS)


def main():
    """
    The program loads a neural network model, processes an audio file,
    and then makes the prediction and lists the top 5 probability
    confidence scores.
    """
    genre_label_dict = {
                        0: "blues", 1: "classical", 2: "country",
                        3: "disco", 4: "hiphop", 5: "jazz",
                        6: "metal", 7: "pop", 8: "reggae",
                        9: "rock"
                       }

    # Load the model
    model = keras.models.load_model(MODEL)

    # Get the melspectrogram for an audio file
    mel_spectrogram = get_melspectrogram()

    # Add in an axis (channel) to match input shape
    mel_spectrogram = mel_spectrogram[..., np.newaxis]

    # Add in axis to represetn the number of training examples
    mel_spectrogram = mel_spectrogram[np.newaxis, ...]

    # Get the top prediction and print its class
    pred = np.argmax(model.predict(mel_spectrogram), axis=-1)
    print(f"Prediction: {genre_label_dict[pred[0]]}")

    # Get all the probability of the classes
    prob_classes = model.predict(mel_spectrogram)

    # Sort the probablitiy classes into an index
    index_array = (-prob_classes).argsort()

    for i in range(5):
        x = index_array[0][i]
        print(f"Class: {genre_label_dict[x]} "
              f"     Confidence Probability: {prob_classes[0][x]}")


def get_duration(filename):
    """
    :return: Duration of the audio track file as a float
    """
    with contextlib.closing(wave.open(filename, 'r')) as f:
        num_frames = f.getnframes()
        frame_rate = f.getframerate()
        duration = num_frames / float(frame_rate)
    return duration


def get_melspectrogram():
    """
    :return: The numpy array of the melspectrogram array for
    the audio file.
    """
    path = input("Enter the relative path of the audio file: ")

    # Get the track duration
    duration = get_duration(path)

    # Load the audio file
    if duration > 50:
        audio_time_series, sampling_rate = librosa.load(
            path, duration=30, offset=20)
    else:
        audio_time_series, sampling_rate = librosa.load(path, duration=30)

    start_time = NUM_SAMPLES_PER_SEGMENT * 3
    finish_time = start_time + NUM_SAMPLES_PER_SEGMENT

    mel_spectrogram = librosa.feature.melspectrogram(
        audio_time_series[start_time:finish_time],
        sampling_rate
    )

    # Ensure that the shape is correct
    if mel_spectrogram.shape != (128, 130):
        print("Error: Expected shape (128,130)")
        print(f"Received {mel_spectrogram.shape}")
        sys.exit(1)
    else:
        return mel_spectrogram


if __name__ == '__main__':
    main()
