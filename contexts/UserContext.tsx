// En este contexto manejo el estado global de autenticación de mi app.
// Aquí guardo el usuario y el token, los persisto en AsyncStorage
// y expongo helpers como `isLoggedIn` y `logout` para el resto de las pantallas.
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

// Usuario que viene desde mi API Hono
export interface User {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

interface UserContextType {
  user: User | null;
  token: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
  isLoggedIn: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const USER_STORAGE_KEY = 'auth_user';
  const TOKEN_STORAGE_KEY = 'token';

  // Hidratar user + token desde AsyncStorage al iniciar la app
  useEffect(() => {
    const hydrateAuthState = async () => {
      try {
        const [storedUser, storedToken] = await Promise.all([
          AsyncStorage.getItem(USER_STORAGE_KEY),
          AsyncStorage.getItem(TOKEN_STORAGE_KEY),
        ]);

        if (storedUser && storedToken) {
          setUser(JSON.parse(storedUser));
          setToken(storedToken);
        }
      } catch (error) {
        // Si falla la lectura, dejamos al usuario deslogueado silenciosamente
        setUser(null);
        setToken(null);
      }
    };

    hydrateAuthState();
  }, []);

  // Sincronizar cambios de user con AsyncStorage
  useEffect(() => {
    const persistUser = async () => {
      if (user) {
        await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      } else {
        await AsyncStorage.removeItem(USER_STORAGE_KEY);
      }
    };

    persistUser();
  }, [user]);

  // Sincronizar cambios de token con AsyncStorage
  useEffect(() => {
    const persistToken = async () => {
      if (token) {
        await AsyncStorage.setItem(TOKEN_STORAGE_KEY, token);
      } else {
        await AsyncStorage.removeItem(TOKEN_STORAGE_KEY);
      }
    };

    persistToken();
  }, [token]);

  const logout = () => {
    setUser(null);
    setToken(null);
    AsyncStorage.removeItem(USER_STORAGE_KEY);
    AsyncStorage.removeItem(TOKEN_STORAGE_KEY);
  };

  const isLoggedIn = !!user && !!token;

  return (
    <UserContext.Provider
      value={{ user, token, setUser, setToken, logout, isLoggedIn }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
