import { makeStyles, Paper, Typography } from '@material-ui/core';
import { IBioCardProps } from '../types';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    maxWidth: '400px',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    minWidth: '300px',
    padding: '20px 0 20px 20px',
  },
});

const BioCard: React.FC<IBioCardProps> = ({
  id,
  name,
  github,
  role,
  blurb,
}: IBioCardProps) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root} elevation={3}>
      <Typography>{name}</Typography>
      <Typography>{role}</Typography>
      <Typography>
        <a href={github}>{github}</a>
      </Typography>
    </Paper>
  );
};

export default BioCard;
