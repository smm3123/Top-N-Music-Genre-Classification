import React, { useState } from 'react';

import { Box, Button, Divider, LinearProgress } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import { IClassResponse, IVideo, IYTSearchItem } from '../types';
import operations from '../operations';

import VideoCard from './VideoCard';
import axios from 'axios';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: '20px',
      paddingBottom: '20px',
    },
    input: {
      width: '500px',
    },
    searchResults: {
      margin: 'auto',
      display: 'block',
      height: '60vh',
      overflowY: 'auto',
      maxWidth: '410px',
      paddingBottom: '20px',
    },
    padding: {
      paddingBottom: '60px',
    },
  })
);

const YT_PREFIX = 'https://www.youtube.com/watch?v=';

const TESTSearchBox: React.FC = () => {
  const [videos, setVideos] = useState<IYTSearchItem[]>([]);
  const [query, setQuery] = useState('');
  const [selectedVideo, setSelectedVideo] = useState<IVideo>({
    title: '',
    channel: '',
    thumbnail: '',
    videoId: '',
  });
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

  const classes = useStyles();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const ytVideos = await operations.getBackendYTSearchResultsAsync(query);
    setVideos(ytVideos);
  };

  const handleVideoSelectList = (
    title: string,
    channel: string,
    thumbnail: string,
    videoId: string
  ) => {
    setSelectedVideo({
      title: title,
      channel: channel,
      thumbnail: thumbnail,
      videoId: videoId,
    });
    console.log('Video selected, title: ' + title);
  };

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
        'http://127.0.0.1:5000/api/get_genres',
        payload
      );
      console.log(data);
      if (data != null) {
        setclassResults(data);
      }
    }
  };

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
      listItem: {},
    })
  );

  // results component
  const Results: React.FC = () => {
    const classes = resultsComponentStyles();

    return (
      <div className={classes.root}>
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
        <h1>Output</h1>
        {classResults.top_prediction !== '' &&
          Object.entries(classResults.top_confidence_probs).map(
            ([key, value]) => {
              const newvalue = parseFloat(value) * 100;
              const progressvalue = parseFloat(value) * 100;
              let stringvalue = '';
              if (newvalue < 0.1) {
                stringvalue = '< 0.1 %';
              } else {
                stringvalue = newvalue.toFixed(2) + ' %';
              }
              return (
                <li className={classes.listItem}>
                  <LinearProgress
                    className={classes.bar}
                    variant="determinate"
                    value={progressvalue}
                  />
                  {key} {stringvalue}
                </li>
              );
            }
          )}
      </div>
    );
  };

  return (
    <div>
      <div className={classes.padding}>
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={onSubmit}
        >
          <TextField
            className={classes.input}
            variant="outlined"
            label="YouTube Search"
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>
        <Box className={classes.searchResults}>
          {videos.map(
            ({
              id: { videoId },
              snippet: { title, channelTitle, thumbnails },
            }) => (
              <VideoCard
                key={videoId}
                video={{
                  title: title,
                  channel: channelTitle,
                  thumbnail: thumbnails.default.url,
                  videoId: videoId,
                }}
                handleVideoSelect={handleVideoSelectList}
              />
            )
          )}
        </Box>

        <Button
          disabled={selectedVideo.videoId === ''}
          variant="contained"
          onClick={() => sendPostRequest(selectedVideo.videoId)}
        >
          POST Request
        </Button>
      </div>

      <div className={classes.padding}>
        <Divider />
        <Results />
      </div>
    </div>
  );
};

export default TESTSearchBox;
