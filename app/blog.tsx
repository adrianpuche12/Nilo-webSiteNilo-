import {
  Text,
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { Component, useState, useEffect } from "react";
import BlogForm from "@/components/BlogForm";
import BlogPost from "@/components/BlogPost";
import BlogPostDetails from "@/components/BlogPostDetails";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ScrollView } from "react-native-gesture-handler";
import { samplePosts } from "@/assets/data/samplePosts";
import { useBreakpoint } from "@/hooks/useBreakpoints";

const { width, height } = Dimensions.get("window");
interface Post {
  id: string;
  title: string;
  content: string;
  date: string;
  description: string;
}

const blog = () => {
  const [posts, setPosts] = useState<Post[]>(samplePosts);
  const [viewForm, setViewForm] = useState(false);
  const [viewPostDetails, setViewPostDetails] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [screenDimensions, setScreenDimensions] = useState(
    Dimensions.get("window")
  );
  const { isMobile, isTablet, isDesktop, isLargeDesktop } = useBreakpoint();

  // Hook para detectar cambios en las dimensiones
  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setScreenDimensions(window);
    });

    return () => subscription?.remove();
  }, []);

  // Cálculos dinámicos basados en breakpoints
  const getPostsPerScreen = () => {
    if (isTablet) return 2;
    if (isDesktop) return 3;
    if (isLargeDesktop) return 4;
    return 3; // fallback
  };

  const postsPerScreen = getPostsPerScreen();
  const postWidth = screenDimensions.width * (0.8 / postsPerScreen);
  const totalGapSpace = screenDimensions.width - postsPerScreen * postWidth;
  const gap = totalGapSpace / postsPerScreen;

  const handleAddPost = (newPost: Post) => {
    setPosts([...posts, newPost]);
    console.log("Lista de posts: ", [...posts, newPost]);
    setViewForm(false);
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
          horizontal={isMobile ? false : true}
          showsHorizontalScrollIndicator={false}
          decelerationRate="fast"
          contentContainerStyle={{
            gap: !isMobile ? gap : 0,
            alignItems: "center",
            paddingHorizontal: gap / 2,
          }}
          style={[
            styles.scrollView,
            { width: screenDimensions.width },
            isMobile && styles.mobileScrollView,
          ]}
        />
        <TouchableOpacity
          onPress={toggleViewForm}
          style={[styles.hideFormButton, isMobile && styles.mobileHideFormButton]}
        >
          <Text style={[styles.hideFormButtonText]}>{ isMobile ? `+` : `Crear un nuevo post`}</Text>
        </TouchableOpacity>
      </View>

      {viewForm && (
        <View
          style={[
            styles.formSection,
            !viewForm && styles.hiddenForm,
            {
              width: screenDimensions.width * 0.8,
              left: screenDimensions.width / 2,
              transform: [
                { translateX: -(screenDimensions.width * 0.8) / 2 },
                { translateY: -200 },
              ],
              top: screenDimensions.height * 0.6,
            },
          ]}
        >
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
      <View style={[styles.footer, { width: screenDimensions.width }]}>
        <Footer />
      </View>
    </ScrollView>
  );
};
export default blog;

const styles = StyleSheet.create({
  blogContainer: {
    flex: 1,
    minHeight: Dimensions.get("window").height * 0.9,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  formSection: {
    bottom: 0,
    position: "absolute",
  },
  scrollView: {
    backgroundColor: "#000",
  },
  mobileScrollView: {
    marginBottom: 30,
    height: Dimensions.get("window").height * 0.73,
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
  mobileHideFormButton: {
    position: "fixed", // o "absolute" si fixed no funciona en React Native
    left: "auto",
    top: "98%", // Centrado verticalmente
   // Ajustar para centrar exactamente
    borderRadius: 0,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    paddingHorizontal: 16,
    right: 0, // Resetear el right del estilo padre
    bottom: "auto",
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
    marginBottom: 18,
    textAlign: "center",
  },
  footer: {
    bottom: 0,
    width: width,
  },
});
