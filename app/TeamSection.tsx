"use client";

import { View, Text, StyleSheet, useWindowDimensions, ScrollView } from "react-native";
import { useState } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withDelay,
  withSpring,
} from "react-native-reanimated";
import { useEffect } from "react";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  category: string;
  quote: string;
  image: string;
}

interface TeamSectionProps {
  teamMembers?: TeamMember[];
  categories?: string[];
  title?: string;
  subtitle?: string;
}

const defaultTeamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Peter Bauman",
    role: "Founder & CEO",
    category: "FOUNDER",
    quote: "Transformamos ideas en soluciones digitales innovadoras",
    image: "peter.png",
  },
  {
    id: 2,
    name: "Mateo Pellegrini",
    role: "Web Developer",
    category: "FRONTEND",
    quote: "Creando experiencias digitales únicas",
    image: "mateo.png",
  },
  {
    id: 3,
    name: "Ulises Pellegrini",
    role: "Web Developer",
    category: "BACKEND",
    quote: "La tecnología es el puente hacia el futuro",
    image: "ulises.png",
  },
  {
    id: 4,
    name: "Alex Vasquez",
    role: "Web Developer",
    category: "FRONTEND",
    quote: "Desarrollando interfaces modernas y funcionales",
    image: "alex.png",
  },
  {
    id: 5,
    name: "Adrian Pucheta",
    role: "Web Developer",
    category: "FRONTEND",
    quote: "Creando experiencias web extraordinarias",
    image: "adrian.png",
  },
  {
    id: 6,
    name: "Daniel Mera",
    role: "Web Developer",
    category: "BACKEND",
    quote: "Construyendo arquitecturas robustas y escalables",
    image: "daniel.png",
  },
  {
    id: 7,
    name: "Tomas Coronel",
    role: "Web Developer",
    category: "BACKEND",
    quote: "Desarrollando soluciones backend eficientes",
    image: "tomas.png",
  },
  {
    id: 8,
    name: "Jeronimo Azulay",
    role: "Web Developer",
    category: "FRONTEND",
    quote: "Innovando en el desarrollo web moderno",
    image: "jeronimo.png",
  },
  {
    id: 9,
    name: "Joaquin Urquiza",
    role: "Web Developer",
    category: "BACKEND",
    quote: "Optimizando sistemas y bases de datos",
    image: "joaquin.png",
  },
];

const defaultCategories = [
  "FOUNDER",
  "FRONTEND",
  "BACKEND",
];

