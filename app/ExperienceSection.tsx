import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Linking, Dimensions, ScrollView } from "react-native";
import { useBreakpoint } from "@/hooks/useBreakpoints";

const { width } = Dimensions.get("window");

const experiences = [
  {
    title: "Programas de formación empresarial",
    description:
      "Entrenamientos diseñados e implementados para empresas e instituciones como John Deere, Fundación Libertad (Argentina) y estudios jurídicos especializados.",
  },
  {
    title: "Automatización Legal con IA",
    description:
      "Desarrollo de flujos inteligentes basados en n8n y RAG (Retrieval Augmented Generation) aplicados a la gestión de documentos legales y consultas jurídicas.",
  },
  {
    title: "Educación en tecnologías emergentes",
    description:
      "Cursos especializados en Inteligencia Artificial Generativa, Data Science y Automatización. Más de 120 horas de formación actualizada.",
  },
];

const ExperienceSection = () => {
  const { isMobile } = useBreakpoint();

  const openLink = () => {
    Linking.openURL("https://educate.nilosolutions.com/");
  };

  return (
    <ScrollView style={styles.sectionContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.titleContainer}>
        <View style={styles.titleDecoration} />
        <Text style={styles.title}>Experiencia y proyectos destacados</Text>
        <View style={styles.titleDecoration} />
      </View>

      <Text style={styles.description}>
        En{" "}
        <Text style={styles.link} onPress={openLink}>
          NilO Solutions
        </Text>{" "}
        combinamos experiencia técnica y visión educativa para impulsar proyectos reales con impacto. 
        Nuestros programas y colaboraciones demuestran la calidad y versatilidad de nuestro enfoque tecnológico.
      </Text>

      <View style={[styles.cardsContainer, isMobile && styles.cardsContainerMobile]}>
        {experiences.map((exp, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.cardTitle}>{exp.title}</Text>
            <Text style={styles.cardDescription}>{exp.description}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default ExperienceSection;

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    backgroundColor: "#000",
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  titleDecoration: {
    width: 60,
    height: 3,
    backgroundColor: "#ff6b35",
    marginHorizontal: 16,
    borderRadius: 2,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#ccc",
    textAlign: "center",
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  link: {
    color: "#ff6b35",
    textDecorationLine: "underline",
  },
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 20,
  },
  cardsContainerMobile: {
    flexDirection: "column",
    gap: 16,
  },
  card: {
    backgroundColor: "#111",
    borderRadius: 20,
    padding: 20,
    width: width * 0.4,
    minWidth: 300,
    maxWidth: 400,
    shadowColor: "#ff6b35",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  cardTitle: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
    marginBottom: 10,
  },
  cardDescription: {
    color: "#bbb",
    fontSize: 15,
  },
});
