import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface Comment {
  id: number;
  text: string;
  by: string;
  [key: string]: any;
}

interface CommentCardProps {
  comment: Comment;
}

const CommentCard: React.FC<CommentCardProps> = ({comment}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.author}>by {comment.by}</Text>
      <Text style={styles.text}>{comment.text}</Text>
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
  author: {
    fontSize: 14,
    color: '#777',
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
});

export default CommentCard;
