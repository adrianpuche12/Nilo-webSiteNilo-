"use client"

import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from "react-native"
import { useState } from "react"
import teamImages from "@/assets/TeamImages"

const { width } = Dimensions.get("window")

interface TeamMember {
  id: number
  name: string
  role: string
  category: string
  quote: string
  image: string
}

interface TeamMemberCardProps {
  member: TeamMember
  onPress?: (member: TeamMember) => void
}

const TeamCard = ({ member, onPress }: TeamMemberCardProps) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <TouchableOpacity
      style={[
        styles.memberCard,
        {
          transform: [{ scale: isHovered ? 1.02 : 1 }],
        },
        isHovered && styles.memberCardHovered,
      ]}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onPress={() => onPress?.(member)}
      activeOpacity={0.9}
    >
      {/* Background Gradient */}
      <View style={[styles.cardGradient, isHovered && styles.cardGradientHovered]} />

      {/* Orange Border */}
      <View style={[styles.cardBorder, isHovered && styles.cardBorderHovered]} />

      {/* Content */}
      <View style={styles.cardContent}>
        {/* Profile Image */}
        <View style={[styles.imageContainer, isHovered && styles.imageContainerHovered]}>
          <View style={styles.imageGlow} />
          <Image source={teamImages[member.image] ?? { uri: member.image }} style={styles.profileImage} />
          <View style={styles.imageOverlay} />
        </View>

        {/* Member Info */}
        <View style={styles.memberInfo}>
          <Text style={[styles.memberName, isHovered && styles.memberNameHovered]}>{member.name}</Text>
          <Text style={styles.memberRole}>{member.role}</Text>
          <View style={[styles.roleUnderline, isHovered && styles.roleUnderlineHovered]} />
        </View>

        {/* Quote */}
        <View style={styles.quoteContainer}>
          <Text style={styles.quoteIcon}>"</Text>
          <Text style={styles.memberQuote}>{member.quote}</Text>
        </View>
      </View>

      {/* Shine Effect */}
      {isHovered && <View style={styles.shineEffect} />}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  memberCard: {
    backgroundColor: "#1a1a1a",
    borderRadius: 20,
    padding: 24,
    width: (width - 60) / 7,
    minHeight: 360,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    borderWidth: 1,
    borderColor: "#2a2a2a",
    position: "relative",
    overflow: "hidden",
    transition: "all 0.4s ease",
  },
  memberCardHovered: {
    elevation: 20,
    shadowColor: "#ff6b35",
    shadowOpacity: 0.2,
    shadowRadius: 24,
    borderColor: "#ff6b35",
    backgroundColor: "#222",
  },
  cardGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent",
    transition: "all 0.4s ease",
  },
  cardGradientHovered: {
    backgroundColor: "rgba(255, 107, 53, 0.03)",
  },
  cardBorder: {
    position: "absolute",
    left: 0,
    top: 20,
    width: 4,
    height: 40,
    backgroundColor: "#ff6b35",
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
    transition: "all 0.4s ease",
  },
  cardBorderHovered: {
    height: 60,
    top: 10,
    width: 5,
    shadowColor: "#ff6b35",
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
  },
  cardContent: {
    alignItems: "center",
    zIndex: 1,
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    position: "relative",
    elevation: 4,
    shadowColor: "#ff6b35",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    transition: "all 0.4s ease",
  },
  imageContainerHovered: {
    transform: [{ scale: 1.05 }],
    shadowOpacity: 0.5,
  },
  imageGlow: {
    position: "absolute",
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#ff6b35",
    opacity: 0.2,
    top: -5,
    left: -5,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#ff6b35",
  },
  imageOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "rgba(255, 107, 53, 0.3)",
  },
  memberInfo: {
    alignItems: "center",
    marginBottom: 16,
  },
  memberName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 4,
    textAlign: "center",
    transition: "color 0.4s ease",
  },
  memberNameHovered: {
    color: "#ff6b35",
  },
  memberRole: {
    fontSize: 14,
    color: "#ff6b35",
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "center",
  },
  roleUnderline: {
    width: 40,
    height: 2,
    backgroundColor: "#ff6b35",
    borderRadius: 1,
    transition: "all 0.4s ease",
  },
  roleUnderlineHovered: {
    width: 60,
    backgroundColor: "#fff",
  },
  quoteContainer: {
    alignItems: "center",
    paddingHorizontal: 10,
  },
  quoteIcon: {
    fontSize: 32,
    color: "#ff6b35",
    fontWeight: "bold",
    marginBottom: 8,
    opacity: 0.7,
  },
  memberQuote: {
    fontSize: 13,
    color: "#bbb",
    textAlign: "center",
    lineHeight: 18,
    fontStyle: "italic",
    letterSpacing: 0.2,
  },
  shineEffect: {
    position: "absolute",
    top: 0,
    left: -100,
    width: 50,
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    transform: [{ skewX: "-20deg" }],
  },
})

export default TeamCard
