// En este archivo defino la navegación por pestañas de mi app
// y además protejo estas pantallas para que solo entren usuarios logueados.
import { Ionicons } from '@expo/vector-icons';
import { Redirect, Tabs } from 'expo-router';
import React from 'react';
import { useUser } from '../../contexts/UserContext';

export default function TabLayout() {
  const { isLoggedIn } = useUser();

  if (!isLoggedIn) {
    return <Redirect href="/" />;
  }

  // Retorno el componente Tabs que configura las diferentes pestañas inferiores
  return (
    <Tabs
      screenOptions={{
        // Color del icono cuando la pestaña está activa
        tabBarActiveTintColor: '#007AFF',
        // Oculto el header porque no lo necesito en estas vistas
        headerShown: false,
      }}>
      <Tabs.Screen
        name="home"
        options={{
          // Título que se muestra en la pestaña
          title: 'Home',
          // Icono que se usa para la pestaña de Home
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          // Título de la pestaña de Perfil
          title: 'Perfil',
          // Icono que se usa para la pestaña de Perfil
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'person' : 'person-outline'} color={color} size={24} />
          ),
        }}
      />
      
    </Tabs>
  );
}
