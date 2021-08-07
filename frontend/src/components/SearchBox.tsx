import React, { useState } from 'react';

import { Box } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import { IVideo, IYTSearchItem } from '../types';
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

const SearchBox: React.FC = () => {
  const [videos, setVideos] = useState<IYTSearchItem[]>([]);
  const [query, setQuery] = useState('');

  const classes = useStyles();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const ytVideos = await operations.getYTSearchResultsAsync(query);
    setVideos(ytVideos);
  };

  const handleVideoSelect = (
    title: string,
    channel: string,
    thumbnail: string,
    videoId: string
  ) => {
    // setSelectedVideo(
    //   title: title,
    //   channel: channel,
    //   thumbnail: thumbnail,
    //   videoId: videoId,
    // );
    // setSelectedVideo(title, channel, thumbnail, videoId);
    console.log('Video selected, title: ' + title);
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
              video={{
                title: title,
                channel: channelTitle,
                thumbnail: thumbnails.default.url,
                videoId: videoId,
              }}
              handleVideoSelect={handleVideoSelect}
            />
          )
        )}
      </Box>
    </div>
  );
};

export default SearchBox;
