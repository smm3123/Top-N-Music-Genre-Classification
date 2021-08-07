import {
  AppBar,
  Box,
  createStyles,
  makeStyles,
  Theme,
  Toolbar,
} from '@material-ui/core';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
      textAlign: 'left',
    },
    linkstyles: {
      backgroundColor: 'transparent',
      color: 'inherit',
      padding: '14px 25px',
      textAlign: 'center',
      textDecoration: 'none',
    },
  })
);

const linkactive = {
  borderBottom: 'solid 3px #fff',
  paddingBottom: '1em',
};

const HeaderBar: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Box className={classes.title}>
            <NavLink
              exact
              to="/"
              className={classes.linkstyles}
              activeStyle={linkactive}
            >
              Music Classifier
            </NavLink>
          </Box>

          <Box>
            <NavLink
              exact
              to="/algorithm"
              className={classes.linkstyles}
              activeStyle={linkactive}
            >
              How It Works
            </NavLink>
            <NavLink
              exact
              to="/aboutus"
              className={classes.linkstyles}
              activeStyle={linkactive}
            >
              About Us
            </NavLink>
            <NavLink
              exact
              to="/test"
              className={classes.linkstyles}
              activeStyle={linkactive}
            >
              Backend Test
            </NavLink>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default HeaderBar;
