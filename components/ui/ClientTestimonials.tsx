"use client"

import { View, Text, ScrollView, StyleSheet, Image, useWindowDimensions } from "react-native"
import { useRef, useEffect, useState } from "react"

interface Client {
  id: number
  logo: string
}

interface ClientTestimonialsProps {
  clients?: Client[]
}

const defaultClients: Client[] = [
  {
    id: 1,
    logo: "https://staffrockit.com/wp-content/uploads/2023/01/dtv-logo-blue.png",
  },
  {
    id: 2,
    logo: "https://staffrockit.com/wp-content/uploads/2024/01/ArcosDorados-min.jpg",
  },
  {
    id: 3,
    logo: "https://staffrockit.com/wp-content/uploads/2024/01/Prosegur_LOgo-min.jpg",
  },
  {
    id: 4,
    logo: "https://axiomait.com/wp-content/uploads/2024/02/image-57.png",
  },
  {
    id: 5,
    logo: "https://axiomait.com/wp-content/uploads/2024/02/image-54.png",
  },
  {
    id: 6,
    logo: "https://axiomait.com/wp-content/uploads/2024/02/image-77.png",
  },
]

const ClientTestimonials = ({ clients = defaultClients }: ClientTestimonialsProps) => {
  const scrollViewRef = useRef<ScrollView>(null)
  const [scrollPosition, setScrollPosition] = useState(0)
  const bp = useBreakpoint()

  
  const getLogoWidth = () => {
    let baseWidth = 170
    let margin = 30

    if (bp.isMobile) {
      baseWidth = 140
      margin = 20
    } else if (bp.isTabletOrMobile) {
      baseWidth = 155
      margin = 25
    }

    return baseWidth + margin
  }

  const logoWidth = getLogoWidth()
  const totalWidth = clients.length * logoWidth

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollPosition((prevPosition) => {
        const newPosition = prevPosition + 1

        if (newPosition >= totalWidth) {
          if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ x: 0, animated: false })
          }
          return 0
        }

        if (scrollViewRef.current) {
          scrollViewRef.current.scrollTo({ x: newPosition, animated: false })
        }

        return newPosition
      })
    }, 16)

    return () => clearInterval(interval)
  }, [totalWidth])

  const infiniteClients = [...clients, ...clients, ...clients]

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.contentWrapper,
          bp.isTabletOrMobile && styles.contentWrapperTabletOrMobile,
          bp.isMobile && styles.contentWrapperMobile,
        ]}
      >
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
              NUESTROS CLIENTES
            </Text>
            <Text
              style={[
                styles.sectionTitle,
                bp.isTabletOrMobile && styles.sectionTitleTabletOrMobile,
                bp.isMobile && styles.sectionTitleMobile,
              ]}
            >
              Confían en <Text style={styles.titleAccent}>nosotros</Text>
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

        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollContainer,
            bp.isTabletOrMobile && styles.scrollContainerTabletOrMobile,
            bp.isMobile && styles.scrollContainerMobile,
          ]}
          scrollEventThrottle={16}
          bounces={false}
          decelerationRate="fast"
        >
          {infiniteClients.map((client, index) => (
            <View
              key={`${client.id}-${index}`}
              style={[
                styles.logoContainer,
                bp.isTabletOrMobile && styles.logoContainerTabletOrMobile,
                bp.isMobile && styles.logoContainerMobile,
              ]}
            >
              <Image
                source={{ uri: client.logo }}
                style={[
                  styles.logo,
                  bp.isTabletOrMobile && styles.logoTabletOrMobile,
                  bp.isMobile && styles.logoMobile,
                ]}
                resizeMode="contain"
              />
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  )
}

/* --------------------- BREAKPOINT ------------------------ */
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
    paddingVertical: 30,
    paddingBottom: 40,
    borderColor: "#ff6b35",
    // borderBottomWidth: 2,
    // borderTopWidth: 2,
    alignItems: "center",
  },
  contentWrapper: {
    width: "80%",
  },
  contentWrapperTabletOrMobile: {
    width: "85%",
  },
  contentWrapperMobile: {
    width: "90%",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  titleContainerTabletOrMobile: {
    marginBottom: 35,
    paddingHorizontal: 16,
  },
  titleContainerMobile: {
    marginBottom: 30,
    paddingHorizontal: 12,
  },
  titleDecorationLeft: {
    width: 40,
    height: 2,
    backgroundColor: "#ff6b35",
    marginRight: 20,
  },
  titleDecorationTabletOrMobile: {
    width: 35,
    height: 2,
    marginRight: 18,
  },
  titleDecorationMobile: {
    width: 30,
    height: 2,
    marginRight: 15,
  },
  titleDecorationRight: {
    width: 40,
    height: 2,
    backgroundColor: "#ff6b35",
    marginLeft: 20,
  },
  titleWrapper: {
    alignItems: "center",
  },
  sectionSubtitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#ff6b35",
    letterSpacing: 2,
    marginBottom: 8,
    textTransform: "uppercase",
  },
  sectionSubtitleTabletOrMobile: {
    fontSize: 11,
    letterSpacing: 1.5,
    marginBottom: 7,
  },
  sectionSubtitleMobile: {
    fontSize: 10,
    letterSpacing: 1,
    marginBottom: 6,
  },
  sectionTitle: {
    fontSize: 40,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
    letterSpacing: 0.5,
    lineHeight: 34,
  },
  sectionTitleTabletOrMobile: {
    fontSize: 32,
    lineHeight: 28,
  },
  sectionTitleMobile: {
    fontSize: 24,
    lineHeight: 22,
  },
  titleAccent: {
    color: "#ff6b35",
    fontStyle: "italic",
  },
  scrollContainer: {
    paddingHorizontal: 20,
    alignItems: "center",
  },
  scrollContainerTabletOrMobile: {
    paddingHorizontal: 16,
  },
  scrollContainerMobile: {
    paddingHorizontal: 12,
  },
  logoContainer: {
    width: 170,
    height: 90,
    marginHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
    borderRadius: 8,
    paddingHorizontal: 15,
  },
  logoContainerTabletOrMobile: {
    width: 155,
    height: 80,
    marginHorizontal: 12,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  logoContainerMobile: {
    width: 140,
    height: 70,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  logo: {
    width: "100%",
    height: "70%",
  },
  logoTabletOrMobile: {
    height: "65%",
  },
  logoMobile: {
    height: "60%",
  },
})

export default ClientTestimonials
