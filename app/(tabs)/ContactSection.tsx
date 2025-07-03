"use client"

import { View, Text, TextInput, StyleSheet } from "react-native"
import { useState } from "react"
import { SendButton } from "@/components/ui/AppButtons"

interface ContactFormData {
  email: string
  firstName: string
  lastName: string
  company: string
  countryCode: string
  areaCode: string
  phoneNumber: string
  message: string
}

interface ContactSectionProps {
  title?: string
  subtitle?: string
  onSubmit?: (formData: ContactFormData) => void
}

const ContactSection = ({
  title = "Contáctanos",
  subtitle = "Envianos tus consultas o solicitá cotización a través del siguiente formulario",
  onSubmit,
}: ContactSectionProps) => {
  const [formData, setFormData] = useState<ContactFormData>({
    email: "",
    firstName: "",
    lastName: "",
    company: "",
    countryCode: "+54",
    areaCode: "",
    phoneNumber: "",
    message: "",
  })

  const [errors, setErrors] = useState<Partial<ContactFormData>>({})
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {}

    if (!formData.email.trim()) newErrors.email = "Email es requerido"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email inválido"

    if (!formData.firstName.trim()) newErrors.firstName = "Nombre es requerido"
    if (!formData.lastName.trim()) newErrors.lastName = "Apellido es requerido"
    if (!formData.company.trim()) newErrors.company = "Empresa es requerida"
    if (!formData.areaCode.trim()) newErrors.areaCode = "Código de área es requerido"
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Número de teléfono es requerido"
    if (!formData.message.trim()) newErrors.message = "Mensaje es requerido"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit?.(formData)
      console.log("Form submitted:", formData)
      
      setFormData({
        email: "",
        firstName: "",
        lastName: "",
        company: "",
        countryCode: "+54",
        areaCode: "",
        phoneNumber: "",
        message: "",
      })
    }
  }

  const updateFormData = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const isFormValid = () => {
    return (
      formData.email.trim() &&
      formData.firstName.trim() &&
      formData.lastName.trim() &&
      formData.company.trim() &&
      formData.areaCode.trim() &&
      formData.phoneNumber.trim() &&
      formData.message.trim() &&
      /\S+@\S+\.\S+/.test(formData.email)
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        {/* Title Section */}
        <View style={styles.titleContainer}>
          <View style={styles.titleDecorationLeft} />
          <View style={styles.titleWrapper}>
            <Text style={styles.sectionSubtitle}>PONTE EN CONTACTO</Text>
            <Text style={styles.sectionTitle}>{title}</Text>
          </View>
          <View style={styles.titleDecorationRight} />
        </View>

        {/* Subtitle */}
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitleText}>{subtitle}</Text>
        </View>

        {/* Form Container */}
        <View style={styles.formContainer}>
          <View style={styles.formHeader}>
            <Text style={styles.formTitle}>Envíanos tu consulta</Text>
            <View style={styles.formTitleUnderline} />
          </View>

          {/* Main Form Content */}
          <View style={styles.formContent}>
            {/* Left Column */}
            <View style={styles.leftColumn}>
              {/* Email Field */}
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>E-MAIL*</Text>
                <TextInput
                  style={[
                    styles.textInput,
                    focusedField === "email" && styles.textInputFocused,
                  ]}
                  placeholder="tuemail@gmail.com"
                  placeholderTextColor="#888"
                  value={formData.email}
                  onChangeText={(text) => updateFormData("email", text)}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <Text style={styles.errorText}>{errors.email || " "}</Text>
              </View>

              {/* First Name Field */}
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>NOMBRE*</Text>
                <TextInput
                  style={[
                    styles.textInput,
                    focusedField === "firstName" && styles.textInputFocused,
                  ]}
                  placeholder="Tu nombre"
                  placeholderTextColor="#888"
                  value={formData.firstName}
                  onChangeText={(text) => updateFormData("firstName", text)}
                  onFocus={() => setFocusedField("firstName")}
                  onBlur={() => setFocusedField(null)}
                />
                <Text style={styles.errorText}>{errors.firstName || " "}</Text>
              </View>
            </View>

            {/* Right Column */}
            <View style={styles.rightColumn}>
              {/* Company Field */}
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>EMPRESA*</Text>
                <TextInput
                  style={[
                    styles.textInput,
                    focusedField === "company" && styles.textInputFocused,
                  ]}
                  placeholder="Nombre de tu empresa"
                  placeholderTextColor="#888"
                  value={formData.company}
                  onChangeText={(text) => updateFormData("company", text)}
                  onFocus={() => setFocusedField("company")}
                  onBlur={() => setFocusedField(null)}
                />
                <Text style={styles.errorText}>{errors.company || " "}</Text>
              </View>

              {/* Last Name Field */}
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>APELLIDO*</Text>
                <TextInput
                  style={[
                    styles.textInput,
                    focusedField === "lastName" && styles.textInputFocused,
                  ]}
                  placeholder="Tu apellido"
                  placeholderTextColor="#888"
                  value={formData.lastName}
                  onChangeText={(text) => updateFormData("lastName", text)}
                  onFocus={() => setFocusedField("lastName")}
                  onBlur={() => setFocusedField(null)}
                />
                <Text style={styles.errorText}>{errors.lastName || " "}</Text>
              </View>
            </View>
          </View>

          {/* Phone Field - Full Width */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>TELÉFONO*</Text>
            <View style={styles.phoneContainer}>
              <TextInput
                style={[styles.phoneInput, styles.countryCode]}
                value={formData.countryCode}
                onChangeText={(text) => updateFormData("countryCode", text)}
                placeholder="+54"
                placeholderTextColor="#888"
              />
              <TextInput
                style={[
                  styles.phoneInput,
                  styles.areaCode,
                  focusedField === "areaCode" && styles.textInputFocused,
                ]}
                value={formData.areaCode}
                onChangeText={(text) => updateFormData("areaCode", text)}
                placeholder="9"
                placeholderTextColor="#888"
                keyboardType="numeric"
                onFocus={() => setFocusedField("areaCode")}
                onBlur={() => setFocusedField(null)}
              />
              <TextInput
                style={[
                  styles.phoneInput,
                  styles.phoneNumber,
                  focusedField === "phoneNumber" && styles.textInputFocused,
                ]}
                value={formData.phoneNumber}
                onChangeText={(text) => updateFormData("phoneNumber", text)}
                placeholder="011 222233"
                placeholderTextColor="#888"
                keyboardType="numeric"
                onFocus={() => setFocusedField("phoneNumber")}
                onBlur={() => setFocusedField(null)}
                editable={true}
                selectTextOnFocus={true}
              />
            </View>
<Text style={styles.errorText}>
  {(errors.areaCode || errors.phoneNumber) ? "Teléfono completo es requerido" : " "}
</Text>
          </View>

          {/* Message Field - Full Width */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>DEJANOS TU CONSULTA O SOLICITUD DE COTIZACIÓN*</Text>
            <TextInput
              style={[
                styles.textArea,
                focusedField === "message" && styles.textInputFocused,
              ]}
              placeholder="Cuéntanos sobre tu proyecto, necesidades específicas, presupuesto estimado, tiempos, etc."
              placeholderTextColor="#888"
              value={formData.message}
              onChangeText={(text) => updateFormData("message", text)}
              onFocus={() => setFocusedField("message")}
              onBlur={() => setFocusedField(null)}
              multiline
              numberOfLines={5}
              textAlignVertical="top"
            />
            {errors.message && <Text style={styles.errorText}>{errors.message}</Text>}
          </View>

          {/* Submit Button */}
          <View style={styles.submitContainer}>
            <SendButton onPress={handleSubmit} />
            <View style={styles.privacyNote}>
              <Text style={styles.privacyText}>Los campos con * son obligatorios.</Text>
              <Text style={styles.privacyText}>
                Al hacer clic en enviar acepta nuestras políticas de privacidad y legales
              </Text>
            </View>
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
    width: "40%",
    maxWidth: 750,
    paddingHorizontal: 20,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  titleDecorationLeft: {
    width: 60,
    height: 3,
    backgroundColor: "#ff6b35",
    marginRight: 30,
    borderRadius: 2,
  },
  titleDecorationRight: {
    width: 60,
    height: 3,
    backgroundColor: "#ff6b35",
    marginLeft: 30,
    borderRadius: 2,
  },
  titleWrapper: {
    alignItems: "center",
  },
  sectionSubtitle: {
    fontSize: 14,
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
    lineHeight: 48,
  },
  subtitleContainer: {
    alignItems: "center",
    marginBottom: 50,
  },
  subtitleText: {
    fontSize: 18,
    color: "#ccc",
    textAlign: "center",
    lineHeight: 26,
    maxWidth: 600,
  },
  formContainer: {
    backgroundColor: "#1a1a1a",
    borderRadius: 25,
    padding: 35,
    borderWidth: 1,
    borderColor: "#333",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
  },
  formHeader: {
    alignItems: "center",
    marginBottom: 20,
  },
  formTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 12,
  },
  formTitleUnderline: {
    width: 80,
    height: 4,
    backgroundColor: "#ff6b35",
    borderRadius: 2,
  },
  formContent: {
    flexDirection: "row",
    gap: 25,
    marginBottom: 10,
  },
  leftColumn: {
    flex: 1,
  },
  rightColumn: {
    flex: 1,
  },
  fieldContainer: {
    marginBottom: 10,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#ff6b35",
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  textInput: {
    backgroundColor: "#2a2a2a",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: "#fff",
    borderWidth: 2,
    borderColor: "#444",
  },
  textInputFocused: {
    borderColor: "#ff6b35",
    backgroundColor: "#333",
    elevation: 4,
    shadowColor: "#ff6b35",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  textInputError: {
    borderColor: "#ff4444",
    backgroundColor: "#2d1a1a",
  },
  textArea: {
    backgroundColor: "#2a2a2a",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: "#fff",
    borderWidth: 2,
    borderColor: "#444",
    minHeight: 120,
  },
  phoneContainer: {
    flexDirection: "row",
    gap: 15,
    width: "100%",
  },
  phoneInput: {
    backgroundColor: "#2a2a2a",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: "#fff",
    borderWidth: 2,
    borderColor: "#444",
    textAlign: "center",
  },
  countryCode: {
    flex: 1,
    maxWidth: 80,
  },
  areaCode: {
    flex: 1,
    maxWidth: 80,
  },
  phoneNumber: {
    flex: 3,
  },
  errorText: {
    color: "#ff4444",
    fontSize: 11,
    marginTop: 6,
    fontWeight: "600",
    marginLeft: 5,
  },
  submitContainer: {
    alignItems: "center",
    marginTop: 20,
    paddingTop: 25,
    borderTopWidth: 1,
    borderTopColor: "#333",
  },
  privacyNote: {
    marginTop: 20,
    alignItems: "center",
  },
  privacyText: {
    fontSize: 12,
    color: "#888",
    textAlign: "center",
    lineHeight: 16,
    marginBottom: 5,
  },
})

export default ContactSection