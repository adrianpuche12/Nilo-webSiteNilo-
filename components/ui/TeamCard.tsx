"use client"

import { View, Text, TouchableOpacity, StyleSheet, Image, useWindowDimensions } from "react-native"
import { useState } from "react"
import teamImages from "@/assets/TeamImages"

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
  const { width } = useWindowDimensions()
  const [isHovered, setIsHovered] = useState(false)
  const bp = useBreakpoint()

  // Calculate responsive card width
  const getCardWidth = () => {
    let columns = 7 
    let padding = 60

    if (bp.isMobile) {
      columns = 2
      padding = 40
    } else if (bp.isTabletOrMobile) {
      columns = 4
      padding = 50
    }

    return (width - padding) / columns
  }

  const cardWidth = getCardWidth()

  return (
    <TouchableOpacity
      style={[
        styles.memberCard,
        {
          width: cardWidth,
          transform: [{ scale: isHovered ? 1.02 : 1 }],
        },
        isHovered && styles.memberCardHovered,
        bp.isTabletOrMobile && styles.memberCardTabletOrMobile,
        bp.isMobile && styles.memberCardMobile,
      ]}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onPress={() => onPress?.(member)}
      activeOpacity={0.9}
    >
      {/* Background Gradient */}
      <View style={[styles.cardGradient, isHovered && styles.cardGradientHovered]} />

      {/* Orange Border */}
      <View
        style={[
          styles.cardBorder,
          isHovered && styles.cardBorderHovered,
          bp.isTabletOrMobile && styles.cardBorderTabletOrMobile,
          bp.isMobile && styles.cardBorderMobile,
        ]}
      />

      {/* Content */}
      <View
        style={[
          styles.cardContent,
          bp.isTabletOrMobile && styles.cardContentTabletOrMobile,
          bp.isMobile && styles.cardContentMobile,
        ]}
      >
        {/* Profile Image */}
        <View
          style={[
            styles.imageContainer,
            isHovered && styles.imageContainerHovered,
            bp.isTabletOrMobile && styles.imageContainerTabletOrMobile,
            bp.isMobile && styles.imageContainerMobile,
          ]}
        >
          <View
            style={[
              styles.imageGlow,
              bp.isTabletOrMobile && styles.imageGlowTabletOrMobile,
              bp.isMobile && styles.imageGlowMobile,
            ]}
          />
          <Image
            source={teamImages[member.image] ?? { uri: member.image }}
            style={[
              styles.profileImage,
              bp.isTabletOrMobile && styles.profileImageTabletOrMobile,
              bp.isMobile && styles.profileImageMobile,
            ]}
          />
          <View
            style={[
              styles.imageOverlay,
              bp.isTabletOrMobile && styles.imageOverlayTabletOrMobile,
              bp.isMobile && styles.imageOverlayMobile,
            ]}
          />
        </View>

        {/* Member Info */}
        <View
          style={[
            styles.memberInfo,
            bp.isTabletOrMobile && styles.memberInfoTabletOrMobile,
            bp.isMobile && styles.memberInfoMobile,
          ]}
        >
          <Text
            style={[
              styles.memberName,
              isHovered && styles.memberNameHovered,
              bp.isTabletOrMobile && styles.memberNameTabletOrMobile,
              bp.isMobile && styles.memberNameMobile,
            ]}
          >
            {member.name}
          </Text>
          <Text
            style={[
              styles.memberRole,
              bp.isTabletOrMobile && styles.memberRoleTabletOrMobile,
              bp.isMobile && styles.memberRoleMobile,
            ]}
          >
            {member.role}
          </Text>
          <View
            style={[
              styles.roleUnderline,
              isHovered && styles.roleUnderlineHovered,
              bp.isTabletOrMobile && styles.roleUnderlineTabletOrMobile,
              bp.isMobile && styles.roleUnderlineMobile,
            ]}
          />
        </View>

        {/* Quote */}
        <View
          style={[
            styles.quoteContainer,
            bp.isTabletOrMobile && styles.quoteContainerTabletOrMobile,
            bp.isMobile && styles.quoteContainerMobile,
          ]}
        >
          <Text
            style={[
              styles.quoteIcon,
              bp.isTabletOrMobile && styles.quoteIconTabletOrMobile,
              bp.isMobile && styles.quoteIconMobile,
            ]}
          >
            "
          </Text>
          <Text
            style={[
              styles.memberQuote,
              bp.isTabletOrMobile && styles.memberQuoteTabletOrMobile,
              bp.isMobile && styles.memberQuoteMobile,
            ]}
          >
            {member.quote}
          </Text>
        </View>
      </View>

      {/* Shine Effect */}
      {isHovered && <View style={styles.shineEffect} />}
    </TouchableOpacity>
  )
}

