"use client";

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState, useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { SendButton } from "@/components/ui/AppButtons";

const { height } = Dimensions.get("window");

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  // Animaciones
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(40);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 1000 });
    translateY.value = withTiming(0, { duration: 800 });
  }, []);

  const fadeStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  const handleSend = () => {
    if (!email || !message) return;
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <View style={styles.container}>
      {/* Fondo degradado principal */}
      <LinearGradient
        colors={["#0a0a0a", "#1a1a1a"]}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Overlay sutil con gradiente cálido */}
      <LinearGradient
        colors={["#ff6b35", "#ffb347"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[StyleSheet.absoluteFillObject, { opacity: 0.08 }]}
      />

      {/* Formulario animado */}
      <Animated.View style={[styles.formWrapper, fadeStyle]}>
        <View style={styles.header}>
          <Text style={styles.title}>Contáctanos</Text>
          <Text style={styles.subtitle}>
            Estamos listos para impulsar tu próximo proyecto 🚀
          </Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Tu nombre"
          placeholderTextColor="#999"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={[styles.input, styles.textarea]}
          placeholder="Mensaje"
          placeholderTextColor="#999"
          value={message}
          onChangeText={setMessage}
          multiline
          numberOfLines={4}
        />

        <View style={styles.buttonWrapper}>
          <SendButton onPress={handleSend} disabled={!email || !message} />
        </View>

        {sent && (
          <Text style={styles.successMsg}>✅ Mensaje enviado con éxito</Text>
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: Dimensions.get("window").height, // ✅ reemplaza "100vh"
    backgroundColor: "#0a0a0a",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    paddingHorizontal: 16,
  },
  formWrapper: {
    width: "100%",
    maxWidth: 600,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 24,
    padding: 28,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    // reemplazo de backdropFilter con sombra
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 30,
    color: "#fff",
    fontWeight: "800",
    marginBottom: 8,
    textAlign: "center",
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 15,
    color: "#bbb",
    textAlign: "center",
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.08)",
    color: "#fff",
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },
  textarea: {
    height: 120,
    textAlignVertical: "top",
  },
  buttonWrapper: {
    marginTop: 12,
    alignItems: "flex-end",
  },
  successMsg: {
    color: "#4ade80",
    fontSize: 14,
    textAlign: "center",
    marginTop: 16,
  },
});
