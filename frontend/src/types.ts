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

export interface IBioCardProps {
  id: number;
  name: string;
  github: string;
  role: string;
  blurb: string;
  video: IVideo;
}

export interface IVideoCardProps {
  handleVideoSelect(
    title: string,
    channel: string,
    thumbnail: string,
    videoId: string
  ): any;
  video: IVideo;
  searchSelect?: IVideo;
}

export interface IVideo {
  title: string;
  channel: string;
  thumbnail: string;
  videoId: string;
}

export interface IClassResponse {
  top_prediction: string;
  top_confidence_probs: {
    blues: string;
    classical: string;
    country: string;
    disco: string;
    hiphop: string;
    jazz: string;
    metal: string;
    pop: string;
    reggae: string;
    rock: string;
  };
}

export interface ISearchBoxProps {
  handleSearchSelect: (video: IVideo) => void;
  SearchSelect: IVideo;
  handleAnalysisSelect: (flag: number) => void;
}

export interface IResultsProps {
  selectedVideo: IVideo;
  analysisTrigger: number;
}