const TeamSection = ({
  teamMembers = defaultTeamMembers,
  categories = defaultCategories,
  title = "Quiénes Somos",
  subtitle = "CONOCE A NUESTRO EQUIPO",
}: TeamSectionProps) => {
  // Simplificamos: no usamos filtros, mostramos todos los miembros
  const bp = useBreakpoint();

  // Simplificamos: no necesitamos animaciones complejas para el carousel

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.contentWrapper,
          bp.isTabletOrMobile && styles.contentWrapperTabletOrMobile,
          bp.isMobile && styles.contentWrapperMobile,
        ]}
      >
        {/* Title Section */}
        <View
          style={[
            styles.titleContainer,
            bp.isTabletOrMobile && styles.titleContainerTabletOrMobile,
            bp.isMobile && styles.titleContainerMobile,
          ]}
        >
          <View
            style={[
              styles.titleDecorationLeft,
              bp.isTabletOrMobile && styles.titleDecorationTabletOrMobile,
              bp.isMobile && styles.titleDecorationMobile,
            ]}
          />
          <View style={styles.titleWrapper}>
            <Text
              style={[
                styles.sectionSubtitle,
                bp.isTabletOrMobile && styles.sectionSubtitleTabletOrMobile,
                bp.isMobile && styles.sectionSubtitleMobile,
              ]}
            >
              {subtitle}
            </Text>
            <Text
              style={[
                styles.sectionTitle,
                bp.isTabletOrMobile && styles.sectionTitleTabletOrMobile,
                bp.isMobile && styles.sectionTitleMobile,
              ]}
            >
              {title.split(" ").map((word, index) =>
                index === title.split(" ").length - 1 ? (
                  <Text key={index} style={styles.titleAccent}>
                    {word}
                  </Text>
                ) : (
                  <Text key={index}>{word} </Text>
                )
              )}
            </Text>
          </View>
          <View
            style={[
              styles.titleDecorationRight,
              bp.isTabletOrMobile && styles.titleDecorationTabletOrMobile,
              bp.isMobile && styles.titleDecorationMobile,
            ]}
          />
        </View>

        {/* Company Information Sections */}
        <View
          style={[
            styles.infoSectionsContainer,
            bp.isTabletOrMobile && styles.infoSectionsContainerTabletOrMobile,
            bp.isMobile && styles.infoSectionsContainerMobile,
          ]}
        >
          {/* Quiénes Somos Section */}
          <View
            style={[
              styles.infoSection,
              bp.isTabletOrMobile && styles.infoSectionTabletOrMobile,
              bp.isMobile && styles.infoSectionMobile,
            ]}
          >
            <Text
              style={[
                styles.infoQuote,
                bp.isTabletOrMobile && styles.infoQuoteTabletOrMobile,
                bp.isMobile && styles.infoQuoteMobile,
              ]}
            >
              "Conocimiento, creatividad, eficiencia y sinergia para tu solución
              digital"
            </Text>
            <Text
              style={[
                styles.infoDescription,
                bp.isTabletOrMobile && styles.infoDescriptionTabletOrMobile,
                bp.isMobile && styles.infoDescriptionMobile,
              ]}
            >
              En NilO Solutions somos un equipo de profesores y estudiantes IT
              apasionados por la tecnología y mejora continua de los procesos
              digitales. Buscamos generar soluciones tecnológicas disruptivas,
              innovadoras y eficientes para nuestros clientes.
            </Text>
          </View>

          {/* Mission and Vision Container */}
          <View
            style={[
              styles.missionVisionContainer,
              // Desktop styles are implicitly applied by default styles
              bp.isTabletOrMobile &&
                styles.missionVisionContainerTabletOrMobile,
              bp.isMobile && styles.missionVisionContainerMobile,
            ]}
          >
            {/* Nuestra Misión Section */}
            <View
              style={[
                styles.infoSection,
                bp.isTabletOrMobile && styles.infoSectionTabletOrMobile,
                bp.isMobile && styles.infoSectionMobile,
              ]}
            >
              <View
                style={[
                  styles.infoHeader,
                  bp.isTabletOrMobile && styles.infoHeaderTabletOrMobile,
                  bp.isMobile && styles.infoHeaderMobile,
                ]}
              >
                <Text
                  style={[
                    styles.infoTitle,
                    bp.isTabletOrMobile && styles.infoTitleTabletOrMobile,
                    bp.isMobile && styles.infoTitleMobile,
                  ]}
                >
                  NUESTRA MISIÓN
                </Text>
                <View
                  style={[
                    styles.infoTitleUnderline,
                    bp.isTabletOrMobile &&
                      styles.infoTitleUnderlineTabletOrMobile,
                    bp.isMobile && styles.infoTitleUnderlineMobile,
                  ]}
                />
              </View>
              <Text
                style={[
                  styles.infoDescription,
                  bp.isTabletOrMobile && styles.infoDescriptionTabletOrMobile,
                  bp.isMobile && styles.infoDescriptionMobile,
                ]}
              >
                Ser el principal proveedor de soluciones tecnológicas
                innovadoras, con un enfoque en aplicaciones web y servicios de
                servidor que optimicen los procesos digitales de nuestros
                clientes. Nos dedicamos a desarrollar plataformas intuitivas,
                seguras y robustas que integren servicios, comunicación e
                información, facilitando de esta manera una experiencia digital
                completa y eficiente.
              </Text>
              <Text
                style={[
                  styles.infoDescription,
                  bp.isTabletOrMobile && styles.infoDescriptionTabletOrMobile,
                  bp.isMobile && styles.infoDescriptionMobile,
                ]}
              >
                A través de tecnologías de vanguardia, buscamos simplificar la
                interacción entre usuarios y empresas, ofreciendo herramientas
                que impulsen la productividad, seguridad, calidad de información
                y satisfacción en cada interacción digital, ágiles y eficientes
                para nuestros clientes.
              </Text>
            </View>

            {/* Nuestra Visión Section */}
            <View
              style={[
                styles.infoSection,
                bp.isTabletOrMobile && styles.infoSectionTabletOrMobile,
                bp.isMobile && styles.infoSectionMobile,
              ]}
            >
              <View
                style={[
                  styles.infoHeader,
                  bp.isTabletOrMobile && styles.infoHeaderTabletOrMobile,
                  bp.isMobile && styles.infoHeaderMobile,
                ]}
              >
                <Text
                  style={[
                    styles.infoTitle,
                    bp.isTabletOrMobile && styles.infoTitleTabletOrMobile,
                    bp.isMobile && styles.infoTitleMobile,
                  ]}
                >
                  NUESTRA VISIÓN
                </Text>
                <View
                  style={[
                    styles.infoTitleUnderline,
                    // Desktop styles are implicitly applied by default styles
                    bp.isTabletOrMobile &&
                      styles.infoTitleUnderlineTabletOrMobile,
                    bp.isMobile && styles.infoTitleUnderlineMobile,
                  ]}
                />
              </View>
              <Text
                style={[
                  styles.infoDescription,
                  bp.isTabletOrMobile && styles.infoDescriptionTabletOrMobile,
                  bp.isMobile && styles.infoDescriptionMobile,
                ]}
              >
                Convertirnos en el socio tecnológico de referencia a nivel
                global para las empresas que buscan obtener, expandir y mejorar
                sus procesos y presencia digital. Nos proyectamos como una
                plataforma integral, alineada con las últimas tendencias
                tecnológicas, amigables con el medio ambiente y brindando
                soluciones escalables que se anticipen a las necesidades de un
                mundo digital en constante evolución.
              </Text>
              <Text
                style={[
                  styles.infoDescription,
                  bp.isTabletOrMobile && styles.infoDescriptionTabletOrMobile,
                  bp.isMobile && styles.infoDescriptionMobile,
                ]}
              >
                Aspiramos a incorporar inteligencia artificial, automatización y
                personalización avanzada en nuestras soluciones, proporcionando
                experiencias digitales de primer nivel que potencien el éxito y
                crecimiento de nuestros clientes.
              </Text>
            </View>
          </View>
        </View>

        {/* Team Section Divider */}
        <View
          style={[
            styles.teamDivider,
            bp.isTabletOrMobile && styles.teamDividerTabletOrMobile,
            bp.isMobile && styles.teamDividerMobile,
            { display: 'none' }
          ]}
        >
          <View style={styles.dividerLine} />
          <Text
            style={[
              styles.dividerText,
              bp.isTabletOrMobile && styles.dividerTextTabletOrMobile,
              bp.isMobile && styles.dividerTextMobile,
            ]}
          >
            NUESTRO EQUIPO
          </Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Team Carousel */}
        {/* <View style={[
          styles.carouselContainer,
          bp.isMobile && styles.carouselContainerMobile,
        ]}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[
              styles.carouselContent,
              bp.isMobile && styles.carouselContentMobile,
            ]}
            style={styles.carouselScrollView}
          >
            {/* Duplicamos los miembros para efecto infinito */}
            {/* {[...teamMembers, ...teamMembers].map((member, index) => (
              <View 
                key={`${member.id}-${index}`}
                style={[
                  styles.devCard,
                  // Aplicamos alturas asimétricas
                  index % 3 === 0 && styles.devCardTall,
                  index % 3 === 1 && styles.devCardMedium,
                  index % 3 === 2 && styles.devCardShort,
                  bp.isMobile && styles.devCardMobile,
                ]}
              >
                <View style={styles.devCardContent}>
                  <Text 
                    style={[
                      styles.devName,
                      bp.isMobile && styles.devNameMobile,
                    ]}
                  >
                    {member.name}
                  </Text>
                  <Text 
                    style={[
                      styles.devRole,
                      bp.isMobile && styles.devRoleMobile,
                    ]}
                  >
                    Web Developer
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View> */}
      </View>
    </View>
  );
};

