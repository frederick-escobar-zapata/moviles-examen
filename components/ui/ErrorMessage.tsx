// En este componente muestro de forma clara los mensajes de error
// que quiero enseñar al usuario debajo de los formularios.
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ErrorMessageProps {
  message?: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffebee',
    borderColor: '#f44336',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  text: {
    color: '#f44336',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
  },
});
