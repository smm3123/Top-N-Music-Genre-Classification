import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Thumbnail from "./static/yt_thumbnail.png";
import { CardActionArea, CardMedia } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: '380px',
    height: '90px',
    display: "flex",
	margin: "5px",
  },
  content: {
    display: "flex",
    flexDirection: "column",
  },
  preview: {
    height: "90px",
    width: "120px",
    margin: 0,
  },
  title: {
    fontSize: "14px",
	textAlign: "left",
	display: "-webkit-box",
	overflow: "hidden",
	"-webkit-line-clamp": 2,
	"-webkit-box-orient": "vertical",
  },
  channel: {
    fontSize: "12px",
    display: "flex",
	textAlign: "left"
  },
  details: {
    display: "flex",
	justifyContent: "left",
  },
  span: {
    width: "220px",
    height: "50px",
  },
});

export default function VideoCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardActionArea className={classes.details}>
        <CardMedia
          className={classes.preview}
          image={Thumbnail}
          title="YT test thumbnail"
        />
        <CardContent className={classes.content}>
          <span className={classes.span}>
            <Typography className={classes.title}>
              Dua Lipa - Levitating Featuring DaBaby (Official Music Video)
            </Typography>
          </span>
          <Typography className={classes.channel} color="textSecondary">
            Dua Lipa
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
