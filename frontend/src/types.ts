export interface IYTSearchResultResponse {
  items: IYTSearchItem[];
}

export interface IYTSearchItem {
  id: {
    videoId: string;
  };
  snippet: {
    channelTitle: string;
    title: string;
    thumbnails: {
      default: {
        url: string;
      };
    };
  };
}
