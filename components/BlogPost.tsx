import { StyleSheet, Text, View } from "react-native";
import React from "react";

interface BlogPostProps {
  post: { id: string; title: string; content: string; date: string };
}

const BlogPost = ({ post }: BlogPostProps) => {
  return (
    <View style={styles.postContainer}>
      <View style={styles.titleDate}>
        <Text style={styles.postTitle}>{post.title}</Text>
        <Text style={styles.postDate}>{post.date}</Text>
      </View>

      <Text style={styles.postContent}>{post.content}</Text>
    </View>
  );
};

export default BlogPost;

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: "#007AFF",
  },
  postTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
    lineHeight: 24,
  },
  postDate: {
    fontSize: 14,
    color: "#888",
    marginBottom: 12,
    fontStyle: "italic",
  },
  postContent: {
    fontSize: 16,
    color: "#ccc",
    lineHeight: 22,
  },
  titleDate:{
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 10,
  }
});
