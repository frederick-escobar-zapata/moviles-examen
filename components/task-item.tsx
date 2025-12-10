// En este componente represento visualmente una tarea individual de la lista.
// Aquí marco la tarea como completada, la puedo eliminar, ver su foto o su ubicación.
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Task } from "../constants/types";
import { IconSymbol } from "./ui/icon-symbol";

interface TaskItemProps {
  // Tarea completa que voy a mostrar
  task: Task;
  // Función que se ejecuta cuando quiero alternar el estado de completado
  onToggle: () => void;
  // Función que se ejecuta cuando quiero eliminar la tarea
  onRemove: (id: string | number) => void;
  // Nueva función para ver la imagen asociada a la tarea
  onViewImage: () => void;
  // Nueva función para ver la ubicación asociada a la tarea
  onViewLocation: () => void;
}

export default function TaskItem({ task, onToggle, onRemove, onViewImage, onViewLocation }: TaskItemProps) {
  return (
    <View style={styles.container}>
      {/* Botón circular que marca o desmarca la tarea como completada */}
      <TouchableOpacity
        style={[styles.circle, task.completed && styles.completedCircle]}
        onPress={onToggle}
      />

      {/* Título de la tarea */}
      <Text
        style={[
          styles.title,
          task.completed && styles.completedItem,
        ]}
        numberOfLines={2}
      >
        {task.title}
      </Text>

      {/* Acciones a la derecha: icono imagen, ubicación y papelera */}
      <View style={styles.rightActions}>
        {/* Icono de imagen solo si la tarea tiene photoUri */}
        {task.photoUri && (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={onViewImage}
          >
            <Ionicons name="image" size={18} color="#10B981" />
          </TouchableOpacity>
        )}

        {/* Icono de ubicación solo si la tarea tiene location */}
        {task.location && (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={onViewLocation}
          >
            <Ionicons name="location" size={20} color="#F97316" />
          </TouchableOpacity>
        )}

        {/* Papelera */}
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => onRemove(task.id)}
        >
          <IconSymbol name="trash.circle" size={24} color="#FF3830" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Contenedor principal de cada item de tarea, alineado en fila
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    padding: 12,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  // Círculo a la izquierda que indica el estado de la tarea
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#4CAF50",
    backgroundColor: "#fff",
    marginRight: 12,
  },
  // Relleno el círculo cuando la tarea está completada
  completedCircle: {
    backgroundColor: "#4CAF50",
  },
  // Estilo base del texto de la tarea
  title: {
    fontSize: 16,
    color: "#333",
    flex: 1,
    flexShrink: 1,
  },
  // Estilo adicional cuando la tarea está completada (gris y tachado)
  completedItem: {
    color: "#999",
    textDecorationLine: "line-through",
  },
  // Contenedor de las acciones del lado derecho (icono de imagen, ubicación y papelera)
  rightActions: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
  },
  iconButton: {
    padding: 4,
    marginLeft: 4,
  },
});
