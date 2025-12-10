// En esta pantalla Home implemento el CRUD completo de mis tareas
// totalmente conectado al backend (API Hono), usando fotos y ubicación.
import TaskInput from '@/components/tasks/TaskInput';
import TaskList from '@/components/tasks/TaskList';
import Title from '@/components/ui/title';
import type { Task } from '@/constants/types';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { Image, Linking, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUser } from '../../contexts/UserContext';
import { ApiTodo, createTodo, deleteTodo, getTodos, updateTodo, uploadImage } from "../servicios/api";

export default function HomeScreen() {
  const { user } = useUser();

  const [welcomeMessage, setWelcomeMessage] = useState<string>('Cargando...');
  const [todos, setTodos] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');
  const [selectedPhotoUri, setSelectedPhotoUri] = useState<string | undefined>(undefined);

  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [imageModalUri, setImageModalUri] = useState<string | undefined>(undefined);

  const [locationPermissionStatus, setLocationPermissionStatus] = useState<Location.PermissionStatus | null>(null);

  // Mensaje de bienvenida
  useEffect(() => {
    const timer = setTimeout(() => {
      setWelcomeMessage('¡Bienvenido! ');
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Pedir permisos de ubicación al montar
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

  // Cargar tareas desde el backend (fuente única de verdad)
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await getTodos();
        const mapped: Task[] = data.map((todo: ApiTodo) => ({
          id: todo.id,
          title: todo.title,
          completed: todo.completed,
          userEmail: user?.email,
          photoUri: todo.photoUri,
          location: todo.location,
        }));
        setTodos(mapped);
      } catch (error) {
        console.error('Error al cargar tareas desde el backend', error);
      }
    };

    loadTasks();
  }, [user?.email]);

  // Obtener ubicación actual
  const getCurrentLocation = async (): Promise<{ latitude: number; longitude: number } | undefined> => {
    try {
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

  // Tomar foto con la cámara
  const handleTakePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      console.warn('Permiso de cámara denegado');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.7,
    });

    if (result.canceled) return;

    const uri = result.assets[0]?.uri;
    if (uri) {
      setSelectedPhotoUri(uri);
    }
  };

  // Elegir foto desde la galería
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

  // Alternar completado (PATCH /todos/:id)
  const toggleTask = async (id: string) => {
    const current = todos.find(t => t.id === id);
    if (!current) return;

    const updated = await updateTodo(id, { completed: !current.completed });

    setTodos(prev =>
      prev.map(t =>
        t.id === id
          ? {
              ...t,
              completed: updated.completed,
            }
          : t,
      ),
    );
  };

  // Eliminar tarea (DELETE /todos/:id)
  const removeTask = async (id: string) => {
    try {
      await deleteTodo(id);
      setTodos(prev => prev.filter(t => t.id !== id));
    } catch (error) {
      console.error('Error eliminando tarea', error);
    }
  };

  // Ver imagen en modal
  const viewTaskImage = (photoUri?: string) => {
    if (!photoUri) return;
    setImageModalUri(photoUri);
    setImageModalVisible(true);
  };

  // Abrir ubicación en Google Maps
  const openTaskLocation = (location?: { latitude: number; longitude: number }) => {
    if (!location) return;
    const { latitude, longitude } = location;
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    Linking.openURL(url).catch(err => console.error('No se pudo abrir Maps', err));
  };

  // Crear tarea (POST /todos) con foto y ubicación
  const addTask = async (title: string) => {
    if (!title.trim()) return;

    try {
      const location = await getCurrentLocation();

      let remotePhotoUrl: string | undefined;
      if (selectedPhotoUri) {
        remotePhotoUrl = await uploadImage(selectedPhotoUri);
      }

      const created = await createTodo({
        title: title.trim(),
        completed: false,
        location: location,
        photoUri: remotePhotoUrl,
      });

      const newTask: Task = {
        id: created.id,
        title: created.title,
        completed: created.completed,
        userEmail: user?.email,
        photoUri: created.photoUri,
        location: created.location,
      };

      setTodos(prev => [...prev, newTask]);
      setNewTaskTitle('');
      setSelectedPhotoUri(undefined);
    } catch (error) {
      console.error('Error creando tarea', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Title>
          {welcomeMessage + user?.email}
        </Title>
      </View>

      <TaskInput
        value={newTaskTitle}
        onChangeText={setNewTaskTitle}
        onAddTask={() => addTask(newTaskTitle)}
        onTakePhoto={handleTakePhoto}
        onPickFromGallery={handlePickFromGallery}
        hasSelectedPhoto={!!selectedPhotoUri}
      />

      <TaskList
        tasks={todos}
        onToggle={toggleTask}
        onRemove={removeTask}
        onViewImage={viewTaskImage}
        onViewLocation={openTaskLocation}
      />

      <Modal
        visible={imageModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setImageModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {imageModalUri ? (
              <>
                <Image
                  source={{ uri: imageModalUri }}
                  style={styles.modalImage}
                  resizeMode="contain"
                />
                <Text style={styles.modalUrlText} numberOfLines={2}>
                  {imageModalUri}
                </Text>
              </>
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
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F2F6FF',
  },
  header: {
    marginTop: 8,
    marginBottom: 24,
  },
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
    height: '75%',
    borderRadius: 8,
    backgroundColor: '#E5E7EB',
  },
  modalUrlText: {
    marginTop: 8,
    fontSize: 12,
    color: '#4B5563',
    textAlign: 'center',
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
