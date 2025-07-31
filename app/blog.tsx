import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { Component, useState } from "react";
import BlogForm from "@/components/BlogForm";
import BlogPost from "@/components/BlogPost";
import BlogPostDetails from "@/components/BlogPostDetails";

const { width, height } = Dimensions.get("window");
interface Post {
  id: string;
  title: string;
  content: string;
  date: string;
  description: string;
}
const postWidth = width * 0.2;
const totalGapSpace = width - 4 * postWidth;
const gap = totalGapSpace / 4;

const blog = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [viewForm, setViewForm] = useState(false);
  const [viewPostDetails, setViewPostDetails] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const handleAddPost = (newPost: Post) => {
    setPosts([...posts, newPost]);
    console.log("Lista de posts: ", [...posts, newPost]);
  };
  const toggleViewForm = () => {
    setViewForm(!viewForm);
  };
  const handlePostDetails = (post: Post) => {
    console.log("Detalles del post:", post);
    setSelectedPost(post);
    setViewPostDetails(true);
  };
  const handleCloseDetails = () => {
    setSelectedPost(null);
    setViewPostDetails(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: gap,
          alignItems: "center",
        }}
      >
        {posts.map((post) => (
          <BlogPost key={post.id} post={post} sendDetails={handlePostDetails} />
        ))}
      </ScrollView>
      <TouchableOpacity onPress={toggleViewForm} style={styles.hideFormButton}>
        <Text>{`Crear un nuevo post`}</Text>
      </TouchableOpacity>
      <View style={[styles.formSection, viewForm && styles.hiddenForm]}>
        <BlogForm onAddPost={handleAddPost} />
      </View>
      <View style={[styles.formSection, !viewPostDetails && styles.hiddenForm]}>
        <BlogPostDetails selectedPost={selectedPost} onClose={handleCloseDetails} />
      </View>
    </View>
  );
};
export default blog;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#000",
  },
  formSection: {
    bottom: 0,
    width: width * 0.8,
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: [{ translateX: -(width * 0.8) / 2 }, { translateY: -200 }],
  },
  scrollView: {
    width: "100%",
    backgroundColor: "#000",
    marginLeft: gap / 2,
    marginRight: "auto",
  },
  hiddenForm: {
    top: 99999,
  },
  hideFormButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#007AFF",
    borderRadius: 8,
    padding: 10,
  },
  hidePostDetailsButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#007AFF",
    borderRadius: 8,
    padding: 10,
  },
});
