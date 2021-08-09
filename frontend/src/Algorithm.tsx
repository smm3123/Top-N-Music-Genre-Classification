import { makeStyles } from '@material-ui/core';

import figure1 from './components/static/figure1.png';
import figure2 from './components/static/figure2.png';
import figure3 from './components/static/figure3.png';

const useStyles = makeStyles({
  algorithm: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'right',
    textAlign: 'left',
    paddingLeft: '80px',
    paddingRight: '80px',
    marginBottom: '100px',
  },
  images: {
    width: 'fit-content',
    alignSelf: 'center',
  },
});

const Algorithm: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.algorithm}>
      <h1>How Our Algorithm Works</h1>
      <h2>What is an artificial neural network?</h2>
      <p>
        An artificial neural network loosely models a collection of neurons,
        such as those found in our brains. In the brain, a neuron can transmit
        an electrical signal to another neuron. This is modeled in an artificial
        neural network, commonly referred to as a neural network, as a graph.
        The connection between one neuron to another one is represented by an
        edge which is typically weighted. These weights are updated during the
        training of the network via mathematical equations. The network is split
        into layers consisting of a group of neurons. The network starts with an
        input layer, and will traverse through additional hidden layers, and
        finishes at an output layer. After training, a machine learning model is
        produced. Below is an example of a simple neural network architecture.
      </p>
      <img src={figure1} alt="figure1" className={classes.images} />
      <h2>What do you use to train a neural network?</h2>
      <p>
        To train a neural network, training examples are needed. The training
        examples are typically in the form of datasets that consist of a
        collection of data that is related. For example, a MNIST is a dataset
        that consists of a total of 70,000 handwritten digit images.
      </p>
      <p>
        For our project, we needed audio data to train a neural network to make
        music genre predictions. We used the GTZAN dataset that consists of 1000
        .WAV audio tracks that are 30 seconds in length. The audio tracks are
        evenly split between 10 genres (100 audio tracks per genre): blues,
        classical, country, disco, hiphop, jazz, metal, pop, reggae, and rock.
      </p>
      <p>
        In order to train an accurate model, many training examples are needed.
        When we learn a new skill, it often requires lots of practice in order
        to master the skill. The same concept applies in machine learning. GTZAN
        is considered a small dataset. To increase the number of training
        examples, the audio tracks were split into 10 segments, each consisting
        of 3 seconds in length. While 3 seconds may seem like a short amount of
        time, research suggests that the brain can recognize a familiar song in
        less than a second (
        <a
          href="https://www.sciencedaily.com/releases/2019/10/191030073312.htm"
          target="_blank"
          rel="noreferrer"
        >
          https://www.sciencedaily.com/releases/2019/10/191030073312.htm
        </a>
        ). Splitting the audio tracks into 10 segments created a new dataset
        that was approximately 10 times the size of the original GTZAN dataset.
      </p>
      <p>
        You can download the GTZAN dataset (
        <a
          href="http://marsyas.info/downloads/datasets.html"
          target="_blank"
          rel="noreferrer"
        >
          http://marsyas.info/downloads/datasets.html
        </a>
        ) and then run the Python script feature_extraction_dataset.py in the
        scripts folder from our GitHub repository (
        <a
          href="https://github.com/smm3123/Top-N-Music-Genre-Classification/"
          target="_blank"
          rel="noreferrer"
        >
          https://github.com/smm3123/Top-N-Music-Genre-Classification/
        </a>
        ) to recreate this dataset.
      </p>
      <h2>How did we train our neural network?</h2>
      <p>
        To train a neural network, the architecture for the model must be
        designed as well as the equations that will be used for the connections
        between the different layers. One very popular model architecture is
        called AlexNet. AlexNet was developed in 2012 and is considered a
        convolutional neural network (CNN). In a CNN, the convolutional layers
        have filters that slide over the input features and produce feature
        maps. These layers make them ideal to use when processing 2-dimensional
        images, and as a result, CNN are very popular with image
        classification/recognition models. For our project, we started with the
        AlexNet architecture and then modified it to fit the needs of the
        project.
      </p>
      <p>
        A question that may come to your mind is, why are we using a CNN for
        audio if is best suited for images? For our dataset, we decided to use
        the mel spectrogram features of an audio sample to train our model.
        Sound can be thought of as a sequence of vibrations that changes in
        pressure strength. Imagine striking the key on the piano. At first, the
        sound is loud and as the time has passed since you struck the key, the
        sound becomes softer until completely silent. To visualize this, we
        could plot the pressure strength versus time to obtain a 2-dimensional
        image. We can add more detail by applying the Fourier Transform by
        breaking the audio file into time window, where the Fourier Transform
        will decompose the audio in the time window into frequencies. By
        combining all these time windows, a heat map can be produced that will
        display the time versus the frequencies with a color scale that
        represents the amplitude. Generally, the frequency is changed to a log
        scale and the color will be changed to Decibels to produce a more visual
        friendly graph. This is known as a Spectrogram as shown below.
      </p>
      <img src={figure2} alt="figure2" className={classes.images} />
      <p>
        The Mel Scale is a scale such that if two sounds are of equal distance
        to one another on the Mel Scale, then to a human they should also sound
        equal distance from each other. By then applying this scale to our
        spectrogram, we can produce a Mel spectrogram, as seen below.
      </p>
      <img src={figure3} alt="figure3" className={classes.images} />
      <p>
        To train our model, we will feed in these Mel spectrogram images to the
        model, which is why AlexNet is a good choice for our model architecture.
        Initially, the AlexNet architecture model which consists of 5
        convolutional layers and 3 fully connected layers (all the inputs from
        the layer are connected to the activation unit of the next layer) was
        used. An activation unit is a node that will implement the activation
        function, which is the function responsible for transformation. For
        AlexNet, this activation function is a rectified linear activation
        function (ReLU) that will output the value without change if it is
        positive, while outputting the value 0 for any non-positive value.
      </p>
      <p>
        After training, the model needed around 200MB to store on the hard
        drive. However, GitHub only allows for files up to 100MB to be hosted.
        In order to reduce the storage requirements of our model, parts of the
        AlexNet architecture were removed or modified. In the end, our model
        consisted of 4 convolutional layers and only 2 fully connected layers
        while also reducing the size of these layers. The overall size of the
        model is approximately 24MB. The complete model architecture is given in
        the train_neural_network.py file in the scripts folder of our GitHub
        repository.
      </p>
      <p>
        The accuracy of a model is often reported as a sign of how well the
        model performs. To calculate the model accuracy, we first use a set of
        training examples that the model has not seen before and then take the
        number of correctly predicted music genres divided by the total number
        of examples seen to get the accuracy. The model’s accuracy on our test
        dataset was 75%.
      </p>
      <h2>How do you get predictions and how to interpret them?</h2>
      <p>
        To use our model for predictions on new audio files, the audio files
        must first be preprocessed. On the website, you will select a song
        choice from YouTube. That audio is then extracted, and a 3 second clip
        is pulled from that audio file. The Mel spectrogram features are then
        extracted and can be fed into the model. The prediction is made by using
        the final weights from training to produce the outcome. The model will
        generate confidence scores for each of the 10 genres. The sum of the
        confidence scores will sum to 1. The genre with the highest confidence
        score will be the prediction made.
      </p>
      <p>
        For our project, we list the top 5 confidence scores and the resulting
        genre in addition to the top prediction. The top 5 confidence scores are
        helpful to determine if the model is making a confident prediction. For
        example, an audio file that produces a top confidence score of 95% for a
        specific genre means that the model is very confident that the audio
        file is this genre. If an audio file has a top confidence score under
        70%, then the model is not very confident in its prediction. In some
        cases, the model’s top confidence score may be below 50%.
      </p>
    </div>
  );
};

export default Algorithm;
