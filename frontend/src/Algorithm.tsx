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
    paddingLeft: '10%',
    paddingRight: '10%',
    marginBottom: '10em',
    lineHeight: '1.5',
  },
  images: {
    width: '70%',
    maxWidth: '100%',
    height: 'auto',
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
        produced. Below is an example of a simple neural network architecture:
      </p>
      <img src={figure1} alt="figure1" className={classes.images} />
      <h2>What do you use to train a neural network?</h2>
      <p>
        To train a neural network, training examples are needed. The training
        examples are typically in the form of datasets that consist of a
        collection of data that is related. For example, the MNIST is a dataset
        that consists of a total of 70,000 handwritten digit images.
      </p>
      <p>
        For our project, we needed audio data to train a neural network to make
        music genre predictions. We used the GTZAN dataset that consists of 1000
        .wav format audio tracks that are 30 seconds in length. The audio tracks
        are evenly split between 10 genres (100 audio tracks per genre): blues,
        classical, country, disco, hiphop, jazz, metal, pop, reggae, and rock.
      </p>
      <p>
        In order to train an accurate model, many training examples are needed.
        When we learn a new skill, it often requires lots of practice in order
        to master the skill. The same concept applies in machine learning. GTZAN
        is considered a small dataset. To increase the number of training
        examples, the audio tracks were split into 10 segments, each consisting
        of 3 seconds in length. While 3 seconds may seem like a short amount of
        time, research suggests that the brain can recognize a familiar song in{' '}
        <a
          href="https://www.sciencedaily.com/releases/2019/10/191030073312.htm"
          target="_blank"
          rel="noreferrer"
        >
          less than a second
        </a>
        . Splitting the audio tracks into 10 segments created a new dataset that
        was approximately 10 times the size of the original GTZAN dataset.
      </p>
      <p>
        You can download the{' '}
        <a
          href="http://marsyas.info/downloads/datasets.html"
          target="_blank"
          rel="noreferrer"
        >
          GTZAN dataset
        </a>{' '}
        and then run the Python script{' '}
        <code> feature_extraction_dataset.py </code> in the scripts folder from
        our{' '}
        <a
          href="https://github.com/smm3123/Top-N-Music-Genre-Classification/"
          target="_blank"
          rel="noreferrer"
        >
          GitHub repository
        </a>{' '}
        to recreate this dataset.
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
        images, and as a result, CNNs are very popular with image
        classification/recognition models. For our project, we started with the
        AlexNet architecture and then modified it to fit the needs of the
        project.
      </p>
      <p>
        A question that may come to your mind is, why are we using a CNN for
        audio if it is best suited for images? For our dataset, we decided to
        use the mel spectrogram features of an audio sample to train our model.
        Sound can be thought of as a sequence of vibrations that changes in
        pressure strength. Imagine striking the key on a piano. Initially, the
        sound is loud but as time passes the sound becomes softer until it's
        completely silent. We can visualize this by plotting the pressure
        strength versus time to obtain a 2-dimensional image. We can add more
        detail by splitting the audio into small time windows and applying
        Fourier transforms to decompose the audio into frequencies. By combining
        all these time windows, a heat map can be produced that will display the
        time versus the frequencies with a color scale that represents the
        amplitude. Generally, the frequency is changed to a log scale and the
        color will be changed to decibels to produce a more visual friendly
        graph. This is known as a spectrogram as shown below.
      </p>
      <img src={figure2} alt="figure2" className={classes.images} />
      <p>
        We'll further transform our data by using the Mel scale. Two sounds that
        are equal distance to one another on the Mel scale, should also be equal
        distance when perceived by a human. By applying this scale to our
        spectrogram, we can produce a Mel spectrogram, as seen below:
      </p>
      <img src={figure3} alt="figure3" className={classes.images} />
      <p>
        To train our model, we will feed these Mel spectrogram images into the
        model. The AlexNet architecture was used as the basis for our model,
        consisting of 5 convolutional layers and 3 fully connected layers (where
        all the inputs from the layer are connected to the activation unit of
        the next layer). An activation unit is a node that will implement the
        activation function, which is the function responsible for
        transformation. For AlexNet, this activation function is a rectified
        linear activation function (ReLU) that will output the value without
        change if it is positive and zero for any non-positive value.
      </p>
      <p>
        After training, the model was around 200MB in size. However, GitHub only
        allows for files up to 100MB to be hosted. In order to reduce the
        storage requirements of our model, parts of the AlexNet architecture
        were removed or modified. We reduced the size and number of layers in
        our model and in the end, our model consisted of 4 convolutional layers
        and only 2 fully connected layers. The overall size of our model is
        approximately 24MB. The complete model architecture is given in the
        <code> train_neural_network.py </code> file in the scripts folder of our
        GitHub repository.
      </p>
      <p>
        The accuracy of a model is often reported as a sign of how well the
        model performs. To calculate the model accuracy, we first use a set of
        training examples that the model has not seen before and then take the
        number of correctly predicted music genres divided by the total number
        of examples seen to get the accuracy. Our model’s accuracy on our test
        dataset was 75%.
      </p>
      <h2>How do you get predictions and how to interpret them?</h2>
      <p>
        To use our model for predictions on new audio files, the audio files
        must first be preprocessed. On the website, you will select a song from
        YouTube. The audio from that video is then downloaded and a 3 second
        clip of that audio is sampled. The Mel spectrogram features are then
        extracted and fed into the model. The prediction is made by using the
        final weights from training to produce the outcome. The model will
        generate confidence scores for each of the 10 genres. The genre with the
        highest confidence score will be the prediction made.
      </p>
      <p>
        For our project, we list the top 5 confidence scores and their
        corresponding genres. The top 5 confidence scores are helpful to
        determine if the model is making a confident prediction. For example, an
        audio file that produces a top confidence score of 95% for a specific
        genre means that the model is very confident that the audio file is this
        genre. If an audio file has a top confidence score under 70%, then the
        model is not very confident in its prediction. In some cases, the
        model’s top confidence score may be below 50%.
      </p>
    </div>
  );
};

export default Algorithm;
