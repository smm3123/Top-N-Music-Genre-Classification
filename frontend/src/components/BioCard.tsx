import { makeStyles, Paper, Typography } from '@material-ui/core';
import { IBioCardProps } from '../types';
import VideoCard from './VideoCard';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    maxWidth: '700px',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '20px 0 20px 20px',
    margin: '5px',
  },
  text: {
    display: 'flex',
    flexDirection: 'column',
  },
  video: {
    display: 'flex',
    marginRight: '10px',
  },
});

const BioCard: React.FC<IBioCardProps> = ({
  id,
  name,
  github,
  role,
  blurb,
  video,
}: IBioCardProps) => {
  const classes = useStyles();

  const YT_PREFIX = 'https://www.youtube.com/watch?v=';

  const handleVideoSelectSingle = (
    title: string,
    channel: string,
    thumbnail: string,
    videoId: string
  ) => {
    console.log(videoId);
    window.open(YT_PREFIX + videoId);
  };

  return (
    <Paper className={classes.root} elevation={3}>
      <div className={classes.text}>
        <Typography variant="h5">{name}</Typography>
        <Typography>{role}</Typography>
        <Typography>
          <a href={github}>{github}</a>
        </Typography>
      </div>
      <div className={classes.video}>
        <VideoCard video={video} handleVideoSelect={handleVideoSelectSingle} />
      </div>
    </Paper>
  );
};

export default BioCard;
