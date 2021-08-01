import {
  AppBar,
  Box,
  Button,
  createStyles,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
  })
);

const HeaderBar: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title} align="left">
            Music Classifier
          </Typography>
          <Box>
            <Button component={Link} to="/" color="inherit">
              Home
            </Button>
            <Button component={Link} to="/algorithm" color="inherit">
              How It Works
            </Button>
            <Button component={Link} to="/aboutus" color="inherit">
              About Us
            </Button>
            <Button component={Link} to="/test" color="inherit">
              Backend Test
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default HeaderBar;
