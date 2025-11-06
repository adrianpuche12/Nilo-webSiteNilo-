import React from "react";
import {
  View,
  Text,
  Linking,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

const experienceData = [
  {
    title: "Automatización y soluciones empresariales",
    description:
      "Desarrollo de sistemas de automatización con n8n, integraciones con APIs y flujos inteligentes para optimizar procesos legales, administrativos y de comunicación.",
  },
  {
    title: "Educación en tecnologías emergentes",
    description:
      "Programas educativos dictados a través de la Fundación Libertad y nuestra plataforma oficial, enfocados en IA Generativa, Ciencia de Datos y Automatización Legal.",
    link: "https://educate.nilosolutions.com/",
  },
  {
    title: "Proyectos y consultoría tecnológica",
    description:
      "Colaboración con empresas y estudios jurídicos para la implementación de tecnologías emergentes: MCP, n8n, RAG y despliegue de soluciones IA.",
  },
];

export default function ExperienceSection() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#0a0a0a",
        paddingVertical: 50,
        paddingHorizontal: 20,
      }}
    >
      <Text
        style={{
          fontSize: 26,
          color: "#fff",
          fontWeight: "700",
          textAlign: "center",
          marginBottom: 30,
          letterSpacing: 1,
        }}
      >
        Experiencia y Proyectos Destacados
      </Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {experienceData.map((item, index) => (
          <Animated.View
            key={index}
            entering={FadeInUp.delay(index * 200).springify().damping(15)}
            style={{
              marginBottom: 25,
              borderRadius: 22,
              overflow: "hidden",
              shadowColor: "#8b5cf6",
              shadowOpacity: 0.2,
              shadowRadius: 12,
              elevation: 6,
            }}
          >
            <LinearGradient
              colors={["#1a1a1a", "#121212", "#0a0a0a"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                borderRadius: 22,
                padding: 20,
                borderWidth: 1,
                borderColor: "rgba(255,255,255,0.08)",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "700",
                  color: "#fff",
                  marginBottom: 10,
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                }}
              >
                {item.title}
              </Text>

              <Text
                style={{
                  color: "#ccc",
                  fontSize: 15,
                  lineHeight: 22,
                }}
              >
                {item.description}
              </Text>

              {item.link && (
                <TouchableOpacity
                  onPress={() => Linking.openURL(item.link!)}
                  style={{
                    marginTop: 15,
                    paddingVertical: 10,
                    borderRadius: 10,
                    alignSelf: "flex-start",
                  }}
                >
                  <LinearGradient
                    colors={["#9333ea", "#5b21b6"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                      borderRadius: 10,
                      paddingHorizontal: 16,
                      paddingVertical: 8,
                    }}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        fontWeight: "600",
                        fontSize: 14,
                        textAlign: "center",
                      }}
                    >
                      Visitar plataforma educativa ↗
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              )}
            </LinearGradient>
          </Animated.View>
        ))}
      </ScrollView>
    </View>
  );
}
