// En este componente construyo el input para crear nuevas tareas.
// Aquí permito escribir el título y también elegir o tomar una foto.
import IconButton from '@/components/ui/IconButton';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

interface TaskInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onAddTask: () => void;
  onTakePhoto: () => void;
  onPickFromGallery: () => void;
  hasSelectedPhoto: boolean;
}

export default function TaskInput({
  value,
  onChangeText,
  onAddTask,
  onTakePhoto,
  onPickFromGallery,
  hasSelectedPhoto,
}: TaskInputProps) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Escribe una nueva tarea..."
        value={value}
        onChangeText={onChangeText}
      />

      {/* Botón de cámara */}
      <IconButton
        name={hasSelectedPhoto ? 'camera' : 'camera-outline'}
        size={24}
        color={hasSelectedPhoto ? '#10B981' : '#6B7280'}
        onPress={onTakePhoto}
      />

      {/* Botón de galería */}
      <IconButton
        name={hasSelectedPhoto ? 'images' : 'images-outline'}
        size={24}
        color={hasSelectedPhoto ? '#10B981' : '#6B7280'}
        onPress={onPickFromGallery}
      />

      {/* Botón de agregar tarea */}
      <TouchableOpacity style={styles.iconButton} onPress={onAddTask}>
        <Ionicons name="add-circle" size={28} color="#3B82F6" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  // Contenedor horizontal para el input y los iconos
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  // Estilo del TextInput donde escribo el título de la tarea
  input: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    fontSize: 14,
  },
  // Estilo común para los iconos
  iconButton: {
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
