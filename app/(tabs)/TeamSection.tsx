"use client"

import { View, Text, StyleSheet } from "react-native"
import { useState } from "react"
import { FilterButton } from "@/components/ui/AppButtons"
import TeamMemberCard from "@/components/ui/TeamCard"

interface TeamMember {
  id: number
  name: string
  role: string
  category: string
  quote: string
  image: string
}

interface TeamSectionProps {
  teamMembers?: TeamMember[]
  categories?: string[]
  title?: string
  subtitle?: string
}

const defaultTeamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Mateo Pellegrini",
    role: "CO-Founder & CEO",
    category: "CO-FOUNDER",
    quote: "Transformamos ideas en soluciones digitales innovadoras",
    image: "mateo.png",
  },
  {
    id: 2,
    name: "Ulises Pellegrini",
    role: "CO-Founder & CTO",
    category: "CO-FOUNDER",
    quote: "La tecnología es el puente hacia el futuro",
    image: "ulises.png",
  },
  {
    id: 3,
    name: "Carlos Rodríguez",
    role: "Senior Frontend Developer",
    category: "FRONTEND",
    quote: "Creando experiencias que conectan con los usuarios",
    image: "/placeholder.svg?height=120&width=120",
  },
  {
    id: 4,
    name: "Ana Martínez",
    role: "Frontend Developer",
    category: "FRONTEND",
    quote: "El diseño y la funcionalidad van de la mano",
    image: "/placeholder.svg?height=120&width=120",
  },
  {
    id: 5,
    name: "Luis Torres",
    role: "Backend Developer",
    category: "BACKEND",
    quote: "Construyendo la arquitectura del mañana",
    image: "/placeholder.svg?height=120&width=120",
  },
  {
    id: 6,
    name: "Sofia Herrera",
    role: "DevOps Engineer",
    category: "DEVOPS",
    quote: "Automatizando el camino hacia la excelencia",
    image: "/placeholder.svg?height=120&width=120",
  },
  {
    id: 7,
    name: "Diego Morales",
    role: "QA Tester",
    category: "TESTING",
    quote: "La calidad no es un accidente, es una elección",
    image: "/placeholder.svg?height=120&width=120",
  },
  {
    id: 8,
    name: "Valentina López",
    role: "UX/UI Designer",
    category: "UX/UI",
    quote: "Diseñando experiencias que inspiran",
    image: "/placeholder.svg?height=120&width=120",
  },
  {
    id: 9,
    name: "Roberto Silva",
    role: "Marketing Manager",
    category: "MARKETING",
    quote: "Conectando marcas con audiencias digitales",
    image: "/placeholder.svg?height=120&width=120",
  },
]

const defaultCategories = ["CO-FOUNDER", "FRONTEND", "BACKEND", "DEVOPS", "TESTING", "UX/UI", "MARKETING"]

