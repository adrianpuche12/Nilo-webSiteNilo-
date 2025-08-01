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

const postWidth = width * 0.2;
const totalGapSpace = width - 4 * postWidth;
const gap = totalGapSpace / 4;

const BlogPost = ({ post, sendDetails }: BlogPostProps) => {
  const handleDetails = () => {
    sendDetails(post);
  };

  return (
    <View style={styles.postContainer}>
      <View style={styles.leftBorder}></View>
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
    borderColor: "#444444",
    borderWidth: 1,
    backgroundColor: "#1a1a1a",
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
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
    width: "100%",
    height: height * 0.2,
    resizeMode: "contain",
    marginBottom: 15,
  },
  readMoreButton: {
    backgroundColor: "#ff6b35",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 30,
    elevation: 3,
    shadowColor: "#ff6b35",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    marginTop: "auto",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    alignSelf: "center",
  },
  leftBorder: {
    position: "absolute",
    left: 0,
    top: 20,
    width: 4,
    height: 55,
    backgroundColor: "#ff6b35",
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
  },
});
