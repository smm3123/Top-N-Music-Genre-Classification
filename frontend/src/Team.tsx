import { makeStyles } from '@material-ui/core';
import BioCard from './components/BioCard';
import biodata from './components/static/biodata.json';

const useStyles = makeStyles({
  team: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'right',
    textAlign: 'left',
    paddingLeft: '10%',
    paddingRight: '10%',
    marginBottom: '20em',
    lineHeight: '1.5',
  },
  memebers: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '20px',
  },
});

const Team: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.team}>
      <h1>The Team</h1>
      <h2>CS467 - Oregon State University - Summer 2021</h2>
      <p>
        Welcome to our music classifier neural network! Our goals for this
        project were to develop a music genre classification algorithm and
        deploy it as a web application. This capstone project was completed as
        part of Oregon State University’s Computer Science Post Baccalaureate
        degree program.
      </p>

      <p>
        Project GitHub:{' '}
        <a href="https://github.com/smm3123/Top-N-Music-Genre-Classification">
          https://github.com/smm3123/Top-N-Music-Genre-Classification
        </a>
      </p>
      <div className={classes.memebers}>
        {biodata
          .sort((a, b) => 0.5 - Math.random())
          .map((person) => (
            <BioCard
              id={person.id}
              name={person.name}
              github={person.github}
              role={person.role}
              blurb={person.blurb}
              video={person.video}
            />
          ))}
      </div>
    </div>
  );
};

export default Team;
