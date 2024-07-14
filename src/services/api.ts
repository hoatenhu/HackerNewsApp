import axios from 'axios';

const BASE_URL = 'https://hacker-news.firebaseio.com/v0';

export const getStoryIds = async (
  type: 'new' | 'top' | 'best',
): Promise<number[]> => {
  const storyIds = await axios
    .get<number[]>(`${BASE_URL}/${type}stories.json`)
    .then(res => res.data);
  return storyIds;
};

export const getStoryDetails = async (id: number): Promise<any> => {
  const story = await axios
    .get<any>(`${BASE_URL}/item/${id}.json`)
    .then(res => res.data);
  return story;
};
