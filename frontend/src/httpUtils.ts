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

export { get };
