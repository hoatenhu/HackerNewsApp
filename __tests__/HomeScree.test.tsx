import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../src/screens/HomeScreen';
import StoryScreen from '../src/screens/StoryScreen';
import * as api from '../src/services/api';

jest.mock('../src/services/api');

const Stack = createStackNavigator();

describe('HomeScreen', () => {
  it('renders a list of stories', async () => {
    const mockStories = [1, 2, 3];
    (api.getStoryIds as jest.Mock).mockResolvedValue(mockStories);
    (api.getStoryDetails as jest.Mock).mockResolvedValue({
      id: 1,
      title: 'Test Story',
    });

    const {findByText} = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Story" component={StoryScreen} />
        </Stack.Navigator>
      </NavigationContainer>,
    );

    expect(await findByText('Test Story')).toBeTruthy();
  });

  it('navigates to StoryScreen on story press', async () => {
    const mockStories = [1];
    (api.getStoryIds as jest.Mock).mockResolvedValue(mockStories);
    (api.getStoryDetails as jest.Mock).mockResolvedValue({
      id: 1,
      title: 'Test Story',
    });

    const {findByText, getByTestId} = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Story" component={StoryScreen} />
        </Stack.Navigator>
      </NavigationContainer>,
    );

    const storyItem = await findByText('Test Story');
    fireEvent.press(storyItem);

    expect(getByTestId('StoryScreen')).toBeTruthy();
  });
});
