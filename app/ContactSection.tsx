"use client";

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { useState } from "react";
import { SendButton } from "@/components/ui/AppButtons";

interface ContactFormData {
  email: string;
  firstName: string;
  lastName: string;
  company: string;
  countryCode: string;
  areaCode: string;
  phoneNumber: string;
  message: string;
}

interface ContactSectionProps {
  title?: string;
  subtitle?: string;
  onSubmit?: (formData: ContactFormData) => void;
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
  });

  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const bp = useBreakpoint();

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};

    if (!formData.email.trim()) newErrors.email = "Email es requerido";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email inválido";

    if (!formData.firstName.trim()) newErrors.firstName = "Nombre es requerido";
    if (!formData.lastName.trim()) newErrors.lastName = "Apellido es requerido";
    if (!formData.company.trim()) newErrors.company = "Empresa es requerida";
    if (!formData.areaCode.trim())
      newErrors.areaCode = "Código de área es requerido";
    if (!formData.phoneNumber.trim())
      newErrors.phoneNumber = "Número de teléfono es requerido";
    if (!formData.message.trim()) newErrors.message = "Mensaje es requerido";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit?.(formData);
      console.log("Form submitted:", formData);

      setFormData({
        email: "",
        firstName: "",
        lastName: "",
        company: "",
        countryCode: "+54",
        areaCode: "",
        phoneNumber: "",
        message: "",
      });
    }
  };

  const updateFormData = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

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
    );
  };

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
              PONTE EN CONTACTO
            </Text>
            <Text
              style={[
                styles.sectionTitle,
                bp.isTabletOrMobile && styles.sectionTitleTabletOrMobile,
                bp.isMobile && styles.sectionTitleMobile,
              ]}
            >
              {title}
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

        {/* Subtitle */}
        <View
          style={[
            styles.subtitleContainer,
            bp.isTabletOrMobile && styles.subtitleContainerTabletOrMobile,
            bp.isMobile && styles.subtitleContainerMobile,
          ]}
        >
          <Text
            style={[
              styles.subtitleText,
              bp.isTabletOrMobile && styles.subtitleTextTabletOrMobile,
              bp.isMobile && styles.subtitleTextMobile,
            ]}
          >
            {subtitle}
          </Text>
        </View>

        {/* Form Container */}
        <View
          style={[
            styles.formContainer,
            bp.isTabletOrMobile && styles.formContainerTabletOrMobile,
            bp.isMobile && styles.formContainerMobile,
          ]}
        >
          <View
            style={[
              styles.formHeader,
              bp.isTabletOrMobile && styles.formHeaderTabletOrMobile,
              bp.isMobile && styles.formHeaderMobile,
            ]}
          >
            <Text
              style={[
                styles.formTitle,
                bp.isTabletOrMobile && styles.formTitleTabletOrMobile,
                bp.isMobile && styles.formTitleMobile,
              ]}
            >
              Envíanos tu consulta
            </Text>
            <View
              style={[
                styles.formTitleUnderline,
                bp.isTabletOrMobile && styles.formTitleUnderlineTabletOrMobile,
                bp.isMobile && styles.formTitleUnderlineMobile,
              ]}
            />
          </View>

          {/* Main Form Content */}
          {bp.isMobile ? (
            // Mobile: Single column layout
            <View style={styles.formContentMobile}>
              {/* Email Field */}
              <View style={styles.fieldContainerMobile}>
                <Text style={styles.fieldLabelMobile}>E-MAIL*</Text>
                <TextInput
                  style={[
                    styles.textInputMobile,
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
                <Text style={styles.errorTextMobile}>{errors.email || " "}</Text>
              </View>

              {/* First Name Field */}
              <View style={styles.fieldContainerMobile}>
                <Text style={styles.fieldLabelMobile}>NOMBRE*</Text>
                <TextInput
                  style={[
                    styles.textInputMobile,
                    focusedField === "firstName" && styles.textInputFocused,
                  ]}
                  placeholder="Tu nombre"
                  placeholderTextColor="#888"
                  value={formData.firstName}
                  onChangeText={(text) => updateFormData("firstName", text)}
                  onFocus={() => setFocusedField("firstName")}
                  onBlur={() => setFocusedField(null)}
                />
                <Text style={styles.errorTextMobile}>{errors.firstName || " "}</Text>
              </View>

              {/* Last Name Field */}
              <View style={styles.fieldContainerMobile}>
                <Text style={styles.fieldLabelMobile}>APELLIDO*</Text>
                <TextInput
                  style={[
                    styles.textInputMobile,
                    focusedField === "lastName" && styles.textInputFocused,
                  ]}
                  placeholder="Tu apellido"
                  placeholderTextColor="#888"
                  value={formData.lastName}
                  onChangeText={(text) => updateFormData("lastName", text)}
                  onFocus={() => setFocusedField("lastName")}
                  onBlur={() => setFocusedField(null)}
                />
                <Text style={styles.errorTextMobile}>{errors.lastName || " "}</Text>
              </View>

              {/* Company Field */}
              <View style={styles.fieldContainerMobile}>
                <Text style={styles.fieldLabelMobile}>EMPRESA*</Text>
                <TextInput
                  style={[
                    styles.textInputMobile,
                    focusedField === "company" && styles.textInputFocused,
                  ]}
                  placeholder="Nombre de tu empresa"
                  placeholderTextColor="#888"
                  value={formData.company}
                  onChangeText={(text) => updateFormData("company", text)}
                  onFocus={() => setFocusedField("company")}
                  onBlur={() => setFocusedField(null)}
                />
                <Text style={styles.errorTextMobile}>{errors.company || " "}</Text>
              </View>
            </View>
          ) : (
            // Desktop/Tablet: Two column layout
            <View
              style={[
                styles.formContent,
                bp.isTabletOrMobile && styles.formContentTabletOrMobile,
              ]}
            >
              {/* Left Column */}
              <View style={styles.leftColumn}>
                {/* Email Field */}
                <View
                  style={[
                    styles.fieldContainer,
                    bp.isTabletOrMobile && styles.fieldContainerTabletOrMobile,
                  ]}
                >
                  <Text
                    style={[
                      styles.fieldLabel,
                      bp.isTabletOrMobile && styles.fieldLabelTabletOrMobile,
                    ]}
                  >
                    E-MAIL*
                  </Text>
                  <TextInput
                    style={[
                      styles.textInput,
                      focusedField === "email" && styles.textInputFocused,
                      bp.isTabletOrMobile && styles.textInputTabletOrMobile,
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
                  <Text
                    style={[
                      styles.errorText,
                      bp.isTabletOrMobile && styles.errorTextTabletOrMobile,
                    ]}
                  >
                    {errors.email || " "}
                  </Text>
                </View>

                {/* First Name Field */}
                <View
                  style={[
                    styles.fieldContainer,
                    bp.isTabletOrMobile && styles.fieldContainerTabletOrMobile,
                  ]}
                >
                  <Text
                    style={[
                      styles.fieldLabel,
                      bp.isTabletOrMobile && styles.fieldLabelTabletOrMobile,
                    ]}
                  >
                    NOMBRE*
                  </Text>
                  <TextInput
                    style={[
                      styles.textInput,
                      focusedField === "firstName" && styles.textInputFocused,
                      bp.isTabletOrMobile && styles.textInputTabletOrMobile,
                    ]}
                    placeholder="Tu nombre"
                    placeholderTextColor="#888"
                    value={formData.firstName}
                    onChangeText={(text) => updateFormData("firstName", text)}
                    onFocus={() => setFocusedField("firstName")}
                    onBlur={() => setFocusedField(null)}
                  />
                  <Text
                    style={[
                      styles.errorText,
                      bp.isTabletOrMobile && styles.errorTextTabletOrMobile,
                    ]}
                  >
                    {errors.firstName || " "}
                  </Text>
                </View>
              </View>

              {/* Right Column */}
              <View style={styles.rightColumn}>
                {/* Company Field */}
                <View
                  style={[
                    styles.fieldContainer,
                    bp.isTabletOrMobile && styles.fieldContainerTabletOrMobile,
                  ]}
                >
                  <Text
                    style={[
                      styles.fieldLabel,
                      bp.isTabletOrMobile && styles.fieldLabelTabletOrMobile,
                    ]}
                  >
                    EMPRESA*
                  </Text>
                  <TextInput
                    style={[
                      styles.textInput,
                      focusedField === "company" && styles.textInputFocused,
                      bp.isTabletOrMobile && styles.textInputTabletOrMobile,
                    ]}
                    placeholder="Nombre de tu empresa"
                    placeholderTextColor="#888"
                    value={formData.company}
                    onChangeText={(text) => updateFormData("company", text)}
                    onFocus={() => setFocusedField("company")}
                    onBlur={() => setFocusedField(null)}
                  />
                  <Text
                    style={[
                      styles.errorText,
                      bp.isTabletOrMobile && styles.errorTextTabletOrMobile,
                    ]}
                  >
                    {errors.company || " "}
                  </Text>
                </View>

                {/* Last Name Field */}
                <View
                  style={[
                    styles.fieldContainer,
                    bp.isTabletOrMobile && styles.fieldContainerTabletOrMobile,
                  ]}
                >
                  <Text
                    style={[
                      styles.fieldLabel,
                      bp.isTabletOrMobile && styles.fieldLabelTabletOrMobile,
                    ]}
                  >
                    APELLIDO*
                  </Text>
                  <TextInput
                    style={[
                      styles.textInput,
                      focusedField === "lastName" && styles.textInputFocused,
                      bp.isTabletOrMobile && styles.textInputTabletOrMobile,
                    ]}
                    placeholder="Tu apellido"
                    placeholderTextColor="#888"
                    value={formData.lastName}
                    onChangeText={(text) => updateFormData("lastName", text)}
                    onFocus={() => setFocusedField("lastName")}
                    onBlur={() => setFocusedField(null)}
                  />
                  <Text
                    style={[
                      styles.errorText,
                      bp.isTabletOrMobile && styles.errorTextTabletOrMobile,
                    ]}
                  >
                    {errors.lastName || " "}
                  </Text>
                </View>
              </View>
            </View>
          )}

          {/* Phone Field - Full Width */}
          {bp.isMobile ? (
            <View style={styles.fieldContainerMobile}>
              <Text style={styles.fieldLabelMobile}>TELÉFONO*</Text>
              <View style={styles.phoneContainerMobile}>
                <TextInput
                  style={[styles.phoneInputMobile, styles.countryCodeMobile]}
                  value={formData.countryCode}
                  onChangeText={(text) => updateFormData("countryCode", text)}
                  placeholder="+54"
                  placeholderTextColor="#888"
                />
                <TextInput
                  style={[
                    styles.phoneInputMobile,
                    styles.areaCodeMobile,
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
                    styles.phoneInputMobile,
                    styles.phoneNumberMobile,
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
              <Text style={styles.errorTextMobile}>
                {errors.areaCode || errors.phoneNumber
                  ? "Teléfono completo es requerido"
                  : " "}
              </Text>
            </View>
          ) : (
            <View
              style={[
                styles.fieldContainer,
                bp.isTabletOrMobile && styles.fieldContainerTabletOrMobile,
              ]}
            >
              <Text
                style={[
                  styles.fieldLabel,
                  bp.isTabletOrMobile && styles.fieldLabelTabletOrMobile,
                ]}
              >
                TELÉFONO*
              </Text>
              <View
                style={[
                  styles.phoneContainer,
                  bp.isTabletOrMobile && styles.phoneContainerTabletOrMobile,
                ]}
              >
                <TextInput
                  style={[
                    styles.phoneInput,
                    styles.countryCode,
                    bp.isTabletOrMobile && styles.phoneInputTabletOrMobile,
                  ]}
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
                    bp.isTabletOrMobile && styles.phoneInputTabletOrMobile,
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
                    bp.isTabletOrMobile && styles.phoneInputTabletOrMobile,
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
              <Text
                style={[
                  styles.errorText,
                  bp.isTabletOrMobile && styles.errorTextTabletOrMobile,
                ]}
              >
                {errors.areaCode || errors.phoneNumber
                  ? "Teléfono completo es requerido"
                  : " "}
              </Text>
            </View>
          )}

          {/* Message Field - Full Width */}
          {bp.isMobile ? (
            <View style={styles.fieldContainerMobile}>
              <Text style={styles.fieldLabelMobile}>CONSULTA*</Text>
              <TextInput
                style={[
                  styles.textAreaMobile,
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
              {errors.message && (
                <Text style={styles.errorTextMobile}>{errors.message}</Text>
              )}
            </View>
          ) : (
            <View
              style={[
                styles.fieldContainer,
                bp.isTabletOrMobile && styles.fieldContainerTabletOrMobile,
              ]}
            >
              <Text
                style={[
                  styles.fieldLabel,
                  bp.isTabletOrMobile && styles.fieldLabelTabletOrMobile,
                ]}
              >
                DEJANOS TU CONSULTA O SOLICITUD DE COTIZACIÓN*
              </Text>
              <TextInput
                style={[
                  styles.textArea,
                  focusedField === "message" && styles.textInputFocused,
                  bp.isTabletOrMobile && styles.textAreaTabletOrMobile,
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
              {errors.message && (
                <Text
                  style={[
                    styles.errorText,
                    bp.isTabletOrMobile && styles.errorTextTabletOrMobile,
                  ]}
                >
                  {errors.message}
                </Text>
              )}
            </View>
          )}

          {/* Submit Button */}
          <View
            style={[
              styles.submitContainer,
              bp.isTabletOrMobile && styles.submitContainerTabletOrMobile,
              bp.isMobile && styles.submitContainerMobile,
            ]}
          >
            <SendButton onPress={handleSubmit} />
            <View
              style={[
                styles.privacyNote,
                bp.isTabletOrMobile && styles.privacyNoteTabletOrMobile,
                bp.isMobile && styles.privacyNoteMobile,
              ]}
            >
              <Text
                style={[
                  styles.privacyText,
                  bp.isTabletOrMobile && styles.privacyTextTabletOrMobile,
                  bp.isMobile && styles.privacyTextMobile,
                ]}
              >
                Los campos con * son obligatorios.
              </Text>
              <Text
                style={[
                  styles.privacyText,
                  bp.isTabletOrMobile && styles.privacyTextTabletOrMobile,
                  bp.isMobile && styles.privacyTextMobile,
                ]}
              >
                Al hacer clic en enviar acepta nuestras políticas de privacidad
                y legales
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

/* --------------------- BREAKPOINT HOOK ------------------------ */
const useBreakpoint = () => {
  const { width } = useWindowDimensions();
  return {
    isTabletOrMobile: width < 1024,
    isMobile: width < 768,
  };
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    paddingVertical: 80,
    alignItems: "center",
    minHeight: "100vh",
    marginTop: -50,
  },
  contentWrapper: {
    width: "40%",
    maxWidth: 750,
    paddingHorizontal: 20,
  },
  contentWrapperTabletOrMobile: {
    width: "70%",
    paddingHorizontal: 16,
  },
  contentWrapperMobile: {
    width: "95%",
    paddingHorizontal: 8,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  titleContainerTabletOrMobile: {
    marginBottom: 18,
    paddingHorizontal: 16,
  },
  titleContainerMobile: {
    marginBottom: 15,
    paddingHorizontal: 8,
  },
  titleDecorationLeft: {
    width: 60,
    height: 3,
    backgroundColor: "#FF6600",
    marginRight: 30,
    borderRadius: 2,
  },
  titleDecorationTabletOrMobile: {
    width: 50,
    height: 2,
    marginRight: 25,
  },
  titleDecorationMobile: {
    width: 40,
    height: 2,
    marginRight: 20,
  },
  titleDecorationRight: {
    width: 60,
    height: 3,
    backgroundColor: "#FF6600",
    marginLeft: 30,
    borderRadius: 2,
  },
  titleWrapper: {
    alignItems: "center",
  },
  sectionSubtitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FF6600",
    letterSpacing: 3,
    marginBottom: 12,
    textTransform: "uppercase",
  },
  sectionSubtitleTabletOrMobile: {
    fontSize: 13,
    letterSpacing: 2,
    marginBottom: 10,
  },
  sectionSubtitleMobile: {
    fontSize: 11,
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 40,
    fontWeight: "800",
    color: "#fff",
    textAlign: "center",
    letterSpacing: 0.5,
    lineHeight: 48,
  },
  sectionTitleTabletOrMobile: {
    fontSize: 32,
    lineHeight: 38,
  },
  sectionTitleMobile: {
    fontSize: 24,
    lineHeight: 30,
  },
  subtitleContainer: {
    alignItems: "center",
    marginBottom: 50,
  },
  subtitleContainerTabletOrMobile: {
    marginBottom: 40,
  },
  subtitleContainerMobile: {
    marginBottom: 30,
  },
  subtitleText: {
    fontSize: 18,
    color: "#ccc",
    textAlign: "center",
    lineHeight: 26,
    maxWidth: 600,
  },
  subtitleTextTabletOrMobile: {
    fontSize: 16,
    lineHeight: 24,
    maxWidth: 500,
  },
  subtitleTextMobile: {
    fontSize: 14,
    lineHeight: 20,
    maxWidth: 350,
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
  formContainerTabletOrMobile: {
    borderRadius: 20,
    padding: 25,
  },
  formContainerMobile: {
    borderRadius: 12,
    padding: 16,
  },
  formHeader: {
    alignItems: "center",
    marginBottom: 20,
  },
  formHeaderTabletOrMobile: {
    marginBottom: 18,
  },
  formHeaderMobile: {
    marginBottom: 15,
  },
  formTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 12,
  },
  formTitleTabletOrMobile: {
    fontSize: 24,
    marginBottom: 10,
  },
  formTitleMobile: {
    fontSize: 20,
    marginBottom: 8,
  },
  formTitleUnderline: {
    width: 80,
    height: 4,
    backgroundColor: "#FF6600",
    borderRadius: 2,
  },
  formTitleUnderlineTabletOrMobile: {
    width: 70,
    height: 3,
  },
  formTitleUnderlineMobile: {
    width: 60,
    height: 3,
  },
  formContent: {
    flexDirection: "row",
    gap: 25,
    marginBottom: 10,
  },
  formContentTabletOrMobile: {
    gap: 20,
  },
  formContentMobile: {
    flexDirection: "column",
    gap: 0,
  },
  leftColumn: {
    flex: 1,
  },
  rightColumn: {
    flex: 1,
  },
  columnMobile: {
    flex: 0,
    width: "100%",
  },
  fieldContainer: {
    marginBottom: 10,
  },
  fieldContainerTabletOrMobile: {
    marginBottom: 8,
  },
  fieldContainerMobile: {
    marginBottom: 12,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FF6600",
    marginBottom: 8,
    letterSpacing: 0.5,
    flexWrap: "wrap",
  },
  fieldLabelTabletOrMobile: {
    fontSize: 11,
    marginBottom: 7,
  },
  fieldLabelMobile: {
    fontSize: 12,
    marginBottom: 8,
    lineHeight: 16,
    color: "#FF6600",
    fontWeight: "700",
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
    width: "100%",
    //@ts-ignore
    transition: "transform 0.2s ease-in-out",
  },
  textInputTabletOrMobile: {
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
  },
  textInputMobile: {
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 16,
    minHeight: 48,
    color: "#fff",
    backgroundColor: "#2a2a2a",
    borderWidth: 2,
    borderColor: "#444",
  },
  textInputFocused: {
    borderColor: "#FF6600",
    backgroundColor: "#333",
    elevation: 4,
    shadowColor: "#FF6600",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    transform: [{ scale: 1.02 }],
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
    width: "100%",
    transition: "transform 0.2s ease-in-out",
  },
  textAreaTabletOrMobile: {
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    minHeight: 100,
  },
  textAreaMobile: {
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 16,
    minHeight: 120,
    color: "#fff",
    backgroundColor: "#2a2a2a",
    borderWidth: 2,
    borderColor: "#444",
  },
  phoneContainer: {
    flexDirection: "row",
    gap: 15,
    width: "100%",
  },
  phoneContainerTabletOrMobile: {
    gap: 10,
  },
  phoneContainerMobile: {
    gap: 6,
    flexDirection: "row",
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
    transition: "transform 0.2s ease-in-out",
  },
  phoneInputTabletOrMobile: {
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
  },
  phoneInputMobile: {
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 14,
    fontSize: 14,
    minHeight: 48,
    color: "#fff",
    backgroundColor: "#2a2a2a",
    borderWidth: 2,
    borderColor: "#444",
    textAlign: "center",
  },
  countryCode: {
    flex: 0,
    width: 80,
    minWidth: 60,
  },
  areaCode: {
    flex: 0,
    width: 70,
    minWidth: 50,
  },
  phoneNumber: {
    flex: 1,
    minWidth: 100,
  },
  errorText: {
    color: "#ff4444",
    fontSize: 11,
    marginTop: 6,
    fontWeight: "600",
    marginLeft: 5,
  },
  errorTextTabletOrMobile: {
    fontSize: 10,
    marginTop: 5,
  },
  errorTextMobile: {
    fontSize: 9,
    marginTop: 4,
    color: "#ff4444",
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
  submitContainerTabletOrMobile: {
    marginTop: 18,
    paddingTop: 20,
  },
  submitContainerMobile: {
    marginTop: 15,
    paddingTop: 18,
  },
  privacyNote: {
    marginTop: 20,
    alignItems: "center",
  },
  privacyNoteTabletOrMobile: {
    marginTop: 18,
  },
  privacyNoteMobile: {
    marginTop: 15,
  },
  privacyText: {
    fontSize: 12,
    color: "#888",
    textAlign: "center",
    lineHeight: 16,
    marginBottom: 5,
    paddingHorizontal: 10,
  },
  privacyTextTabletOrMobile: {
    fontSize: 11,
    lineHeight: 15,
    marginBottom: 4,
    paddingHorizontal: 8,
  },
  privacyTextMobile: {
    fontSize: 11,
    lineHeight: 16,
    marginBottom: 4,
    paddingHorizontal: 5,
    color: "#888",
    textAlign: "center",
  },
  countryCodeMobile: {
    width: 60,
    minWidth: 50,
  },
  areaCodeMobile: {
    width: 60,
    minWidth: 45,
  },
  phoneNumberMobile: {
    flex: 1,
    minWidth: 80,
  },
});

export default ContactSection;
