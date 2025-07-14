"use client"

import { View, Text, StyleSheet, useWindowDimensions } from "react-native"
import { useState } from "react"
import ServiceCard from "@/components/ui/ServiceCard"

interface Service {
  id: number
  title: string
  icon: string
  description: string
  route: string
}

interface ServicesSectionProps {
  services?: Service[]
  onServicePress?: (service: Service) => void
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
    description: "Creamos aplicaciones móviles nativas y multiplataforma con las últimas tecnologías del mercado.",
    route: "/servicios/apps-moviles",
  },
  {
    id: 4,
    title: "E-commerce",
    icon: "🛒",
    description: "Desarrollamos tiendas online completas con sistemas de pago seguros y gestión avanzada.",
    route: "/servicios/ecommerce",
  },
  {
    id: 5,
    title: "Consultoría Tech",
    icon: "💡",
    description: "Asesoramos en la transformación digital de tu empresa con estrategias tecnológicas efectivas.",
    route: "/servicios/consultoria",
  },
  {
    id: 6,
    title: "Mantenimiento",
    icon: "🔧",
    description: "Brindamos soporte técnico continuo y mantenimiento para garantizar el óptimo funcionamiento.",
    route: "/servicios/mantenimiento",
  },
]

const ServicesSection = ({ services = defaultServices, onServicePress }: ServicesSectionProps) => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const { width } = useWindowDimensions()
  const bp = useBreakpoint()

  const handleServicePress = (service: Service) => {
    if (onServicePress) {
      onServicePress(service)
    }
    console.log(`Navegando a: ${service.route}`)
  }

  
  const getColumnsAndWidth = () => {
    let columns = 6 
    let gap = 20

    if (bp.isMobile) {
      columns = 2
      gap = 15
    } else if (bp.isTabletOrMobile) {
      columns = 3
      gap = 18
    }

    const totalGap = gap * (columns - 1)
    const availableWidth = width - 80 // padding
    const cardWidth = Math.floor((availableWidth - totalGap) / columns)

    return { columns, cardWidth, gap }
  }

  const { cardWidth, gap } = getColumnsAndWidth()

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
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              width={cardWidth}
              height={cardWidth * 0.9}
              hovered={hoveredCard === service.id}
              onPress={() => handleServicePress(service)}
              onHoverIn={() => setHoveredCard(service.id)}
              onHoverOut={() => setHoveredCard(null)}
              breakpoint={bp}
            />
          ))}
        </View>
      </View>
    </View>
  )
}

// Breakpoint hook
const useBreakpoint = () => {
  const { width } = useWindowDimensions()
  return {
    isTabletOrMobile: width < 1024,
    isMobile: width < 768,
  }
}

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
})

export default ServicesSection
