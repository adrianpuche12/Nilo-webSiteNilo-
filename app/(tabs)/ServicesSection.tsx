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
  isView?: boolean; // Indica si se está viendo la sección o no
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

  // Valores animados para cada card
  const cardAnimations = services.map(() => ({
    opacity: useSharedValue(0),
    translateX: useSharedValue(-100), // Empiezan 100px a la izquierda
  }));

  const handleServicePress = (service: Service) => {
    if (onServicePress) {
      onServicePress(service);
    }
    console.log(`Navegando a: ${service.route}`);
  };

  // Efecto para animar las cards cuando se ve la sección
  useEffect(() => {
    if (isView) {
      // Animar cada card con delay escalonado
      cardAnimations.forEach((animation, index) => {
        const delay = index * 150; // 150ms de delay entre cada card

        // Animación de opacity
        animation.opacity.value = withDelay(
          delay,
          withTiming(1, { duration: 600 })
        );

        // Animación de posición desde la izquierda
        animation.translateX.value = withDelay(
          delay,
          withSpring(0, {
            damping: 20,
            stiffness: 100,
          })
        );
      });
    } else {
      // Resetear animaciones cuando sale de vista
      cardAnimations.forEach((animation) => {
        animation.opacity.value = withTiming(0, { duration: 300 });
        animation.translateX.value = withTiming(-100, { duration: 300 });
      });
    }
  }, [isView]);

  // estilo animado para cada card
  const getAnimatedStyle = (index: number) => {
    return useAnimatedStyle(() => ({
      opacity: cardAnimations[index].opacity.value,
      transform: [{ translateX: cardAnimations[index].translateX.value }],
    }));
  };

  // Responsive columns and card sizing
  const getColumnsAndWidth = () => {
    let columns = 6; // Desktop default
    let gap = 20;
    let horizontalPadding = 40; // Padding total de la sección (20px a cada lado)
   if (bp.isMobile) {
      columns = 2;
      gap = 15;
      horizontalPadding = 28; // 14px a cada lado
    } else if (bp.isTabletOrMobile) {
      columns = 3;
      gap = 18;
      horizontalPadding = 32; // 16px a cada lado
    }
    else if (bp.isDesktop) {
      columns = 4; 
      gap = 20;
      horizontalPadding = 40; // 20px a cada lado
    } else if (bp.isLargeDesktop) {
      columns = 5; 
      gap = 24;
      horizontalPadding = 60; // 30px a cada lado
    }

    // Ajustar el ancho disponible restando el padding del contenedor principal y los gaps entre tarjetas
    const availableWidth = width - horizontalPadding;
    const cardWidth = (availableWidth - gap * (columns - 1)) / columns;

    return { columns, cardWidth, gap };
  };

  const { cardWidth, gap } = getColumnsAndWidth();

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
              Lo que hacemos
            </Text>
            <Text
              style={[
                styles.sectionTitle,
                bp.isTabletOrMobile && styles.sectionTitleTabletOrMobile,
                bp.isMobile && styles.sectionTitleMobile,
              ]}
            >
              Nuestros <Text style={styles.titleAccent}>Servicios</Text>
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

        {/* Services Grid */}
        <View
          style={[
            styles.servicesGrid,
            { gap },
            bp.isTabletOrMobile && styles.servicesGridTabletOrMobile,
            bp.isMobile && styles.servicesGridMobile,
          ]}
        >
          {services.map((service, index) => (
            <Animated.View
              key={service.id}
              style={[getAnimatedStyle(index), { width: cardWidth }]}
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

// Breakpoint hook
const useBreakpoint = () => {
  const { width } = useWindowDimensions();
  return {
    isLargeDesktop: width >= 1440,
    isDesktop: width >= 1024 && width < 1440,
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
    width: "100%",
    maxWidth: 1200,
    paddingHorizontal: 20,
  },
  contentWrapperTabletOrMobile: {
    paddingHorizontal: 16,
  },
  contentWrapperMobile: {
    paddingHorizontal: 14,
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
    backgroundColor: "#ff6b35",
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
    backgroundColor: "#ff6b35",
    marginLeft: 25,
    borderRadius: 2,
  },
  titleWrapper: {
    alignItems: "center",
  },
  sectionSubtitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#ff6b35",
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
    color: "#ff6b35",
    fontStyle: "italic",
  },
  servicesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 50,
  },
  servicesGridTabletOrMobile: {
    marginBottom: 40,
  },
  servicesGridMobile: {
    marginBottom: 30,
    justifyContent: "center",
  },
});

export default ServicesSection;
