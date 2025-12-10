// En esta versión alternativa de Home muestro el saludo al usuario logueado
// y manejo la lista de tareas con almacenamiento local (versión anterior).
import TaskInput from '@/components/tasks/TaskInput';
import TaskList from '@/components/tasks/TaskList';
import Title from '@/components/ui/title';
import type { Task } from '@/constants/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { Image, Linking, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUser } from '../../contexts/UserContext';
import { getTodos } from "../servicios/api"; // 👈 función del backend



// Función auxiliar para construir la clave de almacenamiento por usuario
function getTasksStorageKey(email: string) {
  // Uso el email en la clave para separar las tareas por usuario
  return `tasks_${email}`;
}

export default function HomeScreen() {
  // Obtengo el usuario actual desde el contexto
  const { user } = useUser();
  // Mensaje de bienvenida que simulo cargar con un pequeño delay
  const [welcomeMessage, setWelcomeMessage] = useState<string>('Cargando...');
  // Estado con la lista de tareas (las lleno desde AsyncStorage o con las iniciales)
  const [todos, setTodos] = useState<Task[]>([]);
  // Estado para manejar el texto de la nueva tarea a agregar
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');
  // Estado para guardar la foto seleccionada para la próxima tarea
  const [selectedPhotoUri, setSelectedPhotoUri] = useState<string | undefined>(undefined);

  // Estado para el modal de imagen
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [imageModalUri, setImageModalUri] = useState<string | undefined>(undefined);

  // Estado para permisos de ubicación (solo para saber si tengo o no)
  const [locationPermissionStatus, setLocationPermissionStatus] = useState<Location.PermissionStatus | null>(null);

  useEffect(() => {
    // Simulo una carga inicial del mensaje de bienvenida
    const timer = setTimeout(() => {
      setWelcomeMessage('¡Bienvenido! ');
    }, 1000);
    // Limpio el timer cuando el componente se desmonte
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
  const debugToken = async () => {
    const token = await AsyncStorage.getItem("token");
    console.log("🔐 TOKEN GUARDADO:", token);
  };
  debugToken();
}, []);

  // Pido permisos de ubicación al montar el componente
  useEffect(() => {
    const requestLocationPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setLocationPermissionStatus(status);
      if (status !== 'granted') {
        console.warn('Permiso de ubicación denegado');
      }
    };
    requestLocationPermission();
  }, []);

  // Cuando tengo un usuario con email, intento cargar sus tareas desde AsyncStorage
  useEffect(() => {
  const loadTasksFromAPI = async () => {
    try {
      const data = await getTodos();
      setTodos(data);
    } catch (error) {
      console.error("Error al cargar tareas desde el backend", error);
    }
  };

  loadTasksFromAPI();
}, []);

  // Cada vez que cambian las tareas y tengo un usuario, las guardo en AsyncStorage
  useEffect(() => {
    const saveTasksForUser = async () => {
      // Solo guardo si tengo usuario con email
      if (!user?.email) return;

      try {
        const storageKey = getTasksStorageKey(user.email);
        // Convierto las tareas a JSON y las guardo
        await AsyncStorage.setItem(storageKey, JSON.stringify(todos));
      } catch (error) {
        console.error('Error guardando tareas en AsyncStorage', error);
      }
    };

    // Evito guardar al inicio cuando todavía no se han cargado tareas
    if (todos.length > 0 || user?.email) {
      saveTasksForUser();
    }
  }, [todos, user?.email]);

  // Función auxiliar para obtener ubicación actual
  const getCurrentLocation = async (): Promise<{ latitude: number; longitude: number } | undefined> => {
    try {
      // Si no tengo permisos, intento pedirlos una vez más
      if (locationPermissionStatus !== 'granted') {
        const { status } = await Location.requestForegroundPermissionsAsync();
        setLocationPermissionStatus(status);
        if (status !== 'granted') {
          console.warn('Sin permisos de ubicación');
          return undefined;
        }
      }

      const loc = await Location.getCurrentPositionAsync({});
      return {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      };
    } catch (error) {
      console.warn('No se pudo obtener la ubicación actual', error);
      return undefined;
    }
  };

  // Tomo una foto con la cámara del sistema y guardo su URI para la próxima tarea
  const handleTakePhoto = async () => {
    // Pido permisos a través de image-picker (cámara del sistema)
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      console.warn('Permiso de cámara denegado');
      return;
    }

    // Abro la cámara del sistema
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.7,
    });

    // Si el usuario canceló, no hago nada
    if (result.canceled) return;

    // Tomo la uri de la foto capturada
    const uri = result.assets[0]?.uri;
    if (uri) {
      setSelectedPhotoUri(uri);
    }
  };

  // Nuevo: elegir una foto desde la galería y guardarla para la próxima tarea
  const handlePickFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      console.warn('Permiso de galería denegado');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (result.canceled) return;

    const uri = result.assets[0]?.uri;
    if (uri) {
      setSelectedPhotoUri(uri);
    }
  };

  // Esta función invierte el estado completed de una tarea según su id
  const toggleTask = (id: string) => {
    setTodos(prev =>
      prev.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t,
      ),
    );
  };

  // Esta función elimina una tarea filtrando por id
  const removeTask = (id: string) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  // Abrir el modal con la imagen de una tarea
  const viewTaskImage = (photoUri?: string) => {
    if (!photoUri) return;
    setImageModalUri(photoUri);
    setImageModalVisible(true);
  };

  // NUEVO: abrir ubicación de la tarea en Google Maps
  const openTaskLocation = (location?: { latitude: number; longitude: number }) => {
    if (!location) return;
    const { latitude, longitude } = location;
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    Linking.openURL(url).catch(err => console.error('No se pudo abrir Maps', err));
  };

  // Hago addTask síncrono en la interfaz, y dejo la obtención de ubicación como mejor esfuerzo
  const addTask = (title: string) => {
    // No permito tareas vacías
    if (!title.trim()) return;

    // Guardo la foto actual en una variable local para que no se pierda
    const currentPhotoUri = selectedPhotoUri;

    // Creo la tarea primero (sin bloquear la UI)
    const baseTask: Task = {
      id: Date.now().toString(), // id único basado en timestamp
      title: title.trim(),
      completed: false,
      userEmail: user?.email,
      photoUri: currentPhotoUri, // uso la copia local de la foto
    };

    // Agrego la tarea inmediatamente al estado para que se vea al instante
    setTodos(prev => [...prev, baseTask]);
    setNewTaskTitle('');
    // Limpio la foto para la siguiente tarea
    setSelectedPhotoUri(undefined);

    // Luego, en segundo plano, intento obtener ubicación y actualizar esa tarea
    (async () => {
      const location = await getCurrentLocation();
      if (!location) return;

      setTodos(prev =>
        prev.map(t =>
          t.id === baseTask.id ? { ...t, location } : t,
        ),
      );
    })();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Encabezado con el mensaje de bienvenida y el email del usuario */}
      <View style={styles.header}>
        <Title>
          {welcomeMessage + user?.email}
        </Title>
      </View>

      {/* Input de nueva tarea componetizado */}
      <TaskInput
        value={newTaskTitle}
        onChangeText={setNewTaskTitle}
        onAddTask={() => addTask(newTaskTitle)}
        onTakePhoto={handleTakePhoto}
        onPickFromGallery={handlePickFromGallery}
        hasSelectedPhoto={!!selectedPhotoUri}
      />

      {/* Lista de tareas componetizada */}
      <TaskList
        tasks={todos}
        onToggle={toggleTask}
        onRemove={removeTask}
        onViewImage={viewTaskImage}
        // pasamos la función para abrir ubicación
        onViewLocation={openTaskLocation}
      />

      {/* Modal para mostrar la imagen en grande */}
      <Modal
        visible={imageModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setImageModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {imageModalUri ? (
              <Image
                source={{ uri: imageModalUri }}
                style={styles.modalImage}
                resizeMode="contain"
              />
            ) : null}
            <Pressable
              style={styles.modalCloseButton}
              onPress={() => setImageModalVisible(false)}
            >
              <Text style={styles.modalCloseText}>Cerrar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Estilos generales del contenedor de la pantalla Home
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F2F6FF',
  },
  // Margen para separar el header del resto del contenido
  header: {
    marginTop: 8,
    marginBottom: 24,
  },
  // Estos estilos se usaron para variaciones de texto, los mantengo por si los reutilizo
  welcomeTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1F2933',
    marginBottom: 4,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#52606D',
  },
  welcomeEmail: {
    fontWeight: '600',
    color: '#3B82F6',
  },
  section: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2933',
    marginBottom: 12,
  },
  // Contenedor tipo “card” para agrupar tareas (si quisiera usarlo luego)
  tasksCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E1E7F0',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  tasksPlaceholder: {
    fontSize: 14,
    color: '#6B7280',
  },
  // Estilos del modal de imagen
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    height: '70%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: '100%',
    height: '85%',
    borderRadius: 8,
    backgroundColor: '#E5E7EB',
  },
  modalCloseButton: {
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#111827',
  },
  modalCloseText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
