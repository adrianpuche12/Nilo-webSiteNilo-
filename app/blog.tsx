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
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ScrollView } from "react-native-gesture-handler";
import { samplePosts } from "@/assets/data/samplePosts";

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
  const [posts, setPosts] = useState<Post[]>(samplePosts);
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

  const handleScrollToSection = (sectionId: string | null) => {
    if (sectionId === null) {
      console.log("Received null sectionId");
      return;
    }
  };

  return (
    <ScrollView showsHorizontalScrollIndicator={false}>
      <Header scrollToSection={handleScrollToSection}></Header>
      <View style={styles.blogContainer}>
        <View style={styles.titleContainer}>
          <View style={styles.titleDecoration}></View>
          <Text style={styles.title}>Blog</Text>
          <View style={styles.titleDecoration}></View>
        </View>
        <Text style={styles.subtitle}>
          En nuestro Blog encontraras novedades, consejos y articulos de
          interés.
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
        <TouchableOpacity
          onPress={toggleViewForm}
          style={styles.hideFormButton}
        >
          <Text style={styles.hideFormButtonText}>{`Crear un nuevo post`}</Text>
        </TouchableOpacity>
      </View>

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
      <View style={styles.footer}>
        <Footer />
      </View>
    </ScrollView>
  );
};
export default blog;

const styles = StyleSheet.create({
  blogContainer: {
    height: height * 0.9,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  formSection: {
    height: height * 0.73,
    bottom: 0,
    width: width * 0.8,
    position: "absolute",
    top: height * 0.45,
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
  // estilos del titulo
  title: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  titleDecoration: {
    width: 60,
    height: 3,
    backgroundColor: "#ff6b35",
    marginHorizontal: 30,
    marginVertical: 20,
    borderRadius: 2,
    alignSelf: "flex-end",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "#ccc",
    marginBottom: 12,
  },
  footer: {
    bottom: 0,
    width: width,
  },
});
