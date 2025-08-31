import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useBreakpoint } from "../hooks/useBreakpoints";

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
  const [hovered, setHovered] = useState(false);
  const [screenDimensions, setScreenDimensions] = useState(Dimensions.get('window'));
  const { isMobile, isTablet, isDesktop, isLargeDesktop } = useBreakpoint();

  // Hook para detectar cambios en las dimensiones
  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setScreenDimensions(window);
    });

    return () => subscription?.remove();
  }, []);

  // Cálculos dinámicos basados en breakpoints
  const getPostsPerScreen = () => {
    if (isMobile) return 1;
    if (isTablet) return 2;
    if (isDesktop) return 3;
    if (isLargeDesktop) return 4;
    return 3; // fallback
  };

  const postsPerScreen = getPostsPerScreen();
  const postWidth = isMobile ? screenDimensions.width *0.95 : screenDimensions.width * (0.8 / postsPerScreen); // 80% del ancho dividido entre posts
  const totalGapSpace = screenDimensions.width - postsPerScreen * postWidth;
  const gap = totalGapSpace / (postsPerScreen + 1);
  const postHeight = screenDimensions.height * 0.6;

  const handleDetails = () => {
    sendDetails(post);
  };

  const truncateText = (text: string) => {
    const maxLength = isMobile ? 60 : isTablet ? 70 : 80;
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <TouchableOpacity
      onPress={handleDetails}
      //@ts-ignore
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <View style={[styles.postContainer, { 
        width: postWidth,
        height: postHeight
      }]}>
        <View style={styles.leftBorder}></View>
        <Image
          source={require("../assets/images/logo.png")}
          style={[styles.postImage, { height: screenDimensions.height * 0.2 }]}
        />
        <Text style={styles.postDate}>
          Articulo{"\n"}por Nilo Solutions, {post.date}
        </Text>
        <Text style={[styles.postTitle, { fontSize: isMobile ? 18 : 20 }]}>{post.title}</Text>
        <View style={styles.titleUnderline} />
        <Text style={[styles.postDescription, { fontSize: isMobile ? 14 : 14 }]}>
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
    flex: 1,
  },
  postTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 15,
    lineHeight: 24,
    height: 24*3,
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
    resizeMode: "contain",
    marginBottom: 15,
    marginTop: 0, // Asegurar que no tenga margin top
    paddingTop: 0,
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
