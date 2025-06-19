"use client"

import { View, Text, StyleSheet, Dimensions } from "react-native"
import { useState } from "react"
import ServiceCard from "@/components/ui/ServiceCard"

const { width } = Dimensions.get("window")

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

  const handleServicePress = (service: Service) => {
    if (onServicePress) {
      onServicePress(service)
    }
    console.log(`Navegando a: ${service.route}`)
  }

  const cardWidth = Math.floor((width - 80) / 6)

  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        <View style={styles.titleContainer}>
          <View style={styles.titleDecorationLeft} />
          <View style={styles.titleWrapper}>
            <Text style={styles.sectionSubtitle}>Lo que hacemos</Text>
            <Text style={styles.sectionTitle}>
              Nuestros <Text style={styles.titleAccent}>Servicios</Text>
            </Text>
          </View>
          <View style={styles.titleDecorationRight} />
        </View>

        <View style={styles.servicesGrid}>
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
            />
          ))}
        </View>
      </View>
    </View>
  )
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
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 60,
    paddingHorizontal: 20,
  },
  titleDecorationLeft: {
    width: 50,
    height: 3,
    backgroundColor: "#ff6b35",
    marginRight: 25,
    borderRadius: 2,
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
  sectionTitle: {
    fontSize: 36,
    fontWeight: "800",
    color: "#fff",
    textAlign: "center",
    letterSpacing: 0.5,
    lineHeight: 42,
  },
  titleAccent: {
    color: "#ff6b35",
    fontStyle: "italic",
  },
  servicesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 20,
    marginBottom: 50,
  },
})

export default ServicesSection
