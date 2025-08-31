"use client";

import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import { useState, useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSpring,
} from "react-native-reanimated";
import ServiceCard from "@/components/ui/ServiceCard";
import { useSequentialAnimation, useFadeInAnimation } from "@/components/animations/ModernAnimations";

interface Service {
  id: number;
  title: string;
  icon: string;
  description: string;
  route: string;
}

interface ServicesSectionProps {
  services?: Service[];
  onServicePress?: (service: Service) => void;
  isView?: boolean;
}

const defaultServices: Service[] = [
  {
    id: 1,
    title: "UI/UX Design",
    icon: "🎨",
    description:
      "Creamos experiencias digitales intuitivas y atractivas que conectan con tus usuarios de manera efectiva.",
    route: "/servicios/ui-ux-design",
  },
  {
    id: 2,
    title: "Desarrollo Web",
    icon: "💻",
    description:
      "Desarrollamos sitios web modernos, responsivos y optimizados para el mejor rendimiento y experiencia.",
    route: "/servicios/desarrollo-web",
  },
  {
    id: 3,
    title: "Apps Móviles",
    icon: "📱",
    description:
      "Creamos aplicaciones móviles nativas y multiplataforma con las últimas tecnologías del mercado.",
    route: "/servicios/apps-moviles",
  },
  {
    id: 4,
    title: "E-commerce",
    icon: "🛒",
    description:
      "Desarrollamos tiendas online completas con sistemas de pago seguros y gestión avanzada.",
    route: "/servicios/ecommerce",
  },
  {
    id: 5,
    title: "Consultoría Tech",
    icon: "💡",
    description:
      "Asesoramos en la transformación digital de tu empresa con estrategias tecnológicas efectivas.",
    route: "/servicios/consultoria",
  },
  {
    id: 6,
    title: "Mantenimiento",
    icon: "🔧",
    description:
      "Brindamos soporte técnico continuo y mantenimiento para garantizar el óptimo funcionamiento.",
    route: "/servicios/mantenimiento",
  },
];

const ServicesSection = ({
  services = defaultServices,
  onServicePress,
  isView = false,
}: ServicesSectionProps) => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const { width } = useWindowDimensions();
  const bp = useBreakpoint();

  // Usar las nuevas animaciones modernas
  const titleAnimation = useFadeInAnimation(0, 800);
  const cardAnimations = useSequentialAnimation(services, isView ? 200 : 0);

  const handleServicePress = (service: Service) => {
    if (onServicePress) {
      onServicePress(service);
    }
    console.log(`Navegando a: ${service.route}`);
  };

  const getColumnsAndWidth = () => {
    let cardWidth;
    let gap = 30;
    
    if (bp.isMobile) {
      cardWidth = Math.min(width - 40, 400); // Card centrada en mobile
    } else {
      // Desktop/Tablet: 2 cards por fila
      const containerPadding = 40; // ContentWrapper padding
      const availableWidth = Math.min(width - (containerPadding * 2), 1400); // Max container width
      cardWidth = Math.floor((availableWidth - gap) / 2); // 2 columnas exactas
    }

    return { cardWidth, gap };
  };

  const { cardWidth, gap } = getColumnsAndWidth();

  return (
    <View style={styles.container}>
      <View style={styles.parallaxBackground} />
      <View style={styles.floatingShapes}>
        <View style={[styles.floatingShape, styles.shape1]} />
        <View style={[styles.floatingShape, styles.shape2]} />
        <View style={[styles.floatingShape, styles.shape3]} />
      </View>
      
      <View
        style={[
          styles.contentWrapper,
          bp.isTablet && styles.contentWrapperTablet,
          bp.isMobile && styles.contentWrapperMobile,
        ]}
      >
        <View
          style={[
            styles.titleContainer,
            bp.isTablet && styles.titleContainerTablet,
            bp.isMobile && styles.titleContainerMobile,
          ]}
        >
          <View style={styles.headerSection}>
            <Text
              style={[
                styles.sectionTitle,
                bp.isTablet && styles.sectionTitleTablet,
                bp.isMobile && styles.sectionTitleMobile,
              ]}
            >
              Nuestros <Text style={styles.titleAccent}>Servicios</Text>
            </Text>
            <Text
              style={[
                styles.sectionDescription,
                bp.isTablet && styles.sectionDescriptionTablet,
                bp.isMobile && styles.sectionDescriptionMobile,
              ]}
            >
              Transformamos ideas en experiencias digitales extraordinarias que impulsan tu negocio hacia el futuro
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.servicesGrid,
            { gap: bp.isMobile ? 0 : 30 },
            bp.isTablet && styles.servicesGridTablet,
            bp.isMobile && styles.servicesGridMobile,
          ]}
        >
          {services.map((service, index) => (
            <Animated.View
              key={service.id}
              style={[
                cardAnimations[index], 
                { 
                  width: cardWidth,
                  marginBottom: 30,
                  ...(bp.isMobile && { 
                    alignSelf: 'center',
                    marginHorizontal: 'auto'
                  }),
                  ...(!bp.isMobile && {
                    flexBasis: `${Math.floor((cardWidth / (Math.min(width - 80, 1400))) * 100)}%`,
                    maxWidth: cardWidth
                  })
                }
              ]}
            >
              <ServiceCard
                service={service}
                width={cardWidth}
                hovered={hoveredCard === service.id}
                onPress={() => handleServicePress(service)}
                onHoverIn={() => setHoveredCard(service.id)}
                onHoverOut={() => setHoveredCard(null)}
                breakpoint={bp}
              />
            </Animated.View>
          ))}
        </View>
      </View>
    </View>
  );
};

