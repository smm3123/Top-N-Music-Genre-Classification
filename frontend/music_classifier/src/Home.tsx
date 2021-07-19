import SearchBox from "./components/SearchBox";
import VideoCard from "./components/VideoCard";
import {
  Container,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    body: {
      paddingTop: "20px",
      paddingBottom: "20px",
    },
  })
);

const Home = () => {
  const classes = useStyles();

  return (
    <div className="home">
      <Typography className={classes.body}>
        Check out our music classification neural network! Search for a song on
        YouTube to begin:
      </Typography>
      <SearchBox />
      <Typography className={classes.body}>
        Having a hard time deciding? Try one of these:
      </Typography>
      <Container>
        <VideoCard />
        <VideoCard />
        <VideoCard />
        <VideoCard />
      </Container>
    </div>
  );
};

export default Home;
