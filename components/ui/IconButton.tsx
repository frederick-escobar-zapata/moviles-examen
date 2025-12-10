// En este componente encapsulo un botón de icono usando Ionicons
// para reutilizarlo en lugares como el input de tareas.
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';

interface IconButtonProps {
  name: React.ComponentProps<typeof Ionicons>['name'];
  size?: number;
  color?: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export default function IconButton({
  name,
  size = 24,
  color = '#000',
  onPress,
  style,
}: IconButtonProps) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Ionicons name={name} size={size} color={color} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
