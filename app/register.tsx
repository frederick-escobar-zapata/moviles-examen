// En esta pantalla implemento el registro de usuario.
// Aquí llamo al backend para crear la cuenta y guardar el token.
import { router } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";
import { indexStyles } from "../components/styles/indexStyles";
import { useUser } from "../contexts/UserContext";
import { register as registerApi } from "./servicios/api";

export default function RegisterScreen() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setUser, setToken } = useUser();

  const handleRegister = async () => {
    setErrorMessage("");

    if (!email.trim()) {
      setErrorMessage("Por favor ingresa tu email");
      return;
    }

    if (!password.trim()) {
      setErrorMessage("Por favor ingresa una contraseña");
      return;
    }

    if (password.trim().length < 6) {
      setErrorMessage("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden");
      return;
    }

    setIsLoading(true);
    try {
      const data = await registerApi(email.trim(), password.trim());

      setUser(data.data.user);
      setToken(data.data.token);

      router.replace("/(tabs)/home");
    } catch (error: any) {
      // Aquí intento mostrar siempre el mensaje real que venga del backend,
      // para entender mejor por qué falló el registro.
      const backendData = error?.response?.data;
      const msg =
        backendData?.error ||
        backendData?.message ||
        backendData?.data?.message ||
        (backendData ? JSON.stringify(backendData) : undefined) ||
        "No se pudo registrar. Intenta con otro email o más tarde.";

      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={indexStyles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={indexStyles.KeyboardAvoidingView}
      >
        <ScrollView
          contentContainerStyle={indexStyles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={indexStyles.header}>
            <View style={indexStyles.logoContainer}>
              <Text style={indexStyles.logoText}>Tonic</Text>
            </View>
            <Text style={indexStyles.welcomeText}>Crear cuenta</Text>
            <Text style={indexStyles.subtitle}>
              Regístrate para comenzar a usar la app
            </Text>
          </View>

          <View style={indexStyles.formContainer}>
            {errorMessage ? (
              <View style={indexStyles.errorContainer}>
                <Text style={indexStyles.errorText}>{errorMessage}</Text>
              </View>
            ) : null}

            <View style={indexStyles.inputContainer}>
              <Text style={indexStyles.label}>Email</Text>
              <TextInput
                style={indexStyles.input}
                placeholder="user@example.com"
                placeholderTextColor={"#9CA3AF"}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                autoComplete="email"
              />
            </View>

            <View style={indexStyles.inputContainer}>
              <Text style={indexStyles.label}>Contraseña</Text>
              <TextInput
                style={indexStyles.input}
                placeholder="******"
                placeholderTextColor={"#9CA3AF"}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <View style={indexStyles.inputContainer}>
              <Text style={indexStyles.label}>Confirmar contraseña</Text>
              <TextInput
                style={indexStyles.input}
                placeholder="******"
                placeholderTextColor={"#9CA3AF"}
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            </View>

            <CustomButton
              title={isLoading ? "Creando cuenta..." : "Registrarse"}
              onPress={handleRegister}
              disabled={isLoading}
              style={indexStyles.loginButton}
            />

            <View style={indexStyles.separatorContainer}>
              <View style={indexStyles.separatorLine} />
              <Text style={indexStyles.separatorText}>O</Text>
              <View style={indexStyles.separatorLine} />
            </View>

            <TouchableOpacity
              style={indexStyles.registerButton}
              onPress={() => router.replace("/")}
            >
              <Text style={indexStyles.registerButtonText}>
                ¿Ya tienes una cuenta? Inicia sesión
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
