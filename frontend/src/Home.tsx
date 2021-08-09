import SearchBox from './components/SearchBox';

import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import { useState } from 'react';
import { IVideo } from './types';
import Results from './components/Results';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    body: {
      paddingTop: '20px',
      paddingBottom: '20px',
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
    <div className="home">
      {analysisTrigger === 0 && (
        <Typography className={classes.body}>
          Check out our music classification neural network! Search for a song
          on YouTube to begin:
        </Typography>
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