const TeamSection = ({
  teamMembers = defaultTeamMembers,
  categories = defaultCategories,
  title = "Quiénes Somos",
  subtitle = "CONOCE A NUESTRO EQUIPO",
}: TeamSectionProps) => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0])

  const filteredMembers = teamMembers.filter((member) => member.category === selectedCategory)

  const getJustifyContent = () => {
    const memberCount = filteredMembers.length
    if (memberCount === 1) return "center"
    if (memberCount === 2) return "space-around"
    return "flex-start"
  }

  const handleMemberPress = (member: TeamMember) => {
    console.log("Member pressed:", member.name)
    
  }

  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        {/* Title Section */}
        <View style={styles.titleContainer}>
          <View style={styles.titleDecorationLeft} />
          <View style={styles.titleWrapper}>
            <Text style={styles.sectionSubtitle}>{subtitle}</Text>
            <Text style={styles.sectionTitle}>
              {title.split(" ").map((word, index) =>
                index === title.split(" ").length - 1 ? (
                  <Text key={index} style={styles.titleAccent}>
                    {word}
                  </Text>
                ) : (
                  <Text key={index}>{word} </Text>
                ),
              )}
            </Text>
          </View>
          <View style={styles.titleDecorationRight} />
        </View>

        {/* Company Information Sections */}
        <View style={styles.infoSectionsContainer}>
          {/* Quiénes Somos Section */}
          <View style={styles.infoSection}>
            <Text style={styles.infoQuote}>
              "Conocimiento, creatividad, eficiencia y sinergia para tu solución digital"
            </Text>
            <Text style={styles.infoDescription}>
              En NilO Solutions somos un equipo de profesores y estudiantes IT apasionados por la tecnología y mejora
              continua de los procesos digitales. Buscamos generar soluciones tecnológicas disruptivas, innovadoras y
              eficientes para nuestros clientes.
            </Text>
          </View>

          {/* Mission and Vision Container */}
          <View style={styles.missionVisionContainer}>
            {/* Nuestra Misión Section */}
            <View style={styles.infoSection}>
              <View style={styles.infoHeader}>
                <Text style={styles.infoTitle}>NUESTRA MISIÓN</Text>
                <View style={styles.infoTitleUnderline} />
              </View>
              <Text style={styles.infoDescription}>
                Ser el principal proveedor de soluciones tecnológicas innovadoras, con un enfoque en aplicaciones web y
                servicios de servidor que optimicen los procesos digitales de nuestros clientes. Nos dedicamos a
                desarrollar plataformas intuitivas, seguras y robustas que integren servicios, comunicación e
                información, facilitando de esta manera una experiencia digital completa y eficiente.
              </Text>
              <Text style={styles.infoDescription}>
                A través de tecnologías de vanguardia, buscamos simplificar la interacción entre usuarios y empresas,
                ofreciendo herramientas que impulsen la productividad, seguridad, calidad de información y satisfacción
                en cada interacción digital, ágiles y eficientes para nuestros clientes.
              </Text>
            </View>

            {/* Nuestra Visión Section */}
            <View style={styles.infoSection}>
              <View style={styles.infoHeader}>
                <Text style={styles.infoTitle}>NUESTRA VISIÓN</Text>
                <View style={styles.infoTitleUnderline} />
              </View>
              <Text style={styles.infoDescription}>
                Convertirnos en el socio tecnológico de referencia a nivel global para las empresas que buscan obtener,
                expandir y mejorar sus procesos y presencia digital. Nos proyectamos como una plataforma integral,
                alineada con las últimas tendencias tecnológicas, amigables con el medio ambiente y brindando soluciones
                escalables que se anticipen a las necesidades de un mundo digital en constante evolución.
              </Text>
              <Text style={styles.infoDescription}>
                Aspiramos a incorporar inteligencia artificial, automatización y personalización avanzada en nuestras
                soluciones, proporcionando experiencias digitales de primer nivel que potencien el éxito y crecimiento
                de nuestros clientes.
              </Text>
            </View>
          </View>
        </View>

        {/* Team Section Divider */}
        <View style={styles.teamDivider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>NUESTRO EQUIPO</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Main Content - Team Filters and Cards */}
        <View style={styles.mainContent}>
          {/* Filter Buttons */}
          <View style={styles.filterContainer}>
            {categories.map((category) => (
              <FilterButton
                key={category}
                title={category}
                isActive={selectedCategory === category}
                onPress={() => setSelectedCategory(category)}
              />
            ))}
          </View>

          {/* Team Members Cards */}
          <View style={[styles.membersContainer, { justifyContent: getJustifyContent() }]}>
            {filteredMembers.map((member) => (
              <TeamMemberCard key={member.id} member={member} onPress={handleMemberPress} />
            ))}
          </View>
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
    width: "80%",
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
    fontSize: 40,
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

  // Info Sections Styles
  infoSectionsContainer: {
    marginBottom: 80,
  },
  infoSection: {
    marginBottom: 50,
    paddingHorizontal: 20,
  },
  infoHeader: {
    alignItems: "center",
    marginBottom: 25,
  },
  infoTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: 2,
    marginBottom: 8,
    textAlign: "center",
  },
  infoTitleUnderline: {
    width: 60,
    height: 3,
    backgroundColor: "#ff6b35",
    borderRadius: 2,
  },
  infoQuote: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ff6b35",
    textAlign: "center",
    fontStyle: "italic",
    marginBottom: 25,
    lineHeight: 26,
    paddingHorizontal: 20,
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

  // Team Divider
  teamDivider: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
    paddingHorizontal: 20,
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
    color: "#ff6b35",
    letterSpacing: 2,
    paddingHorizontal: 20,
  },

  // Team Content
  mainContent: {
    flexDirection: "row",
    gap: 40,
    alignItems: "flex-start",
  },
  filterContainer: {
    flex: 1,
    maxWidth: 200,
  },
  membersContainer: {
    flex: 2,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
    justifyContent: "flex-start",
  },
})

export default TeamSection
