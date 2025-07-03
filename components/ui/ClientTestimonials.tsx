"use client"

import { View, Text, ScrollView, StyleSheet, Dimensions, Image } from "react-native"
import { useRef, useEffect, useState } from "react"

const { width } = Dimensions.get("window")

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
  const logoWidth = 170 + 30 
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
      <View style={styles.contentWrapper}>
        <View style={styles.titleContainer}>
          <View style={styles.titleDecorationLeft} />
          <View style={styles.titleWrapper}>
            <Text style={styles.sectionSubtitle}>NUESTROS CLIENTES</Text>
            <Text style={styles.sectionTitle}>
              Confían en <Text style={styles.titleAccent}>nosotros</Text>
            </Text>
          </View>
          <View style={styles.titleDecorationRight} />
        </View>

        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
          scrollEventThrottle={16}
          bounces={false}
          decelerationRate="fast"
        >
          {infiniteClients.map((client, index) => (
            <View key={`${client.id}-${index}`} style={styles.logoContainer}>
              <Image source={{ uri: client.logo }} style={styles.logo} resizeMode="contain" />
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  )
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
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  titleDecorationLeft: {
    width: 40,
    height: 2,
    backgroundColor: "#ff6b35",
    marginRight: 20,
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
  sectionTitle: {
    fontSize: 40,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
    letterSpacing: 0.5,
    lineHeight: 34,
  },
  titleAccent: {
    color: "#ff6b35",
    fontStyle: "italic",
  },
  scrollContainer: {
    paddingHorizontal: 20,
    alignItems: "center",
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
  logo: {
    width: "100%",
    height: "70%",
  },
})

export default ClientTestimonials
