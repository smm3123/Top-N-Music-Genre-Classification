import React, { useState } from 'react';

import { Box } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import { IYTSearchItem } from '../types';
import operations from '../operations';

import VideoCard from './VideoCard';

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
  })
);

const TESTSearchBox: React.FC = () => {
  const [videos, setVideos] = useState<IYTSearchItem[]>([]);
  const [query, setQuery] = useState('');
  const classes = useStyles();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const ytVideos = await operations.getBackendYTSearchResultsAsync(query);
    setVideos(ytVideos);
  };

  return (
    <div>
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
              title={title}
              channel={channelTitle}
              thumbnail={thumbnails.default.url}
            />
          )
        )}
      </Box>
    </div>
  );
};

export default TESTSearchBox;
