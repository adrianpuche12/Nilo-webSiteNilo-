import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useBreakpoint } from "@/hooks/useBreakpoints";

// Define el objeto post para despues guardar los post en su state
interface Post {
  id: string;
  title: string;
  content: string;
  date: string;
  description: string;
}

interface BlogFormProps {
  post?: Post;
  onAddPost: (post: Post) => void;
}
const { width, height } = Dimensions.get("window");

const BlogForm = ({ post, onAddPost }: BlogFormProps) => {
  const { isMobile, isTablet, isDesktop, isLargeDesktop } = useBreakpoint();

  // Hook para detectar cambios en las dimensiones
  const [screenDimensions, setScreenDimensions] = useState(
    Dimensions.get("window")
  );
  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setScreenDimensions(window);
    });

    return () => subscription?.remove();
  }, []);

  const [formData, setFormData] = useState({
    title: post?.title || "",
    content: post?.content || "",
    description: post?.description || "",
  });
  const [id, setId] = useState(1);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("boton precionado");

    const newPost: Post = {
      id: id.toString(),
      title: formData.title,
      content: formData.content,
      description: formData.description,
      date: new Date().toLocaleString("es-AR", {
        timeZone: "America/Argentina/Buenos_Aires",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    onAddPost(newPost);
    setFormData({ title: "", content: "", description: "" });
    setId(id + 1);
    console.log("post creado: ", newPost); // lista actualizada de post porque se buguea
  };

  return (
    <View
      style={[styles.formContainer, isMobile && styles.mobileFormContainer]}
    >
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Título</Text>
        <TextInput
          style={styles.input}
          value={formData.title}
          onChangeText={(value) => handleInputChange("title", value)}
          placeholder="Escribe el título del blog..."
          placeholderTextColor="#999"
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Descripción</Text>
        <TextInput
          style={[styles.input]}
          value={formData.description}
          onChangeText={(value) => handleInputChange("description", value)}
          placeholder="Escribe la descripción del blog..."
          placeholderTextColor="#999"
          numberOfLines={8}
          textAlignVertical="top"
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Contenido</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={formData.content}
          onChangeText={(value) => handleInputChange("content", value)}
          placeholder="Escribe el contenido del blog..."
          placeholderTextColor="#999"
          multiline={true}
          numberOfLines={8}
          textAlignVertical="top"
        />
      </View>
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Publicar Blog</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BlogForm;

const styles = StyleSheet.create({
  formContainer: {
    width: "100%",
    borderColor: "#444444",
    borderWidth: 1,
    borderRadius: 20,
    padding: 20,
    paddingTop: 60,
    flexShrink: 1,
    backgroundColor: "#1A1A1A",
  },
  mobileFormContainer: {
    width: "100%",
    padding: 10,
    paddingTop: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 30,
    textAlign: "center",
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 8,
  },
  input: {
    color: "#fff",
    backgroundColor: "#2A2A2A",
    borderWidth: 2,
    borderColor: "#444444",
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
  },
  textArea: {
    height: 80,
    paddingTop: 15,
  },
  submitButton: {
    alignSelf: "center",
    width: "18%",
    backgroundColor: "#ff6b35",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 30,
    elevation: 3,
    shadowColor: "#ff6b35",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    marginTop: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});
