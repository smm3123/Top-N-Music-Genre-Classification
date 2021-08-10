import { useState } from 'react';
import {
  CircularProgress,
  createStyles,
  LinearProgress,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Theme,
} from '@material-ui/core';
import axios from 'axios';
import { IClassResponse, IResultsProps } from '../types';
import VideoCard from './VideoCard';

const resultsComponentStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'right',
      textAlign: 'left',
      paddingLeft: '80px',
      paddingRight: '80px',
    },
    bar: {
      backgroundColor: 'transparent',
    },
    table: {
      minWidth: 300,
      maxWidth: 500,
    },
  })
);

const Results: React.FC<IResultsProps> = ({
  selectedVideo,
  analysisTrigger,
}) => {
  const [classResults, setclassResults] = useState<IClassResponse>({
    top_prediction: '',
    top_confidence_probs: {
      blues: '0',
      classical: '0',
      country: '0',
      disco: '0',
      hiphop: '0',
      jazz: '0',
      metal: '0',
      pop: '0',
      reggae: '0',
      rock: '0',
    },
  });
  const classes = resultsComponentStyles();
  const YT_PREFIX = 'https://www.youtube.com/watch?v=';

  const handleVideoSelectSingle = (
    title: string,
    channel: string,
    thumbnail: string,
    videoId: string
  ) => {
    window.open(YT_PREFIX + videoId);
  };

  const sendPostRequest = async (videoId: string) => {
    if (videoId) {
      const payload = {
        youtube_url: YT_PREFIX + videoId,
      };
      const { data } = await axios.post(
        'https://api-dot-osu-capstone-testing.uc.r.appspot.com/api/get_genres',
        // 'http://127.0.0.1:5000/api/get_genres',
        payload
      );

      if (data != null) {
        setclassResults(data);
      }
    }
  };

  const resultsTable: React.FC = () => (
    <TableContainer component={Paper} className={classes.table}>
      <Table aria-label="simple table" size="small">
        <TableHead>
          <TableRow>
            <TableCell align="left">Genre</TableCell>
            <TableCell align="center">%</TableCell>
            <TableCell align="right"> </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {classResults.top_prediction !== '' &&
            Object.entries(classResults.top_confidence_probs).map(
              ([key, value]) => {
                const newvalue = parseFloat(value) * 100;
                let stringvalue = '';
                if (newvalue < 0.1) {
                  stringvalue = '< 0.1 %';
                } else {
                  stringvalue = newvalue.toFixed(2) + ' %';
                }
                return (
                  <TableRow key={key}>
                    <TableCell
                      component="th"
                      scope="row"
                      width="20%"
                      align="left"
                    >
                      {key}
                    </TableCell>
                    <TableCell align="right" width="20%%">
                      {stringvalue}
                    </TableCell>
                    <TableCell align="right" width="60%">
                      <LinearProgress
                        className={classes.bar}
                        variant="determinate"
                        value={newvalue}
                      />
                    </TableCell>
                  </TableRow>
                );
              }
            )}
        </TableBody>
      </Table>
    </TableContainer>
  );

  if (analysisTrigger !== 0) {
    if (classResults.top_prediction === '') {
      sendPostRequest(selectedVideo.videoId);
    }

    return (
      <div className={classes.root}>
        <div>
          <h1>Input</h1>
          <VideoCard
            video={{
              title: selectedVideo.title,
              channel: selectedVideo.channel,
              thumbnail: selectedVideo.thumbnail,
              videoId: selectedVideo.videoId,
            }}
            handleVideoSelect={handleVideoSelectSingle}
          />
        </div>
        <div>
          <h1>Output</h1>
          {classResults.top_prediction === '' ? (
            <CircularProgress />
          ) : (
            resultsTable({})
          )}
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default Results;
