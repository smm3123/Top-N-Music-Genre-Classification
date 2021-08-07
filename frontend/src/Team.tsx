import { makeStyles } from '@material-ui/core';
import BioCard from './components/BioCard';
import biodata from './components/static/biodata.json';
import teamstrings from './components/static/teamstrings.json';

const useStyles = makeStyles({
  team: {
    // maxWidth: '800px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'right',
    textAlign: 'left',
    paddingLeft: '80px',
    paddingRight: '80px',
  },
});

const Team: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.team}>
      <h1>The Team</h1>
      <p>CS467 - Oregon State University - Summer 2021</p>
      <p>{teamstrings.summary}</p>

      <p>
        Project GitHub:{' '}
        <a href="https://github.com/smm3123/Top-N-Music-Genre-Classification">
          https://github.com/smm3123/Top-N-Music-Genre-Classification
        </a>
      </p>

      {biodata.map((person) => (
        <BioCard
          id={person.id}
          name={person.name}
          github={person.github}
          role={person.role}
          blurb={person.blurb}
        />
      ))}
    </div>
  );
};

export default Team;
