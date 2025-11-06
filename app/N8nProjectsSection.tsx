import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Linking, Dimensions, ScrollView } from "react-native";
import { useBreakpoint } from "@/hooks/useBreakpoints";

const { width } = Dimensions.get("window");

const n8nProjectsData = [
  {
    title: "Gestión Legal – Automatización de procesos administrativos",
    description:
      "Flujo diseñado para optimizar la gestión de documentación legal y tareas internas en estudios jurídicos.",
    url: "https://legalbackn8n.nilosolutions.com/workflow/rvudGubRQEUmVV73",
  },
  {
    title: "Integración de canales de comunicación (Twilio + n8n)",
    description:
      "Sistema que conecta mensajería, correos y CRM para mantener un registro automatizado de interacciones con clientes.",
    url: "https://legalbackn8n.nilosolutions.com/workflow/RMrvdul3O2Fm18B3",
  },
  {
    title: "Pipeline de datos para reportes de IA",
    description:
      "Flujo de procesamiento que recolecta, transforma y envía datos a módulos de análisis de inteligencia artificial.",
    url: "https://legalbackn8n.nilosolutions.com/workflow/6wDIzWI3B5YGYdyE",
  },
  {
    title: "Automatización Legal Avanzada – RAG y documentación",
    description:
      "Proyecto que integra RAG (Retrieval Augmented Generation) y gestión de archivos para consultas jurídicas inteligentes.",
    url: "https://legalbackn8n.nilosolutions.com/workflow/8bOVNfpNEOY9SUDS",
  },
];

const N8nProjectsSection = () => {
  const { isMobile } = useBreakpoint();

  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.sectionContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.titleContainer}>
        <View style={styles.titleDecoration} />
        <Text style={styles.title}>Proyectos de automatización con n8n</Text>
        <View style={styles.titleDecoration} />
      </View>

      <Text style={styles.description}>
        En Nilo Solutions estamos desarrollando una serie de flujos automatizados basados en n8n,
        integrando Inteligencia Artificial, mensajería y gestión de datos. Estos proyectos
        demuestran nuestra capacidad para conectar sistemas, optimizar tareas repetitivas y crear
        procesos inteligentes que mejoran la eficiencia operativa.
      </Text>

      <View style={[styles.cardsContainer, isMobile && styles.cardsContainerMobile]}>
        {n8nProjectsData.map((project, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => openLink(project.url)}
            activeOpacity={0.8}
          >
            <Text style={styles.cardTitle}>{project.title}</Text>
            <Text style={styles.cardDescription}>{project.description}</Text>
            <Text style={styles.cardLink}>Ver proyecto →</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default N8nProjectsSection;

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
    marginBottom: 12,
  },
  cardLink: {
    color: "#ff6b35",
    fontWeight: "bold",
    textAlign: "right",
  },
});
