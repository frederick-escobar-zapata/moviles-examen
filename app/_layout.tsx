// En este archivo defino la estructura principal de navegación con un Stack.
// Aquí registro la pantalla de login (index), el registro y el grupo de tabs.
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import 'react-native-reanimated';
import { UserProvider } from '../contexts/UserContext';

export default function RootLayout() {
  // Detecto si el dispositivo está en modo claro u oscuro
  const colorScheme = useColorScheme();

  return (
    // Envuelo toda la app con el UserProvider para compartir el usuario logueado
    <UserProvider>
      {/* Aplico un tema oscuro o claro según la configuración del sistema */}
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        {/* Stack principal de navegación */}
        <Stack>
          {/* Pantalla inicial: login (index.tsx), sin header */}
          <Stack.Screen name="index" options={{ headerShown: false }} />
          {/* Pantalla de registro de usuario */}
          <Stack.Screen name="register" options={{ headerShown: false }} />
          {/* Grupo de tabs (carpeta (tabs)), también sin header */}
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
        {/* Configuro la barra de estado del dispositivo */}
        <StatusBar style="auto" />
      </ThemeProvider>
    </UserProvider>
  );
}
