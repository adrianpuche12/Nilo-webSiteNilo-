"use client"

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  useWindowDimensions,
} from "react-native"
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

  const getCardWidth = () => {
    let columns = 5
    let padding = 60

    if (bp.isMobile) {
      columns = 2
      padding = 40
    } else if (bp.isTablet) {
      columns = 4
      padding = 50
    } else if (bp.isLargeDesktop) {
      columns = 8
      padding = 80
    }

    return (width - padding) / columns
  }

  const cardWidth = getCardWidth()

  return (
    <TouchableOpacity
      style={[
        styles.memberCard,
        { //@ts-ignore
           transition: "all 0.4s ease" },
        { width: cardWidth, transform: [{ scale: isHovered ? 1.02 : 1 }] },
        isHovered && styles.memberCardHovered,
        bp.isTablet && styles.memberCardTabletOrMobile,
        bp.isMobile && styles.memberCardMobile,
        bp.isLargeDesktop && styles.memberCardLargeDesktop,
      ]}
      //@ts-ignore
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onPress={() => onPress?.(member)}
      activeOpacity={0.9}
    >
      {/* Gradient */}
      <View style={[styles.cardGradient, isHovered && styles.cardGradientHovered]} />

      {/* Border */}
      <View
        style={[
          styles.cardBorder,
          isHovered && styles.cardBorderHovered,
          bp.isTablet && styles.cardBorderTabletOrMobile,
          bp.isMobile && styles.cardBorderMobile,
          bp.isLargeDesktop && styles.cardBorderLargeDesktop,
        ]}
      />

      {/* Content */}
      <View style={[styles.cardContent]}>
        {/* Image */}
        <View
          style={[
            styles.imageContainer,
            isHovered && styles.imageContainerHovered,
            bp.isTablet && styles.imageContainerTabletOrMobile,
            bp.isMobile && styles.imageContainerMobile,
            bp.isLargeDesktop && styles.imageContainerLargeDesktop,
          ]}
        >
          <View
            style={[
              styles.imageGlow,
              bp.isTablet && styles.imageGlowTabletOrMobile,
              bp.isMobile && styles.imageGlowMobile,
              bp.isLargeDesktop && styles.imageGlowLargeDesktop,
            ]}
          />
          <Image
            source={teamImages[member.image] ?? { uri: member.image }}
            style={[
              styles.profileImage,
              bp.isTablet && styles.profileImageTabletOrMobile,
              bp.isMobile && styles.profileImageMobile,
              bp.isLargeDesktop && styles.profileImageLargeDesktop,
            ]}
          />
          <View
            style={[
              styles.imageOverlay,
              bp.isTablet && styles.imageOverlayTabletOrMobile,
              bp.isMobile && styles.imageOverlayMobile,
              bp.isLargeDesktop && styles.imageOverlayLargeDesktop,
            ]}
          />
        </View>

        {/* Info */}
        <View style={[styles.memberInfo]}>
          <Text
            style={[
              styles.memberName,
              isHovered && styles.memberNameHovered,
              bp.isTablet && styles.memberNameTabletOrMobile,
              bp.isMobile && styles.memberNameMobile,
              bp.isLargeDesktop && styles.memberNameLargeDesktop,
            ]}
          >
            {member.name}
          </Text>
          <Text
            style={[
              styles.memberRole,
              bp.isTablet && styles.memberRoleTabletOrMobile,
              bp.isMobile && styles.memberRoleMobile,
              bp.isLargeDesktop && styles.memberRoleLargeDesktop,
            ]}
          >
            {member.role}
          </Text>
          <View
            style={[
              bp.isTablet && styles.roleUnderlineTabletOrMobile,
              bp.isMobile && styles.roleUnderlineMobile,
              bp.isLargeDesktop && styles.roleUnderlineLargeDesktop,
              styles.roleUnderline,
              isHovered && styles.roleUnderlineHovered,
            ]}
          />
        </View>

        {/* Quote */}
        <View style={[styles.quoteContainer]}>
          <Text
            style={[
              styles.quoteIcon,
              bp.isTablet && styles.quoteIconTabletOrMobile,
              bp.isMobile && styles.quoteIconMobile,
              bp.isLargeDesktop && styles.quoteIconLargeDesktop,
            ]}
          >
            "
          </Text>
          <Text
            style={[
              styles.memberQuote,
              bp.isTablet && styles.memberQuoteTabletOrMobile,
              bp.isMobile && styles.memberQuoteMobile,
              bp.isLargeDesktop && styles.memberQuoteLargeDesktop,
            ]}
          >
            {member.quote}
          </Text>
        </View>
      </View>

      {isHovered && <View style={styles.shineEffect} />}
    </TouchableOpacity>
  )
}

/* --------------------- HOOK ------------------------ */
const useBreakpoint = () => {
  const { width } = useWindowDimensions()
  return {
    isMobile: width < 768,
    isTablet: width >= 768 && width < 1024,
    isDesktop: width >= 1024 && width < 1440,
    isLargeDesktop: width >= 1440,
  }
}


const styles = StyleSheet.create({
  // Base
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
  memberCardLargeDesktop: {
    borderRadius: 24,
    padding: 28,
    minHeight: 400,
  },
  memberCardHovered: {
    elevation: 20,
    shadowColor: "#ff6b35",
    shadowOpacity: 0.2,
    shadowRadius: 24,
    borderColor: "#ff6b35",
    backgroundColor: "#222",
  },

  // Card visual
  cardGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent",
    //@ts-ignore
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
    //@ts-ignore
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
  cardBorderLargeDesktop: {
    width: 5,
    height: 50,
    top: 18,
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

  // Card content
  cardContent: {
    alignItems: "center",
    zIndex: 1,
    
  },

  // Image
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
    //@ts-ignore
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
  imageContainerLargeDesktop: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 24,
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
  imageGlowLargeDesktop: {
    width: 130,
    height: 130,
    borderRadius: 65,
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
  profileImageLargeDesktop: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
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
  imageOverlayLargeDesktop: {
    borderRadius: 60,
    borderWidth: 2,
  },

  // Info
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
    //@ts-ignore
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
  memberNameLargeDesktop: {
    fontSize: 22,
    marginBottom: 6,
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
  memberRoleLargeDesktop: {
    fontSize: 16,
    marginBottom: 10,
  },

  roleUnderline: {
    width: 40,
    height: 3,
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
  roleUnderlineLargeDesktop: {
    width: 50,
    height: 3,
  },
  roleUnderlineHovered: {
    width: 60,
    backgroundColor: "#fff",
  },

  // Quote
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
  quoteIconLargeDesktop: {
    fontSize: 36,
    marginBottom: 10,
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
  memberQuoteLargeDesktop: {
    fontSize: 14,
    lineHeight: 20,
  },

  // Effect
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
