import axios from 'axios';

const get = async <T extends unknown>(url: string): Promise<T> => {
  try {
    const { data } = await axios.get(url);
    if (!data) {
      throw Error('Data does not exist!');
    }
    return data;
  } catch (error) {
    throw Error(error);
  }
};

const post = async <T extends unknown>(
  url: string,
  requestObject: {}
): Promise<T> => {
  try {
    const { data } = await axios.post(url, requestObject);
    if (!data) {
      throw Error('Data does not exist!');
    }
    return data;
  } catch (error) {
    throw Error(error);
  }
};

export { get, post };
