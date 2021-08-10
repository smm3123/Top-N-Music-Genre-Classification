import SearchBox from './components/SearchBox';

import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { useState } from 'react';
import { IVideo } from './types';
import Results from './components/Results';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    introduction: {
      paddingTop: '20px',
      paddingBottom: '20px',
    },
    home: {
      // paddingLeft: '15em',
      // paddingRight: '15em',
      // marginBottom: '20em',
      lineHeight: '1.5',
    },
  })
);

const Home: React.FC = () => {
  const classes = useStyles();
  const [selectedVideo, setSelectedVideo] = useState<IVideo>({
    title: '',
    channel: '',
    thumbnail: '',
    videoId: '',
  });

  const [analysisTrigger, setAnalysisTrigger] = useState(0);
  const handleSearchSelect = (video: IVideo) => {
    setSelectedVideo({
      title: video.title,
      channel: video.channel,
      thumbnail: video.thumbnail,
      videoId: video.videoId,
    });
  };

  const handleAnalysisSelect = (flag: number) => {
    setAnalysisTrigger(flag);
  };

  return (
    <div className={classes.home}>
      {analysisTrigger === 0 && (
        <div>
          <h2>Welcome to our music genre classifcation neural network!</h2>
          <p>Search for a song on YouTube to begin:</p>
        </div>
      )}
      {analysisTrigger === 0 && (
        <SearchBox
          handleSearchSelect={handleSearchSelect}
          SearchSelect={selectedVideo}
          handleAnalysisSelect={handleAnalysisSelect}
        />
      )}
      {analysisTrigger === 1 && (
        <Results
          selectedVideo={selectedVideo}
          analysisTrigger={analysisTrigger}
        />
      )}
    </div>
  );
};

export default Home;
