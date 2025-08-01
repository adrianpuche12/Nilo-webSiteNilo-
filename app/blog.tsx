import {
  Text,
  StyleSheet,
  View,
  FlatList,
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
  const renderPost = ({ item }: { item: Post }) => (
    <BlogPost post={item} sendDetails={handlePostDetails} />
  );

  const getSnapOffsets = () => {
    const totalPages = Math.ceil(posts.length / 4);
    const offsets = [];
    for (let i = 0; i < totalPages; i++) {
      offsets.push(i * width);
    }
    return offsets;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Blog</Text>
      <Text style={styles.subtitle}>
        En nuestro Blog encontraras novedades, consejos y articulos de interés.
      </Text>
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        // pagingEnabled={true}
        contentContainerStyle={{
          gap: gap,
          alignItems: "center",
          paddingHorizontal: gap / 2, // Solo padding izquierdo
        }}
        style={styles.scrollView}
      />
      <TouchableOpacity onPress={toggleViewForm} style={styles.hideFormButton}>
        <Text style={styles.hideFormButtonText}>{`Crear un nuevo post`}</Text>
      </TouchableOpacity>
      {viewForm && (
        <View style={[styles.formSection, !viewForm && styles.hiddenForm]}>
          <BlogForm onAddPost={handleAddPost} />
        </View>
      )}

      {viewPostDetails && (
        <View style={styles.formSection}>
          <BlogPostDetails
            selectedPost={selectedPost}
            onClose={handleCloseDetails}
          />
        </View>
      )}
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
    height: height * 0.73,
    bottom: 0,
    width: width * 0.8,
    position: "absolute",
    top: height*0.45,
    left: "50%",
    transform: [{ translateX: -(width * 0.8) / 2 }, { translateY: -200 }],
  },
  scrollView: {
    width: width,
    backgroundColor: "#000",
  },
  hiddenForm: {
    top: 99999,
  },
  hideFormButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
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
  hideFormButtonText: {
    color: "#fff",
    fontSize: 16,
    alignSelf: "center",
  },
  hidePostDetailsButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#007AFF",
    borderRadius: 8,
    padding: 10,
  },
  title: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#ccc",
    marginBottom: 12,
  },
});
