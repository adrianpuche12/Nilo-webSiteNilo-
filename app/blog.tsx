import { Text, StyleSheet, View, ScrollView } from "react-native";
import React, { Component, useState } from "react";
import BlogForm from "@/components/BlogForm";
import BlogPost from "@/components/BlogPost";
import Header from "@/components/Header";

interface Post {
  id: string;
  title: string;
  content: string;
  date: string;
}

const blog = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const handleAddPost = (newPost: Post) => {
    setPosts([...posts, newPost]);
    console.log("Lista de posts: ", [...posts, newPost]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.postsSection}>
        <ScrollView style={styles.scrollView}>
          {posts.map((post) => (
            <BlogPost key={post.id} post={post} />
          ))}
        </ScrollView>
      </View>
      <View style={styles.formSection}>
      <BlogForm onAddPost={handleAddPost} />
      </View>
    </View>
  );
};
export default blog;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    margin: 0,
    padding: 0,
    minHeight: 0,
  },
  formSection: {
    flex: 0.6, // 60% del espacio para el formulario
  },
  postsSection: {
    flex: 0.4, // 40% del espacio para los posts
    width: "100%",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#000",
  },
});
