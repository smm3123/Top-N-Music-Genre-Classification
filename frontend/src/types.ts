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
  top_prediction: string;
  top_confidence_probs: {};
}

export interface IBioCardProps {
  id: number;
  name: string;
  github: string;
  role: string;
  blurb: string;
}

export interface IVideoCardProps {
  handleVideoSelect(
    title: string,
    channel: string,
    thumbnail: string,
    videoId: string
  ): any;
  video: IVideo;
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

// const classResults = {
//   top_prediction: 'blues',
//   top_confidence_probs: {
//     blues: '0.97673905',
//     rock: '0.017715627',
//     country: '0.005420457',
//     reggae: '5.588101e-05',
//     pop: '2.9152101e-05',
//   },
// };
