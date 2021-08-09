import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { CardActionArea, CardMedia } from '@material-ui/core';
import { IVideoCardProps } from '../types';

const useStyles = makeStyles({
  card: {
    width: '380px',
    height: '90px',
    display: 'flex',
    margin: '5px',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
  },
  preview: {
    height: '90px',
    width: '120px',
    margin: 0,
    backgroundSize: 'contain',
  },
  title: {
    fontSize: '14px',
    textAlign: 'left',
    display: '-webkit-box',
    overflow: 'hidden',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
  },
  channel: {
    fontSize: '12px',
    display: 'flex',
    textAlign: 'left',
  },
  details: {
    display: 'flex',
    justifyContent: 'left',
  },
  span: {
    width: '220px',
    height: '50px',
  },
  cardActive: {
    width: '380px',
    height: '90px',
    display: 'flex',
    margin: '5px',
    background: 'rgba(63, 81, 181, 0.30)',
  },
});

const VideoCard: React.FC<IVideoCardProps> = ({
  video,
  handleVideoSelect,
  searchSelect,
}: IVideoCardProps) => {
  const classes = useStyles();

  return (
    <Card
      className={
        searchSelect?.videoId === video.videoId
          ? classes.cardActive
          : classes.card
      }
      variant="outlined"
      onClick={() =>
        handleVideoSelect(
          video.title,
          video.channel,
          video.thumbnail,
          video.videoId
        )
      }
    >
      <CardActionArea className={classes.details}>
        <CardMedia
          className={classes.preview}
          image={video.thumbnail}
          title="video thumbnail"
        />
        <CardContent className={classes.content}>
          <span className={classes.span}>
            <Typography className={classes.title}>{video.title}</Typography>
          </span>
          <Typography className={classes.channel} color="textSecondary">
            {video.channel}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default VideoCard;
