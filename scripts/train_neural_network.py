import librosa
import numpy as np
import json
import os
from sklearn.model_selection import train_test_split
# os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2' # Uncomment to hide tensorflow logs
import tensorflow.keras as keras


JSON_FILE = "filename.json"


def main():
    """
    Trains a CNN model on an audio file dataset (specifically a modified
    GTZAN dataset was used).  The model is based on the AlexNet architecture
    and was modified to create a CNN model that when saved was <100MB to be
    used on a web application.  The model is then saved as an .h5 file.
    """
    X_train, y_train, X_val, y_val, X_test, y_test = load_dataset(JSON_FILE)

    model = build_model()

    # Define the loss function, optimizer, and metrics using compile
    optimizer = keras.optimizers.Adam(learning_rate=0.0001)
    model.compile(loss='sparse_categorical_crossentropy',
                  optimizer=optimizer,
                  metrics=['accuracy'])

    # Gives a summary of the model and the layers (can be removed)
    model.summary()

    # Train the model
    model.fit(X_train, y_train,
              validation_data=(X_val, y_val),
              batch_size=32, epochs=50)

    # Evaluate the model on the test data to get the model accuracy
    test_loss, test_acc = model.evaluate(X_test, y_test, verbose=2)
    print('\nTest accuracy:', test_acc)

    # Save the model
    model.save('filename')
    model.save('filename.h5')


def load_dataset(filepath):
    """
    Loads the dataset JSON file that contains both the melspectrogram numpy
    array representation as well as their labels.  Then the dataset is split
    into 3 distinct sets: training, validiation, and testing. A new axis is
    added as the AlexNet architecture was designed for a 2D image with a
    3 color channel.
    """

    with open(filepath, "r") as f:
        audio_data = json.load(f)

    X = np.array(audio_data["mel_spectogram_features"])
    y = np.array(audio_data["genre_label"])

    # Split the dataset into a training, validation, and testing set
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
    X_train, X_validation, y_train, y_validation = train_test_split(
        X_train, y_train, test_size=0.2)

    # Add in an axis (channel) to match the AlexNet architecture design
    X_train = X_train[..., np.newaxis]
    X_validation = X_validation[..., np.newaxis]
    X_test = X_test[..., np.newaxis]

    return X_train, y_train, X_validation, y_validation, X_test, y_test


def build_model():
    """
    Builds a keras model based on the AlexNet architecture. Batch
    normalization was added after each convolutional layer to help
    with speeding up the training, and a dropout was added after
    each fully connected layer to help the model from overfitting.
    In order to keep the data size of the model smaller, parts of
    the original AlexNet architecture has been removed, and modified.
    """

    model = keras.Sequential([

        # 1st convolutional layer
        keras.layers.Conv2D(filters=64, kernel_size=(3, 3),
                            strides=(2, 2), activation='relu',
                            input_shape=(128, 130, 1)),

        # Batch normalization layer added to accelerate learning
        keras.layers.BatchNormalization(),

        # Max pooling layer
        keras.layers.MaxPool2D(pool_size=(3, 3), strides=(2, 2)),

        # 2nd convolutional layer
        keras.layers.Conv2D(filters=64, kernel_size=(5, 5),
                            activation='relu', padding="same"),

        # Batch normalization layer
        keras.layers.BatchNormalization(),

        # Max pooling layer
        keras.layers.MaxPool2D(pool_size=(3, 3), strides=(2, 2)),

        # 3rd convolutional layer
        keras.layers.Conv2D(filters=64, kernel_size=(3, 3),
                            activation='relu', padding="same"),

        # Batch normalization layer
        keras.layers.BatchNormalization(),

        # 4th convolutional layer
        keras.layers.Conv2D(filters=64, kernel_size=(3, 3),
                            activation='relu', padding="same"),

        # Batch normalization layer
        keras.layers.BatchNormalization(),

        # Flatten the output to feed to fully connected layers
        keras.layers.Flatten(),

        # 1st fully connected layer
        keras.layers.Dense(128, activation='relu'),

        # Add in dropout to prevent overfitting
        keras.layers.Dropout(0.3),

        # Output layer
        keras.layers.Dense(10, activation='softmax')
    ])

    return model

if __name__ == '__main__':
    main()
