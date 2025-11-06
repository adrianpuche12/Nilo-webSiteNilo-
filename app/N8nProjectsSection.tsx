import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useBreakpoint } from "@/hooks/useBreakpoints";

const { width } = Dimensions.get("window");

const projects = [
  {
    title: "Gestión Legal – Automatización de procesos administrativos",
    description:
      "Flujo diseñado para optimizar la gestión documental y automatizar tareas internas en estudios jurídicos, reduciendo tiempos y errores humanos.",
    url: "https://legalbackn8n.nilosolutions.com/workflow/rvudGubRQEUmVV73",
    image: "https://cdn-icons-png.flaticon.com/512/9463/9463170.png",
  },
  {
    title: "Integración de canales de comunicación (Twilio + n8n)",
    description:
      "Conecta mensajería, correos y CRM para mantener un registro automatizado y unificado de las interacciones con los clientes.",
    url: "https://legalbackn8n.nilosolutions.com/workflow/RMrvdul3O2Fm18B3",
    image: "https://cdn-icons-png.flaticon.com/512/3062/3062634.png",
  },
  {
    title: "Pipeline de datos para reportes de IA",
    description:
      "Flujo avanzado que recolecta, transforma y distribuye datos hacia módulos de inteligencia artificial para análisis estratégico.",
    url: "https://legalbackn8n.nilosolutions.com/workflow/6wDIzWI3B5YGYdyE",
    image: "https://cdn-icons-png.flaticon.com/512/4839/4839955.png",
  },
  {
    title: "Automatización Legal Avanzada – RAG y documentación",
    description:
      "Integración de RAG (Retrieval Augmented Generation) para consultas jurídicas inteligentes basadas en documentación real.",
    url: "https://legalbackn8n.nilosolutions.com/workflow/8bOVNfpNEOY9SUDS",
    image: "https://cdn-icons-png.flaticon.com/512/3652/3652269.png",
  },
];

const N8nProjectsSection = () => {
  const { isMobile } = useBreakpoint();

  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView
      style={styles.sectionContainer}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ alignItems: "center" }}
    >
      <View style={styles.titleContainer}>
        <View style={styles.titleDecoration} />
        <Text style={styles.title}>Proyectos de automatización con n8n</Text>
        <View style={styles.titleDecoration} />
      </View>

      <Text style={styles.description}>
        En{" "}
        <Text
          style={styles.highlight}
          onPress={() =>
            Linking.openURL("https://educate.nilosolutions.com/")
          }
        >
          Nilo Solutions
        </Text>
        , desarrollamos flujos inteligentes con n8n, IA y APIs que conectan
        sistemas empresariales, optimizan procesos repetitivos y aumentan la
        productividad. Cada proyecto refleja nuestro enfoque en la eficiencia y
        la automatización estratégica.
      </Text>

      <View style={styles.cardsOuterContainer}>
        <View
          style={[
            styles.cardsContainer,
            isMobile && styles.cardsContainerMobile,
          ]}
        >
          {projects.map((project, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.card, isMobile && styles.cardMobile]}
              activeOpacity={0.9}
              onPress={() => openLink(project.url)}
            >
              <LinearGradient
                colors={["#151515", "#101010"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.gradientBackground}
              >
                <Image source={{ uri: project.image }} style={styles.icon} />
                <Text style={styles.cardTitle}>{project.title}</Text>
                <Text style={styles.cardDescription}>
                  {project.description}
                </Text>

                <View style={styles.buttonContainer}>
                  <LinearGradient
                    colors={["#ff6b35", "#ff3b00"]}
                    style={styles.linkButton}
                  >
                    <Text style={styles.linkButtonText}>Ver proyecto →</Text>
                  </LinearGradient>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default N8nProjectsSection;

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    backgroundColor: "#000",
    paddingVertical: 70,
    paddingHorizontal: 20,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 25,
  },
  titleDecoration: {
    width: 50,
    height: 3,
    backgroundColor: "#ff6b35",
    marginHorizontal: 16,
    borderRadius: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    letterSpacing: 0.8,
  },
  description: {
    fontSize: 16,
    color: "#ccc",
    textAlign: "center",
    marginBottom: 45,
    paddingHorizontal: 10,
    lineHeight: 24,
  },
  highlight: {
    color: "#ff6b35",
    fontWeight: "bold",
  },
  cardsOuterContainer: {
    width: "100%",
    maxWidth: 1100,
    alignSelf: "center",
  },
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 25,
  },
  cardsContainerMobile: {
    flexDirection: "column",
    gap: 18,
  },
  card: {
  borderRadius: 24,
  width: "45%",
  maxWidth: 420,
  minWidth: 300,
  backgroundColor: "#121212", // 🔧 fondo opaco uniforme
  shadowColor: "#000",
  shadowOpacity: 0.2,
  shadowOffset: { width: 0, height: 4 },
  shadowRadius: 10,
  elevation: 5,
  overflow: "visible", // 🔧 evita que el gradiente se “recorte” o se vea sombreado abajo
},
  cardMobile: {
    width: "100%",
    minWidth: "auto",
    alignSelf: "center",
  },
  gradientBackground: {
  flex: 1,
  padding: 22,
  borderRadius: 24,
  borderWidth: 1,
  borderColor: "rgba(255,255,255,0.05)",
  backgroundColor: "#121212", // 🔧 fondo fijo debajo del gradiente
},
  icon: {
    width: 64,
    height: 64,
    marginBottom: 18,
    alignSelf: "center",
  },
  cardTitle: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "700",
    marginBottom: 10,
    textAlign: "center",
  },
  cardDescription: {
    color: "#bbb",
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    alignItems: "center",
  },
  linkButton: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
  linkButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
    textAlign: "center",
  },
});
