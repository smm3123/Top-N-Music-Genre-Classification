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

export interface IAlgoResponse {
  // classification probabilities
  pvalues: {
    rock: number;
    pop: number;
    classical: number;
    jazz: number;
  };
  // plots
  waveform: string;
  spectrogram: string;
  features: string;
}

export interface IBioCardProps {
  id: number;
  name: string;
  github: string;
  role: string;
  blurb: string;
}

export interface IVideoCardProps {
  title: string;
  channel: string;
  thumbnail: string;
}
