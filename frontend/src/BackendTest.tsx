import TESTSearchBox from './components/TestSearchBox';

import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    body: {
      paddingTop: '20px',
      paddingBottom: '20px',
    },
  })
);

const BackendTest: React.FC = () => {
  const classes = useStyles();

  return (
    <div className="home">
      <Typography className={classes.body}>
        Check out our music classification neural network! Search for a song on
        YouTube to begin:
      </Typography>
      <TESTSearchBox />
    </div>
  );
};

export default BackendTest;
