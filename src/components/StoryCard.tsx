import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface Story {
  id: number;
  title: string;
  by: string;
  [key: string]: any;
}

interface StoryCardProps {
  story: Story;
}

const StoryCard: React.FC<StoryCardProps> = ({story}) => {
  if (!story) {
    return <View style={styles.skeleton} />;
  }

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{story.title}</Text>
      <Text style={styles.author}>by {story.by}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  author: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
  },
  skeleton: {
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
  },
});

export default StoryCard;