/* --------------------- BREAKPOINT HOOK ------------------------ */
const useBreakpoint = () => {
  const { width } = useWindowDimensions()
  return {
    isTabletOrMobile: width < 1024,
    isMobile: width < 768,
  }
}

const styles = StyleSheet.create({
  memberCard: {
    backgroundColor: "#1a1a1a",
    borderRadius: 20,
    padding: 24,
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
  memberCardTabletOrMobile: {
    borderRadius: 16,
    padding: 20,
    minHeight: 320,
  },
  memberCardMobile: {
    borderRadius: 14,
    padding: 16,
    minHeight: 280,
    elevation: 6,
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
  cardBorderTabletOrMobile: {
    width: 3,
    height: 35,
    top: 18,
  },
  cardBorderMobile: {
    width: 3,
    height: 30,
    top: 15,
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
  cardContentTabletOrMobile: {
    // Mantener centrado
  },
  cardContentMobile: {
    // Mantener centrado
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
  imageContainerTabletOrMobile: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
  },
  imageContainerMobile: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 14,
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
  imageGlowTabletOrMobile: {
    width: 90,
    height: 90,
    borderRadius: 45,
    top: -5,
    left: -5,
  },
  imageGlowMobile: {
    width: 80,
    height: 80,
    borderRadius: 40,
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
  profileImageTabletOrMobile: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
  },
  profileImageMobile: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
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
  imageOverlayTabletOrMobile: {
    borderRadius: 40,
    borderWidth: 1,
  },
  imageOverlayMobile: {
    borderRadius: 35,
    borderWidth: 1,
  },
  memberInfo: {
    alignItems: "center",
    marginBottom: 16,
  },
  memberInfoTabletOrMobile: {
    marginBottom: 14,
  },
  memberInfoMobile: {
    marginBottom: 12,
  },
  memberName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 4,
    textAlign: "center",
    transition: "color 0.4s ease",
  },
  memberNameTabletOrMobile: {
    fontSize: 18,
    marginBottom: 3,
  },
  memberNameMobile: {
    fontSize: 16,
    marginBottom: 3,
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
  memberRoleTabletOrMobile: {
    fontSize: 13,
    marginBottom: 7,
  },
  memberRoleMobile: {
    fontSize: 12,
    marginBottom: 6,
  },
  roleUnderline: {
    width: 40,
    height: 2,
    backgroundColor: "#ff6b35",
    borderRadius: 1,
    transition: "all 0.4s ease",
  },
  roleUnderlineTabletOrMobile: {
    width: 35,
    height: 2,
  },
  roleUnderlineMobile: {
    width: 30,
    height: 1.5,
  },
  roleUnderlineHovered: {
    width: 60,
    backgroundColor: "#fff",
  },
  quoteContainer: {
    alignItems: "center",
    paddingHorizontal: 10,
  },
  quoteContainerTabletOrMobile: {
    paddingHorizontal: 8,
  },
  quoteContainerMobile: {
    paddingHorizontal: 6,
  },
  quoteIcon: {
    fontSize: 32,
    color: "#ff6b35",
    fontWeight: "bold",
    marginBottom: 8,
    opacity: 0.7,
  },
  quoteIconTabletOrMobile: {
    fontSize: 28,
    marginBottom: 6,
  },
  quoteIconMobile: {
    fontSize: 24,
    marginBottom: 5,
  },
  memberQuote: {
    fontSize: 13,
    color: "#bbb",
    textAlign: "center",
    lineHeight: 18,
    fontStyle: "italic",
    letterSpacing: 0.2,
  },
  memberQuoteTabletOrMobile: {
    fontSize: 12,
    lineHeight: 16,
  },
  memberQuoteMobile: {
    fontSize: 11,
    lineHeight: 15,
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
