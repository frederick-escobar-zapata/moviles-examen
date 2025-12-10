// En este archivo centralizo todas las llamadas HTTP de mi app.
// Aquí configuro Axios, adjunto automáticamente el token y conecto el login,
// el registro, el CRUD de tareas y la subida de imágenes contra el backend.
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Platform } from "react-native";

const API_URL = process.env.EXPO_PUBLIC_API_URL ?? "https://basic-hono-api.borisbelmarm.workers.dev";

// Tipos para la API de todos
export interface TodoLocation {
  latitude: number;
  longitude: number;
}

export interface ApiTodo {
  id: string;
  userId: string;
  title: string;
  completed: boolean;
  location?: TodoLocation;
  photoUri?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTodoPayload {
  title: string;
  completed?: boolean;
  location?: TodoLocation;
  photoUri?: string;
}

export interface UpdateTodoPayload {
  title?: string;
  completed?: boolean;
  location?: TodoLocation;
  photoUri?: string;
}

// Configuración base de Axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor: agrega automáticamente el token en cada request
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ======================
// Endpoints del backend
// ======================

// Registro
export const register = async (email: string, password: string) => {
  const res = await api.post("/auth/register", { email, password });
  await AsyncStorage.setItem("token", res.data.data.token);
  return res.data;
};

// Login
export const login = async (email: string, password: string) => {
  const res = await api.post("/auth/login", { email, password });
  await AsyncStorage.setItem("token", res.data.data.token);
  return res.data;
};

// Obtener todos del usuario autenticado
export const getTodos = async (): Promise<ApiTodo[]> => {
  const res = await api.get("/todos");
  return res.data.data as ApiTodo[];
};

// Crear todo
export const createTodo = async (payload: CreateTodoPayload): Promise<ApiTodo> => {
  const res = await api.post("/todos", payload);
  return res.data.data as ApiTodo;
};

// Actualizar todo (PATCH parcial)
export const updateTodo = async (
  id: string,
  payload: UpdateTodoPayload,
): Promise<ApiTodo> => {
  const res = await api.patch(`/todos/${id}`, payload);
  return res.data.data as ApiTodo;
};

// Eliminar todo
export const deleteTodo = async (id: string): Promise<void> => {
  await api.delete(`/todos/${id}`);
};

// Subir imagen asociada a un todo
export const uploadImage = async (uri: string): Promise<string> => {
  const formData = new FormData();

  if (Platform.OS === "web") {
    // En web, la URI es una URL que podemos fetchear y convertir en Blob
    const response = await fetch(uri);
    const blob = await response.blob();
    formData.append("image", blob, "photo.jpg");
  } else {
    // En nativo (Android/iOS), usamos el formato específico con uri
    formData.append("image", {
      uri,
      name: "photo.jpg",
      type: "image/jpeg",
    } as any);
  }

  const res = await api.post("/images", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  const relativeUrl: string = res.data.data.url;
  // Devuelvo la URL completa para usarla directamente en <Image />
  return `${API_URL}${relativeUrl}`;
};