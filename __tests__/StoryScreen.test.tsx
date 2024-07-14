import React from 'react';
import {render} from '@testing-library/react-native';
import StoryScreen from '../src/screens/StoryScreen';
import * as api from '../src/services/api';

jest.mock('../src/services/api');

describe('StoryScreen', () => {
  it('renders loading indicator while fetching story details', async () => {
    (api.getStoryDetails as jest.Mock).mockResolvedValue({
      id: 1,
      title: 'Test Story',
      kids: [],
    });

    const {getByTestId} = render(<StoryScreen route={{params: {id: 1}}} />);

    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('renders story details and comments', async () => {
    (api.getStoryDetails as jest.Mock).mockResolvedValue({
      id: 1,
      title: 'Test Story',
      kids: [2],
    });
    (api.getStoryDetails as jest.Mock).mockResolvedValueOnce({
      id: 2,
      text: 'Test Comment',
    });

    const {findByText} = render(<StoryScreen route={{params: {id: 1}}} />);

    expect(await findByText('Test Story')).toBeTruthy();
    expect(await findByText('Test Comment')).toBeTruthy();
  });
});
