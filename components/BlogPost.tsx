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

  const [hovered, setHovered] = useState(false);

  const handleDetails = () => {
    sendDetails(post);
  };

  const truncateText = (text: string) => {
    const maxLength = 80;
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <TouchableOpacity onPress={handleDetails}
      //@ts-ignore
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
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
        <View style={styles.titleUnderline} />
        <Text style={styles.postDescription}>
          {truncateText(post.description)}
        </Text>
      </View>
    </TouchableOpacity>
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
    marginBottom: 60,
    width: width * 0.2,
    height: height * 0.6,
    flex: 1,
  },
  postTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 15,
    lineHeight: 24,
  },
  postDate: {
    fontSize: 11,
    color: "#888",
    marginBottom: 12,
    fontStyle: "italic",
  },
  postDescription: {
    fontSize: 14,
    color: "#ccc",
    marginBottom: 15,
    height: 66,
    overflow: "hidden",
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
    height: 120,
    backgroundColor: "#ff6b35",
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
  },
  titleUnderline: {
    marginBottom: 10,
    width: "70%",
    height: 4,
    backgroundColor: "#ff6b35",
    borderRadius: 1,
    //@ts-ignore
    transition: "all 0.4s ease",
  },
});
