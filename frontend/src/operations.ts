import qs from 'qs';
import { get } from './httpUtils';

import { IYTSearchResultResponse, IYTSearchItem } from './types';

const YT_PATH = 'https://www.googleapis.com/youtube/v3/search';
const MAX_RESULTS = 10;
const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

// direct API call
const getYTSearchResultsAsync = async (
  query: string
): Promise<IYTSearchItem[]> => {
  const { items } = await get<IYTSearchResultResponse>(
    `${YT_PATH}?${qs.stringify({
      part: 'snippet',
      maxResults: MAX_RESULTS,
      q: query,
      type: 'video',
      key: API_KEY,
    })}`
  );
  return items;
};

// our API call
const YTSEARCHBACKEND_PATH =
  'https://api-dot-osu-capstone-testing.uc.r.appspot.com/api/youtube-search-results/';
const getBackendYTSearchResultsAsync = async (
  query: string
): Promise<IYTSearchItem[]> => {
  const { items } = await get<IYTSearchResultResponse>(
    YTSEARCHBACKEND_PATH + query
  );
  return items;
};

export default {
  getYTSearchResultsAsync,
  getBackendYTSearchResultsAsync,
};
