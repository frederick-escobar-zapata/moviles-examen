// En esta pantalla implemento el login principal de mi app.
// Aquí me conecto al backend, guardo el token y redirijo a las tabs.
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";
import { indexStyles } from "../components/styles/indexStyles";
import { useUser } from "../contexts/UserContext";
import { login } from "./servicios/api"; // Importamos la función del backend

export default function LoginScreen() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setUser, setToken } = useUser();

  const handleLogin = async () => {
    setErrorMessage(""); // Limpiar errores previos

    if (!email.trim()) {
      setErrorMessage("Por favor ingresa tu email");
      return;
    }

    if (!password.trim()) {
      setErrorMessage("Por favor ingresa tu contraseña");
      return;
    }

    setIsLoading(true);
    try {
      // 👉 Llamada real al backend (API Hono)
      const data = await login(email.trim(), password.trim());

      // Guardamos el usuario completo y el token en el contexto
      setUser(data.data.user);
      setToken(data.data.token);

      // Navegamos a la pantalla principal
      router.replace("/(tabs)/home");
    } catch (error) {
      setErrorMessage("Credenciales inválidas o error de conexión");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    Alert.alert("Recuperar Contraseña", "¿Deseas recuperar tu contraseña?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Recuperar",
        onPress: () => console.log("Recuperar contraseña"),
      },
    ]);
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
            <Text style={indexStyles.welcomeText}>Bienvenido de nuevo</Text>
            <Text style={indexStyles.subtitle}>Inicia sesión</Text>
          </View>

          <View style={indexStyles.formContainer}>
            {errorMessage ? (
              <View style={indexStyles.errorContainer}>
                <Text style={indexStyles.errorText}>{errorMessage}</Text>
              </View>
            ) : null}

            {/* Campo Email */}
            <View style={indexStyles.inputContainer}>
              <Text style={indexStyles.label}>Email</Text>
              <TextInput
                style={indexStyles.input}
                placeholder="tonic@email.com"
                placeholderTextColor={"#9CA3AF"}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                autoComplete="email"
              />
            </View>

            {/* Campo Contraseña */}
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

            {/* Olvidé contraseña */}
            <TouchableOpacity
              style={indexStyles.forgotPasswordContainer}
              onPress={handleForgotPassword}
            >
              <Text style={indexStyles.forgotPasswordText}>
                ¿Olvidaste tu contraseña?
              </Text>
            </TouchableOpacity>

            {/* Botón de login */}
            <CustomButton
              title={isLoading ? "Cargando..." : "Iniciar Sesión"}
              onPress={handleLogin}
              disabled={isLoading}
              style={indexStyles.loginButton}
            />

            {/* Separador */}
            <View style={indexStyles.separatorContainer}>
              <View style={indexStyles.separatorLine} />
              <Text style={indexStyles.separatorText}>O</Text>
              <View style={indexStyles.separatorLine} />
            </View>

            {/* Botón de registro */}
            <TouchableOpacity
              style={indexStyles.registerButton}
              onPress={() => router.push("/register")}
            >
              <Text style={indexStyles.registerButtonText}>
                ¿No tienes una cuenta?
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}