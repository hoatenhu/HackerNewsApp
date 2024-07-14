import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  StyleSheet,
} from 'react-native';
import {getStoryDetails} from '../services/api';
import StoryCard from './StoryCard';

interface Story {
  id: number;
  title: string;
  by: string;
  [key: string]: any;
}

interface StoryListProps {
  storyIds: number[];
  navigation: any;
}

const ITEM_HEIGHT = 70;

const StoryList: React.FC<StoryListProps> = ({storyIds, navigation}) => {
  const [page, setPage] = useState<number>(0);
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  useEffect(() => {
    loadInitialStories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storyIds]);

  const loadInitialStories = async () => {
    setLoading(true);
    await loadStories();
    setLoading(false);
  };

  const loadStories = async () => {
    const startIndex = page * 20;
    const endIndex = startIndex + 20;
    const storyDetails = await Promise.all(
      storyIds.slice(startIndex, endIndex).map(getStoryDetails),
    );
    setStories(prevStories => [...prevStories, ...storyDetails]);
  };

  const loadMoreStories = async () => {
    if (!loadingMore) {
      setLoadingMore(true);
      setPage(prevPage => prevPage + 1);
      await loadStories();
      setLoadingMore(false);
    }
  };

  return (
    <FlatList
      data={stories}
      keyExtractor={item =>
        `story_item_key_${item.id.toString()}_${Math.random()}`
      }
      renderItem={({item}) => (
        <TouchableOpacity
          onPress={() => navigation.navigate('Story', {id: item.id})}>
          <StoryCard story={item} />
        </TouchableOpacity>
      )}
      onEndReached={loadMoreStories}
      onEndReachedThreshold={0.5}
      initialNumToRender={10}
      windowSize={21}
      getItemLayout={(data, index) => ({
        length: ITEM_HEIGHT,
        offset: ITEM_HEIGHT * index,
        index,
      })}
      ListFooterComponent={
        loadingMore ? (
          <View style={styles.footer}>
            <ActivityIndicator size="large" color="#6200ee" />
          </View>
        ) : null
      }
      ListEmptyComponent={!loading ? <Text>No stories available.</Text> : null}
    />
  );
};

const styles = StyleSheet.create({
  footer: {
    paddingVertical: 20,
  },
});

export default StoryList;
