import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { CardActionArea, CardMedia } from '@material-ui/core';
import { IVideoCardProps } from '../types';

const useStyles = makeStyles({
  root: {
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
});

const VideoCard: React.FC<IVideoCardProps> = ({
  title,
  channel,
  thumbnail,
}: IVideoCardProps) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardActionArea className={classes.details}>
        <CardMedia
          className={classes.preview}
          image={thumbnail}
          title="video thumbnail"
        />
        <CardContent className={classes.content}>
          <span className={classes.span}>
            <Typography className={classes.title}>{title}</Typography>
          </span>
          <Typography className={classes.channel} color="textSecondary">
            {channel}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default VideoCard;