/* --------------------- BREAKPOINT HOOK ------------------------ */
const useBreakpoint = () => {
  const { width } = useWindowDimensions();
  return {
    isDesktop: width >= 1024, // Explicitly defined
    isTabletOrMobile: width < 1024,
    isMobile: width < 768,
  };
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    paddingVertical: 80,
    alignItems: "center",
  },
  contentWrapper: {
    width: "80%",
    maxWidth: 1200,
    paddingHorizontal: 20,
  },
  contentWrapperTabletOrMobile: {
    width: "85%",
    paddingHorizontal: 16,
  },
  contentWrapperMobile: {
    width: "90%",
    paddingHorizontal: 12,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 60,
    paddingHorizontal: 20,
  },
  titleContainerTabletOrMobile: {
    marginBottom: 50,
    paddingHorizontal: 16,
  },
  titleContainerMobile: {
    marginBottom: 40,
    paddingHorizontal: 8,
  },
  titleDecorationLeft: {
    width: 50,
    height: 3,
    backgroundColor: "#FF6600",
    marginRight: 25,
    borderRadius: 2,
  },
  titleDecorationTabletOrMobile: {
    width: 40,
    height: 2,
    marginRight: 20,
  },
  titleDecorationMobile: {
    width: 30,
    height: 2,
    marginRight: 15,
  },
  titleDecorationRight: {
    width: 50,
    height: 3,
    backgroundColor: "#FF6600",
    marginLeft: 25,
    borderRadius: 2,
  },
  titleWrapper: {
    alignItems: "center",
  },
  sectionSubtitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#FF6600",
    letterSpacing: 3,
    marginBottom: 12,
    textTransform: "uppercase",
  },
  sectionSubtitleTabletOrMobile: {
    fontSize: 12,
    letterSpacing: 2,
    marginBottom: 10,
  },
  sectionSubtitleMobile: {
    fontSize: 10,
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 40,
    fontWeight: "800",
    color: "#fff",
    textAlign: "center",
    letterSpacing: 0.5,
    lineHeight: 42,
  },
  sectionTitleTabletOrMobile: {
    fontSize: 32,
    lineHeight: 36,
  },
  sectionTitleMobile: {
    fontSize: 24,
    lineHeight: 28,
  },
  titleAccent: {
    color: "#FF6600",
    fontStyle: "italic",
  },

  // Info Sections Styles
  infoSectionsContainer: {
    marginBottom: 80,
  },
  infoSectionsContainerTabletOrMobile: {
    marginBottom: 60,
  },
  infoSectionsContainerMobile: {
    marginBottom: 50,
  },
  infoSection: {
    marginBottom: 50,
    paddingHorizontal: 20,
  },
  infoSectionTabletOrMobile: {
    marginBottom: 40,
    paddingHorizontal: 16,
  },
  infoSectionMobile: {
    marginBottom: 30,
    paddingHorizontal: 12,
  },
  infoHeader: {
    alignItems: "center",
    marginBottom: 25,
  },
  infoHeaderTabletOrMobile: {
    marginBottom: 20,
  },
  infoHeaderMobile: {
    marginBottom: 15,
  },
  infoTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: 2,
    marginBottom: 8,
    textAlign: "center",
  },
  infoTitleTabletOrMobile: {
    fontSize: 20,
    letterSpacing: 1.5,
    marginBottom: 7,
  },
  infoTitleMobile: {
    fontSize: 18,
    letterSpacing: 1,
    marginBottom: 6,
  },
  infoTitleUnderline: {
    width: 60,
    height: 3,
    backgroundColor: "#FF6600",
    borderRadius: 2,
  },
  infoTitleUnderlineTabletOrMobile: {
    width: 50,
    height: 2,
  },
  infoTitleUnderlineMobile: {
    width: 40,
    height: 2,
  },
  infoQuote: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FF6600",
    textAlign: "center",
    fontStyle: "italic",
    marginBottom: 25,
    lineHeight: 26,
    paddingHorizontal: 20,
  },
  infoQuoteTabletOrMobile: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  infoQuoteMobile: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 18,
    paddingHorizontal: 12,
  },
  infoDescription: {
    fontSize: 16,
    color: "#ccc",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 20,
    paddingHorizontal: 10,
    letterSpacing: 0.3,
  },
  infoDescriptionTabletOrMobile: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 18,
    paddingHorizontal: 8,
  },
  infoDescriptionMobile: {
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 15,
    paddingHorizontal: 6,
  },

  // Mission and Vision Container
  missionVisionContainer: {
    backgroundColor: "#111",
    borderRadius: 20,
    padding: 30,
    marginTop: 40,
    borderWidth: 1,
    borderColor: "#333",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  missionVisionContainerTabletOrMobile: {
    borderRadius: 16,
    padding: 25,
    marginTop: 30,
  },
  missionVisionContainerMobile: {
    borderRadius: 12,
    padding: 20,
    marginTop: 25,
  },

  // Team Divider
  teamDivider: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
    paddingHorizontal: 20,
  },
  teamDividerTabletOrMobile: {
    marginBottom: 40,
    paddingHorizontal: 16,
  },
  teamDividerMobile: {
    marginBottom: 30,
    paddingHorizontal: 12,
  },
  dividerLine: {
    flex: 1,
    height: 2,
    backgroundColor: "#333",
    marginHorizontal: 20,
  },
  dividerText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FF6600",
    letterSpacing: 2,
    paddingHorizontal: 20,
  },
  dividerTextTabletOrMobile: {
    fontSize: 15,
    letterSpacing: 1.5,
    paddingHorizontal: 16,
  },
  dividerTextMobile: {
    fontSize: 13,
    letterSpacing: 1,
    paddingHorizontal: 12,
  },

  // Carousel Styles
  carouselContainer: {
    paddingVertical: 30,
    overflow: "hidden",
  },
  carouselContainerMobile: {
    paddingVertical: 20,
  },
  
  carouselScrollView: {
    paddingVertical: 10,
  },
  
  carouselContent: {
    paddingHorizontal: 20,
    alignItems: "flex-end",
    gap: 20,
  },
  carouselContentMobile: {
    paddingHorizontal: 15,
    gap: 15,
    alignItems: "center",
  },
  
  // Developer Cards - Asimétricas
  devCard: {
    backgroundColor: "#1a1a1a",
    borderRadius: 16,
    padding: 20,
    width: 200,
    borderWidth: 1,
    borderColor: "#333",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    marginRight: 15,
    // @ts-ignore - transition for web
    transition: "all 0.3s ease",
  },
  
  // Alturas asimétricas
  devCardTall: {
    minHeight: 180,
    marginTop: 0,
  },
  devCardMedium: {
    minHeight: 160,
    marginTop: 20,
  },
  devCardShort: {
    minHeight: 140,
    marginTop: 40,
  },
  
  devCardMobile: {
    width: 160,
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
    minHeight: 120,
    marginTop: 0,
  },
  
  devCardContent: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  
  devName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  devNameMobile: {
    fontSize: 14,
    marginBottom: 6,
  },
  
  devRole: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FF6600",
    textAlign: "center",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  devRoleMobile: {
    fontSize: 10,
  },

  // Team Content
  mainContent: {
    flexDirection: "row",
    gap: 40,
    alignItems: "flex-start",
    minHeight: 450,
  },
  mainContentTabletOrMobile: {
    gap: 30,
    minHeight: 400,
  },
  mainContentMobile: {
    flexDirection: "column",
    gap: 25,
    alignItems: "center",
    minHeight: "auto",
  },
  filterContainer: {
    flex: 0,
    width: 220,
    alignSelf: "flex-start",
    paddingRight: 20,
    backgroundColor: "#111",
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: "#333",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  filterContainerTabletOrMobile: {
    width: 200,
    paddingRight: 15,
    padding: 16,
  },
  filterContainerMobile: {
    flex: 0,
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    paddingRight: 0,
    marginBottom: 20,
    padding: 16,
    backgroundColor: "#111",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#333",
  },
  
  filterTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 8,
    letterSpacing: 1,
  },
  filterTitleTabletOrMobile: {
    fontSize: 15,
    marginBottom: 6,
  },
  filterTitleMobile: {
    fontSize: 14,
    marginBottom: 6,
    textAlign: "center",
  },
  
  filterTitleUnderline: {
    width: 40,
    height: 2,
    backgroundColor: "#FF6600",
    marginBottom: 16,
    borderRadius: 1,
  },
  filterTitleUnderlineTabletOrMobile: {
    width: 35,
    marginBottom: 14,
  },
  filterTitleUnderlineMobile: {
    width: 30,
    marginBottom: 12,
    alignSelf: "center",
  },
  
  filterButtons: {
    gap: 8,
  },
  // Professional Team Styles
  professionalTeamContainer: {
    flex: 2,
    paddingLeft: 20,
  },
  professionalTeamContainerTabletOrMobile: {
    paddingLeft: 15,
  },
  professionalTeamContainerMobile: {
    flex: 0,
    width: "100%",
    paddingLeft: 0,
    marginTop: 20,
  },
  
  teamGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
    justifyContent: "space-between",
    alignItems: "stretch",
  },
  teamGridMobile: {
    flexDirection: "column",
    alignItems: "center",
    gap: 25,
    justifyContent: "center",
  },
  
  professionalCard: {
    backgroundColor: "#1a1a1a",
    borderRadius: 16,
    padding: 24,
    width: "48%",
    minWidth: 280,
    borderWidth: 1,
    borderColor: "#333",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    position: "relative",
    overflow: "hidden",
    // @ts-ignore - transition for web compatibility
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    cursor: "pointer",
  },
  
  cardBackgroundGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "30%",
    backgroundColor: "rgba(255, 102, 0, 0.05)",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  professionalCardTabletOrMobile: {
    width: "47%",
    minWidth: 250,
    padding: 20,
    borderRadius: 14,
  },
  professionalCardMobile: {
    width: "100%",
    maxWidth: 350,
    padding: 20,
    borderRadius: 12,
  },
  
  cardHeader: {
    alignItems: "center",
    marginBottom: 20,
  },
  
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#FF6600",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#FF6600",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  avatarPlaceholderTabletOrMobile: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  avatarPlaceholderMobile: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  
  avatarInitials: {
    fontSize: 28,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: 1,
  },
  avatarInitialsTabletOrMobile: {
    fontSize: 24,
  },
  avatarInitialsMobile: {
    fontSize: 20,
  },
  
  cardContent: {
    alignItems: "center",
    marginBottom: 20,
  },
  cardContentTabletOrMobile: {
    marginBottom: 18,
  },
  cardContentMobile: {
    marginBottom: 16,
  },
  
  memberName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  memberNameTabletOrMobile: {
    fontSize: 18,
    marginBottom: 6,
  },
  memberNameMobile: {
    fontSize: 16,
    marginBottom: 6,
  },
  
  memberRole: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FF6600",
    textAlign: "center",
    marginBottom: 12,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  memberRoleTabletOrMobile: {
    fontSize: 13,
    marginBottom: 10,
  },
  memberRoleMobile: {
    fontSize: 12,
    marginBottom: 10,
  },
  
  memberQuote: {
    fontSize: 13,
    color: "#ccc",
    textAlign: "center",
    lineHeight: 18,
    fontStyle: "italic",
    paddingHorizontal: 8,
  },
  memberQuoteTabletOrMobile: {
    fontSize: 12,
    lineHeight: 16,
    paddingHorizontal: 6,
  },
  memberQuoteMobile: {
    fontSize: 11,
    lineHeight: 15,
    paddingHorizontal: 4,
  },
  
  cardFooter: {
    alignItems: "center",
  },
  
  specializationTag: {
    backgroundColor: "#333",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#FF6600",
  },
  specializationTagTabletOrMobile: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 18,
  },
  specializationTagMobile: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
  },
  
  specializationText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#FF6600",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  specializationTextTabletOrMobile: {
    fontSize: 9,
  },
  specializationTextMobile: {
    fontSize: 8,
  },
});

export default TeamSection;