// ✅ Nuevo Hook con los breakpoints actualizados
const useBreakpoint = () => {
  const { width } = useWindowDimensions();
  return {
    isMobile: width < 768,
    isTablet: width >= 768 && width < 1024,
    isDesktop: width >= 1024 && width < 1440,
    isLargeDesktop: width >= 1440,
  };
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    paddingVertical: 80,
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    marginTop: 27,
  },
  parallaxBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "radial-gradient(circle at 20% 80%, rgba(255, 102, 0, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 102, 0, 0.12) 0%, transparent 50%), radial-gradient(circle at 40% 40%, rgba(255, 102, 0, 0.06) 0%, transparent 50%)",
  },
  floatingShapes: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    overflow: "hidden",
    zIndex: 1,
  },
  floatingShape: {
    position: "absolute",
    backgroundColor: "rgba(255, 102, 0, 0.1)",
    borderRadius: 50,
  },
  shape1: {
    width: 80,
    height: 80,
    top: "20%",
    left: "10%",
  },
  shape2: {
    width: 120,
    height: 120,
    top: "60%",
    right: "15%",
  },
  shape3: {
    width: 60,
    height: 60,
    top: "80%",
    left: "20%",
  },
  contentWrapper: {
    width: "100%",
    maxWidth: 1400,
    paddingHorizontal: 20,
    position: "relative",
    zIndex: 2,
  },
  contentWrapperTablet: {
    paddingHorizontal: 16,
  },
  contentWrapperMobile: {
    paddingHorizontal: 14,
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 80,
    paddingHorizontal: 20,
  },
  headerSection: {
    alignItems: "center",
    textAlign: "center",
  },
  titleContainerTablet: {
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
  titleDecorationRight: {
    width: 50,
    height: 3,
    backgroundColor: "#FF6600",
    marginLeft: 25,
    borderRadius: 2,
  },
  titleDecorationTablet: {
    width: 40,
    height: 2,
    marginHorizontal: 20,
  },
  titleDecorationMobile: {
    width: 30,
    height: 2,
    marginHorizontal: 15,
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
  sectionSubtitleTablet: {
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
    fontSize: 64,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
    letterSpacing: 0.5,
    lineHeight: 68,
    marginBottom: 20,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 20,
  },
  sectionTitleTablet: {
    fontSize: 48,
    lineHeight: 52,
  },
  sectionTitleMobile: {
    fontSize: 32,
    lineHeight: 36,
  },
  sectionDescription: {
    fontSize: 20,
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
    lineHeight: 28,
    maxWidth: 600,
    marginTop: 10,
  },
  sectionDescriptionTablet: {
    fontSize: 18,
    lineHeight: 24,
  },
  sectionDescriptionMobile: {
    fontSize: 16,
    lineHeight: 22,
  },
  titleAccent: {
    color: "#FF6600",
    fontStyle: "italic",
  },
  servicesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 50,
    width: "100%",
    alignItems: "stretch",
  },
  servicesGridTablet: {
    marginBottom: 40,
  },
  servicesGridMobile: {
    marginBottom: 30,
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
});

export default ServicesSection;
