import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {getStoryDetails} from '../services/api';
import CommentCard from '../components/CommentCard';

interface Story {
  id: number;
  title: string;
  by: string;
  kids?: number[];
  [key: string]: any;
}

const StoryScreen = ({route}: any) => {
  const {id}: any = route.params;
  const [story, setStory] = useState<Story | null>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingComments, setLoadingComments] = useState<boolean>(false);

  useEffect(() => {
    fetchStoryDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchStoryDetails = async () => {
    setLoading(true);
    const storyDetails = await getStoryDetails(id);
    setStory(storyDetails);
    setLoading(false);

    if (storyDetails.kids && storyDetails.kids.length > 0) {
      fetchComments(storyDetails.kids);
    }
  };

  const fetchComments = async (commentIds: number[]) => {
    setLoadingComments(true);
    const comments = await Promise.all(commentIds.map(getStoryDetails));
    setComments(comments);
    setLoadingComments(false);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{story?.title}</Text>
      <Text style={styles.author}>by {story?.by}</Text>
      <FlatList
        data={comments}
        keyExtractor={item => `commentItem_key_${item.id.toString()}`}
        renderItem={({item}) => <CommentCard comment={item} />}
        ListEmptyComponent={
          !loadingComments ? <Text>No comments available.</Text> : null
        }
        ListFooterComponent={
          loadingComments ? (
            <View style={styles.footer}>
              <ActivityIndicator size="large" color="#6200ee" />
            </View>
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  author: {
    fontSize: 16,
    color: '#777',
    marginBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    paddingVertical: 20,
  },
});

export default StoryScreen;
