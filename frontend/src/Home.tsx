import SearchBox from './components/SearchBox';

import {
  Container,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';

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
  // const [selectedVideo, setSelectedVideo] = useState<IVideo>({
  //   title: '',
  //   channel: '',
  //   thumbnail: '',
  //   videoId: '',
  // });

  return (
    <div className="home">
      <Typography className={classes.body}>
        Check out our music classification neural network! Search for a song on
        YouTube to begin:
      </Typography>
      {/* <SearchBox setSelectedVideo={setSelectedVideo} /> */}
      <Typography className={classes.body}>
        Having a hard time deciding? Try one of these:
      </Typography>
      <Container>
        {/* <VideoCard />
        <VideoCard />
        <VideoCard />
        <VideoCard /> */}
      </Container>
    </div>
  );
};

export default Home;
