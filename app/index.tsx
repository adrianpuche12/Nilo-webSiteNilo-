import Contact from "@/app/ContactSection";
import HomePage from "@/app/homePage";
import Services from "@/app/ServicesSection";
// import Team from "@/app/TeamSection";
import Footer from "@/components/Footer";
import N8nProjectsSection from "@/app/N8nProjectsSection";
import ExperienceSection from "@/app/ExperienceSection";
import Header from "@/components/Header";
import ClientTestimonials from "@/components/ui/ClientTestimonials";

import * as SplashScreen from "expo-splash-screen";
import { useRef, useState } from "react";
import { ScrollView, View } from "react-native";
import "react-native-reanimated";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

SplashScreen.preventAutoHideAsync();

export default function Home() {
  const scrollViewRef = useRef<ScrollView>(null);
  const [sectionPositions, setSectionPositions] = useState<Record<string, number>>({});

  const [currentSection, setCurrentSection] = useState<string>("inicio");
  const [serviceIsViewed, setServiceIsViewed] = useState<boolean>(false);

  // 🔹 Valores animados para cada sección
  const serviciosOpacity = useSharedValue(0);
  const serviciosTranslateY = useSharedValue(50);

  const proyectosOpacity = useSharedValue(0);
  const proyectosTranslateY = useSharedValue(50);

  const experienciaOpacity = useSharedValue(0);
  const experienciaTranslateY = useSharedValue(50);

  const quienesOpacity = useSharedValue(0);
  const quienesTranslateY = useSharedValue(50);

  const contactoOpacity = useSharedValue(0);
  const contactoTranslateY = useSharedValue(50);

  // Scroll value para efectos parallax
  const scrollY = useSharedValue(100);

  // 🔹 Función para animar secciones
  const animateSection = (sectionId: string, isVisible: boolean) => {
    const duration = 800;
    const springConfig = { damping: 150, stiffness: 100 };

    switch (sectionId) {
      case "servicios":
        serviciosOpacity.value = withTiming(isVisible ? 1 : 0, { duration });
        serviciosTranslateY.value = withSpring(isVisible ? 0 : 50, springConfig);
        break;
      case "proyectos":
        proyectosOpacity.value = withTiming(isVisible ? 1 : 0, { duration });
        proyectosTranslateY.value = withSpring(isVisible ? 0 : 50, springConfig);
        break;
      case "experiencia":
        experienciaOpacity.value = withTiming(isVisible ? 1 : 0, { duration });
        experienciaTranslateY.value = withSpring(isVisible ? 0 : 50, springConfig);
        break;
      case "quienes":
        quienesOpacity.value = withTiming(isVisible ? 1 : 0, { duration });
        quienesTranslateY.value = withSpring(isVisible ? 0 : 50, springConfig);
        break;
      case "contacto":
        contactoOpacity.value = withTiming(isVisible ? 1 : 0, { duration });
        contactoTranslateY.value = withSpring(isVisible ? 0 : 50, springConfig);
        break;
    }
  };

  // 🔹 Detectar scroll y visibilidad de secciones
  const handleScroll = (event: any) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;
    scrollY.value = currentScrollY;

    const offset = 200;
    const sections = ["inicio", "servicios", "proyectos", "experiencia", "quienes", "contacto"];
    let newCurrentSection = "inicio";

    sections.forEach((section) => {
      if (sectionPositions[section] !== undefined) {
        const sectionTop = sectionPositions[section];
        const sectionVisible = currentScrollY + 200 >= sectionTop - 500;

        if (section === "servicios") setServiceIsViewed(sectionVisible);

        animateSection(section, sectionVisible);

        if (currentScrollY + offset >= sectionTop) newCurrentSection = section;
      }
    });

    if (newCurrentSection !== currentSection) setCurrentSection(newCurrentSection);
  };

  // 🔹 Estilos animados para cada sección
  const serviciosAnimatedStyle = useAnimatedStyle(() => ({
    opacity: serviciosOpacity.value,
    transform: [
      { translateY: serviciosTranslateY.value },
      { scale: interpolate(serviciosOpacity.value, [0.3, 1], [0.95, 1]) },
    ],
  }));

  const proyectosAnimatedStyle = useAnimatedStyle(() => ({
    opacity: proyectosOpacity.value,
    transform: [
      { translateY: proyectosTranslateY.value },
      { scale: interpolate(proyectosOpacity.value, [0.3, 1], [0.95, 1]) },
    ],
  }));

  const experienciaAnimatedStyle = useAnimatedStyle(() => ({
    opacity: experienciaOpacity.value,
    transform: [
      { translateY: experienciaTranslateY.value },
      { scale: interpolate(experienciaOpacity.value, [0.3, 1], [0.95, 1]) },
    ],
  }));

  const quienesAnimatedStyle = useAnimatedStyle(() => ({
    opacity: quienesOpacity.value,
    transform: [
      { translateY: quienesTranslateY.value },
      { scale: interpolate(quienesOpacity.value, [0.3, 1], [0.95, 1]) },
    ],
  }));

  const contactoAnimatedStyle = useAnimatedStyle(() => ({
    opacity: contactoOpacity.value,
    transform: [
      { translateY: contactoTranslateY.value },
      { scale: interpolate(contactoOpacity.value, [0.3, 1], [0.95, 1]) },
    ],
  }));

  // 🔹 Guardar posición de secciones
  const handleSectionLayout = (sectionId: string, event: any) => {
    const { y } = event.nativeEvent.layout;
    setSectionPositions((prev) => ({ ...prev, [sectionId]: y }));
  };

  // 🔹 Scroll manual a secciones
  const scrollToSection = (sectionId: string) => {
    if (scrollViewRef?.current && sectionPositions[sectionId] !== undefined) {
      scrollViewRef.current.scrollTo({
        y: sectionPositions[sectionId],
        animated: true,
      });
    }
  };

  // 🔹 Render principal
  return (
    <>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{ flexGrow: 1, backgroundColor: "#000000" }}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <Header scrollToSection={scrollToSection} isIndexPage={true} />

        <View onLayout={(event) => handleSectionLayout("inicio", event)}>
          <HomePage />
        </View>

        <Animated.View
          style={serviciosAnimatedStyle}
          onLayout={(event) => handleSectionLayout("servicios", event)}
        >
          <Services isView={serviceIsViewed} />
        </Animated.View>

        <Animated.View
          style={proyectosAnimatedStyle}
          onLayout={(event) => handleSectionLayout("proyectos", event)}
        >
          <N8nProjectsSection />
        </Animated.View>

        <Animated.View
          style={experienciaAnimatedStyle}
          onLayout={(event) => handleSectionLayout("experiencia", event)}
        >
          <ExperienceSection />
        </Animated.View>

        <Animated.View
          style={contactoAnimatedStyle}
          onLayout={(event) => handleSectionLayout("contacto", event)}
        >
          <Contact />
        </Animated.View>

        <Footer />
      </ScrollView>
    </>
  );
}
