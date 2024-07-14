import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {
  TabView,
  SceneMap,
  TabBar,
  SceneRendererProps,
} from 'react-native-tab-view';
import {getStoryIds} from '../services/api';
import StoryList from '../components/StoryList';

interface StoryIds {
  new: number[];
  top: number[];
  best: number[];
}

interface Route {
  key: string;
  title: string;
}

const HomeScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const [index, setIndex] = useState<number>(0);
  const [routes] = useState<Route[]>([
    {key: 'new', title: 'New'},
    {key: 'top', title: 'Top'},
    {key: 'best', title: 'Best'},
  ]);
  const [storyIds, setStoryIds] = useState<StoryIds>({
    new: [],
    top: [],
    best: [],
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    preloadStoryIds();
  }, []);

  const preloadStoryIds = async () => {
    const newStoryIds = await getStoryIds('new');
    const topStoryIds = await getStoryIds('top');
    const bestStoryIds = await getStoryIds('best');
    setStoryIds({new: newStoryIds, top: topStoryIds, best: bestStoryIds});
    setLoading(false);
  };

  const renderScene = SceneMap({
    new: () => <StoryList storyIds={storyIds.new} navigation={navigation} />,
    top: () => <StoryList storyIds={storyIds.top} navigation={navigation} />,
    best: () => <StoryList storyIds={storyIds.best} navigation={navigation} />,
  });

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    );
  }

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={(
        props: SceneRendererProps & {
          navigationState: {index: number; routes: Route[]};
        },
      ) => (
        <TabBar
          {...props}
          indicatorStyle={styles.indicator}
          style={styles.tabBar}
          labelStyle={styles.tabLabel}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // width: '100%',
  },
  tabBar: {
    backgroundColor: '#6200ee',
  },
  indicator: {
    backgroundColor: '#fff',
  },
  tabLabel: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
