import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";

const { width, height } = Dimensions.get("window");
interface BlogPostProps {
  post: {
    id: string;
    title: string;
    content: string;
    date: string;
    description: string;
  };
  sendDetails: (post: BlogPostProps["post"]) => void;
}

const BlogPost = ({ post, sendDetails }: BlogPostProps) => {

  const handleDetails = () => {
    sendDetails(post);
  };

  return (
    <View style={styles.postContainer}>
      <Image
        source={require("../assets/images/logo.png")}
        style={styles.postImage}
      />
      <Text style={styles.postDate}>
        Articulo{"\n"}por Nilo Solutions, {post.date}
      </Text>
      <Text style={styles.postTitle}>{post.title}</Text>
      <Text style={styles.postContent}>{post.description}</Text>
      <TouchableOpacity onPress={handleDetails} style={styles.readMoreButton}>
        <Text style={styles.buttonText}>Leer articulo</Text>
      </TouchableOpacity>
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
    width: width * 0.2,
    height: height * 0.5,
    flex: 1,
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
  titleDate: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 10,
  },
  postImage: {
    alignSelf: "center",
    height: height * 0.5 * 0.4,
    resizeMode: "contain",
    marginBottom: 15,
  },
  readMoreButton: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginTop: "auto",
  },
  buttonText: {
    color: "#007AFF",
    alignSelf: "center",
  },
});
