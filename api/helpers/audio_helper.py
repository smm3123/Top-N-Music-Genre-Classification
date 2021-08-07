from helpers import youtube_helper
from models.audio_file import AudioFile
import tensorflow.keras as keras
import numpy as np
import os
import json


MODEL = '.\\models\\music_classification_cnn.h5'  # Path set to accommodate flask home directory


def get_genres(youtube_url):
    """
    Downloads audio file, processes it, and returns genre classifications
    """
    file_id = youtube_helper.download_audio_from_youtube(youtube_url)
    file_name =  f'{file_id}.m4a'
    file_path = f'temp/{file_name}'
    # audio_file = AudioFile(file_path, False)
    classifier_input = AudioFile(file_path, True).mel_spectrogram  # Gets Mel spectrogram data for 3 second clip
    confidence_levels = get_genre_confidence_levels(classifier_input)
    youtube_helper.delete_audio_file(file_path)
    return confidence_levels


def get_genre_confidence_levels(mel_spectrogram):
    """
    The method loads a neural network model, processes an audio file,
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
    print(os.path.join('music_classification_cnn.h5'))
    model = keras.models.load_model(MODEL)

    # Add in an axis (channel) to match input shape
    mel_spectrogram = mel_spectrogram[..., np.newaxis]

    # Add in axis to represetn the number of training examples
    mel_spectrogram = mel_spectrogram[np.newaxis, ...]

    # Dictionary to be converted into a JSON
    prediction_data = {
                        "top_prediction": "",
                        "top_confidence_probs": {}
                      }

    # Get the top prediction and print its class
    pred = np.argmax(model.predict(mel_spectrogram), axis=-1)
    prediction_data["top_prediction"] = genre_label_dict[pred[0]]

    # Get all the probability of the classes
    prob_classes = model.predict(mel_spectrogram)

    # Sort the probablitiy classes into an index
    index_array = (-prob_classes).argsort()

    for i in range(5):
        x = index_array[0][i]
        prediction_data["top_confidence_probs"].update(
            {genre_label_dict[x]: str(prob_classes[0][x])})

    res = json.dumps(prediction_data)
    return res
