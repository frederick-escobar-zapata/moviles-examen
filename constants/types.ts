// Aquí defino la interfaz Task que uso en toda mi app
// para representar una tarea con su estado, foto y ubicación.
export interface Task {
  // Identificador único de la tarea
  id: string;
  // Título o descripción corta de la tarea
  title: string;
  // Indica si la tarea está completada o no
  completed: boolean;

  // Email del usuario dueño de la tarea
  // Lo dejo opcional porque aún no lo estoy usando en todas partes,
  // pero más adelante lo rellenaré al crear una tarea.
  userEmail?: string; // email del usuario dueño de la tarea

  // Ruta/URI de la foto asociada a la tarea
  // Más adelante la rellenaré cuando integre cámara / galería.
  photoUri?: string; // foto asociada a la tarea

  // Ubicación donde se creó la tarea
  // Guardo latitud y longitud como número.
  // location?: {
  //   latitude: number;
  //   longitude: number;
  // };
  location?: {
    latitude: number;
    longitude: number;
  };
}