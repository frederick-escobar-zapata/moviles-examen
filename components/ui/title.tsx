// En este componente defino un título reutilizable para las pantallas
// así mantengo una tipografía y estilo de encabezado consistente.
import { ReactNode } from "react";
import { StyleProp, StyleSheet, Text, TextStyle } from "react-native";

interface TitleProps {
  // Permito pasar estilos adicionales para personalizar el título
  style?: StyleProp<TextStyle>;
  // El contenido que quiero mostrar dentro del título (puede ser texto o más JSX)
  children: ReactNode;
}

export default function Title({ style, children }: TitleProps) {
  // Combino los estilos base del título con los estilos que reciba por props
  return (
    <Text style={[styles.title, style]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  // Estilo base que quiero reutilizar para todos los títulos de la app
  title: {
    fontSize: 24,
    fontWeight: "800",
    letterSpacing: 0.5,
    color: "#1F2933",
    marginBottom: 16,
    textAlign: "left",
    textShadowColor: "rgba(0, 0, 0, 0.06)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});