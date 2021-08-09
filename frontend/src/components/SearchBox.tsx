import React, { useState } from 'react';

import { Box, Button } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import { ISearchBoxProps, IYTSearchItem } from '../types';
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
    analyze: { margin: '20px' },
  })
);

const SearchBox: React.FC<ISearchBoxProps> = ({
  handleSearchSelect,
  SearchSelect,
  handleAnalysisSelect,
}) => {
  const [videos, setVideos] = useState<IYTSearchItem[]>([]);
  const [query, setQuery] = useState('');

  const classes = useStyles();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const ytVideos = await operations.getBackendYTSearchResultsAsync(query);
    setVideos(ytVideos);
  };

  const handleVideoSelect = (
    title: string,
    channel: string,
    thumbnail: string,
    videoId: string
  ) => {
    handleSearchSelect({ title, channel, thumbnail, videoId });
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
              searchSelect={SearchSelect}
            />
          )
        )}
      </Box>

      {videos.length !== 0 && (
        <Button
          disabled={SearchSelect.videoId === ''}
          variant="contained"
          color="primary"
          onClick={() => handleAnalysisSelect(1)}
          className={classes.analyze}
        >
          Analyze
        </Button>
      )}
    </div>
  );
};

export default SearchBox;
