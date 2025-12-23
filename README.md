# 📱 Aplicación de Login - React Native con TypeScript

Esta es una aplicación de login desarrollada con **React Native**, **Expo** y **TypeScript** que implementa autenticación básica y navegación por tabs.
aca tengo las dos evalauciones , parte 1 y parte 2


--------------Evalaucion 1 ----------------
## 🚀 Características

- ✅ **Pantalla de Login** con validación de credenciales
- ✅ **Navegación con Expo Router** 
- ✅ **TypeScript** para tipado estático
- ✅ **Manejo de estado** con React Context
- ✅ **Tabs de navegación** (Home y Perfil)
- ✅ **Funciona en web y móvil**

## 🔐 Credenciales de Acceso

- **Email:** Cualquier email esto no esta válidado
- **Contraseña:** `1234` solo con esta contraseña

## 📁 Estructura del Proyecto

```
app/
├── _layout.tsx          # Layout principal
├── index.tsx            # Pantalla de Login
└── (tabs)/              # Grupo de tabs
    ├── _layout.tsx      # Layout de tabs
    ├── home.tsx         # Pantalla principal
    └── profile.tsx      # Pantalla de perfil
contexts/
└── UserContext.tsx      # Context para manejo de estado
```

## 🛠️ Instalación y Ejecución

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Iniciar el servidor de desarrollo:**
   ```bash
   npx expo start
   ```

3. **Abrir la aplicación:**
   - Escanea el código QR con Expo Go (móvil)
   - Presiona `w` para abrir en navegador web
   - Presiona `a` para abrir en emulador Android
   - Presiona `i` para abrir en simulador iOS

## 📱 Funcionalidades

### Login
- Validación de email (NO requerido)
- Validación de contraseña (debe ser "1234")
- Mensajes de error visuales
- Navegación automática después del login exitoso
- Manejo de estados entre vistas

### Navegación
- **Tab Home:** Pantalla de bienvenida,  con usuario logueado
- **Tab Perfil:** Muestra el email del usuario logueado

### Estado Global
- Utiliza React Context para compartir datos del usuario
- Manejo de estado con `useState` y `useContext`

## 🎥 Demo de la Aplicación Evaluacion 1

**[📺 Ver demostración en navegador](https://youtu.be/l9SIKcMTq68)**
**[📺 Ver demostración en telefono](https://youtube.com/shorts/-A1yolJuOPI)**

*Demostración de la aplicación de login funcionando en el navegador*

## 📦 Repositorio

**[🔗 Repositorio GitHub](https://github.com/frederick-escobar-zapata/AppMoviles-eva1)**

*Código fuente completo del proyecto*



--------------Evaluación 2 ----------------
## 🧪 Evaluación 2 – Aplicación de Lista de Tareas con Fotos y Ubicación

En la Evaluación 2 se extiende la app anterior agregando una pantalla de tareas asociadas al usuario logueado. Cada tarea puede tener foto, ubicación y estado de completado.

### 🚀 Características principales

- ✅ Lista de tareas por usuario
- ✅ Crear tareas con título
- ✅ Marcar tareas como completadas / no completadas
- ✅ Eliminar tareas
- ✅ Adjuntar foto a la tarea:
  - Desde **cámara**
  - Desde **galería**
- ✅ Ver un **icono de imagen** en la tarea si tiene foto
- ✅ Mostrar la imagen en un **modal** a pantalla ampliada
- ✅ Guardar **ubicación** (latitud / longitud) al crear la tarea
- ✅ Ver un **icono de ubicación** si la tarea tiene coordenadas
- ✅ Abrir la ubicación en **Google Maps** desde la tarea
- ✅ Guardar tareas en **AsyncStorage** separadas por usuario
- ✅ Componentes reutilizables:
  - `TaskInput` (input + iconos)
  - `TaskList` (renderizado de lista)
  - `TaskItem` (item con iconos)
  - `Title`
  - `ErrorMessage`

### 📁 Estructura relevante de Evaluación 2

```text

app/
└── (tabs)/
    ├── home.tsx          # Pantalla principal de tareas (crear, listar, fotos, ubicación)
    └── profile.tsx       # Perfil del usuario + logout
components/
├── task-item.tsx         # Item individual de tarea (toggle, borrar, foto, ubicación)
├── tasks/
│   ├── TaskInput.tsx     # Input + iconos (cámara, galería, agregar)
│   └── TaskList.tsx      # Lista de tareas (map de TaskItem)
└── ui/
    ├── title.tsx         # Componente de título reutilizable
    ├── ErrorMessage.tsx  # Mensajes de error reutilizables
    └── icon-symbol.tsx   # Wrapper de iconos (SF Symbols)
constants/
└── types.ts              # Definición de Task (id, title, completed, userEmail, photoUri, location)
```

### 📱 Flujo de la pantalla Home (Eval 2)

1. Muestra saludo con el email del usuario logueado.
2. Permite escribir una nueva tarea:
   - Icono de **cámara**: abre la cámara del sistema y asocia la foto a la próxima tarea.
   - Icono de **galería**: abre la galería y asocia la foto seleccionada.
   - Icono **“+”**: crea la tarea con título, foto (opcional) y ubicación (si los permisos lo permiten).
3. Lista de tareas:
   - Círculo para marcar la tarea como completada / no completada.
   - Título de la tarea.
   - Icono de **imagen** si tiene foto: abre un modal con la foto grande.
   - Icono de **ubicación** si tiene coordenadas: abre Google Maps en la posición guardada.
   - Icono de **papelera**: elimina la tarea.

### 💾 Persistencia y asociación por usuario

- Cada usuario (email) tiene su propio conjunto de tareas.
- Las tareas se guardan en AsyncStorage con claves del tipo:
  - `tasks_<email>`
- Al iniciar sesión con otro email, se cargan o inicializan las tareas correspondientes a ese usuario.

### 🎥 Demo de la Aplicación Evaluación 2

*(Link de Demo app:)*

- **[📺 Demo Eval 2 en teléfono](https://www.canva.com/design/DAG5iuG99WI/82xtUyxbYvrXhA2bwXPxYA/edit?utm_content=DAG5iuG99WI&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)**


### 📦 Repositorio Evaluación 2

**[🔗 Repositorio GitHub Evaluación 2](https://github.com/frederick-escobar-zapata/AppMoviles-eva2)**

---

## 🧰 Tecnologías Utilizadas (ambas evaluaciones)

- **React Native** – Framework de desarrollo móvil
- **Expo** – Plataforma de desarrollo
- **TypeScript** – Tipado estático
- **Expo Router** – Navegación basada en archivos
- **React Context** – Manejo de estado global de usuario
- **AsyncStorage** – Persistencia local de tareas
- **expo-image-picker** – Cámara y galería
- **expo-location** – Ubicación del dispositivo

## 👨‍💻 Desarrollado por

**Bastian Ceron**    
**Gonzalo Croft**
**Frederick Escobar**  


## 🔐 Credenciales de Acceso

- **Email:** Cualquier email esto no esta válidado
- **Contraseña:** `1234` solo con esta contraseña

*Proyecto académico desarrollado con fines educativos*


--------------Evaluación 3 ----------------

## Evaluación 3 – Integración con API Hono (backend remoto)

En la Evaluación 3 llevo la app un paso más allá conectándola a un **backend real** desplegado en Cloudflare Workers con **Hono**:

- URL base (configurada por variable de entorno):
  - `EXPO_PUBLIC_API_URL=https://basic-hono-api.borisbelmarm.workers.dev`
- Toda la lógica del backend la centralizo en `app/servicios/api.tsx`, donde:
  - Configuro **Axios** con `baseURL` y un **interceptor** que agrega el `Authorization: Bearer <token>` a cada request.
  - Implemento los endpoints de autenticación: `POST /auth/register` y `POST /auth/login`.
  - Expongo el CRUD de tareas: `GET /todos`, `POST /todos`, `PATCH /todos/:id`, `DELETE /todos/:id`.
  - Implemento subida de imágenes con `POST /images` usando `multipart/form-data`.

### Autenticación contra el backend

- En `app/index.tsx` (`LoginScreen`) llamo a `login(email, password)`:
  - Si la API responde OK, guardo el **token** en `AsyncStorage` y en el `UserContext`.
  - Navego automáticamente al grupo de tabs `/(tabs)/home`.
- En `app/register.tsx` (`RegisterScreen`) llamo a `registerApi` para crear un nuevo usuario:
  - Si el backend devuelve error (por ejemplo, email ya registrado), muestro el mensaje real en pantalla.
- En `contexts/UserContext.tsx`:
  - Hidrato `user` y `token` desde `AsyncStorage` al iniciar la app.
  - Expongo `isLoggedIn` y `logout`.
- En `app/(tabs)/_layout.tsx`:
  - Solo renderizo las tabs si `isLoggedIn` es `true`; si no, hago `Redirect` al login.

### Todo List 100% conectado al backend

En la nueva pantalla `app/(tabs)/home.tsx`:

- Al montar la pantalla llamo a `getTodos()` para obtener las tareas **desde el backend**; ya no uso AsyncStorage como fuente principal.
- Para crear una tarea:
  - Pido permisos de **ubicación** (`expo-location`) y obtengo `latitude` / `longitude`.
  - Permito tomar una foto con la cámara o elegirla desde la galería (`expo-image-picker`).
  - Subo la imagen a la API con `uploadImage(uri)` (`POST /images`), que me devuelve la URL guardada.
  - Llamo a `createTodo({ title, completed: false, location, photoUri })` (`POST /todos`).
  - Agrego la tarea devuelta al estado local para que se vea inmediatamente.
- Para marcar una tarea como completada / no completada:
  - Llamo a `updateTodo(id, { completed: !current.completed })` (`PATCH /todos/:id`).
- Para eliminar una tarea:
  - Llamo a `deleteTodo(id)` (`DELETE /todos/:id`).
- Todas las tareas quedan **asociadas al usuario autenticado** porque el backend infiere el usuario por el token enviado en el header.

### Manejo de imágenes con backend

- Al crear una tarea, si hay una foto seleccionada:
  - Construyo un `FormData` en `uploadImage` y envío el archivo a `POST /images`.
  - El backend responde con una ruta relativa (`data.url`) y yo la convierto en URL absoluta usando `API_URL + data.url`.
  - Guardo esa URL en el campo `photoUri` de la tarea.
- En la lista (`TaskList` + `TaskItem`):
  - Si una tarea tiene `photoUri`, muestro un icono de imagen.
  - Al tocar el icono, abro un **modal** en `home.tsx` donde:
    - Renderizo la imagen desde la URL devuelta por Hono.
    - Muestro también la **URL como texto**, para evidenciar que viene del backend.

### Ubicación con Google Maps

- Cuando creo una tarea intento obtener la ubicación actual del dispositivo.
- Si la tarea tiene coordenadas, muestro un icono de ubicación.
- Al presionar ese icono, abro Google Maps en la posición guardada usando un `Linking.openURL` con una URL del tipo:
  - `https://www.google.com/maps?q=<latitude>,<longitude>`.

### Resumen técnico Evaluación 3

- Autenticación y registro contra backend remoto (Hono API).
- Token guardado en `AsyncStorage` y contexto global.
- Rutas protegidas: las tabs solo se muestran si el usuario está autenticado.
- Todo List completamente sincronizado con el servidor (sin almacenamiento local como fuente de verdad).
- Subida de imágenes con `multipart/form-data` y uso de la URL que entrega el servidor.
- Manejo de ubicación y apertura en Google Maps desde cada tarea.

## Enlaces de video para demostracion en WEB

- https://youtube.com/shorts/03285MiVlQ8?feature=share

## Enlaces de video para demostracion en EXPO

- https://youtube.com/shorts/sXgLPdpyc-U?feature=share


## integrantes

- Gonzalo Croft         / seccion 51      
- Bastian Ceron         / seccion 50
- Frederick Escobar     / seccion 50



## EXAMEN TRANSVERSAL  

### Manejo de imágenes con backend

- Al crear una tarea, si hay una foto seleccionada:
  - Construyo un `FormData` en `uploadImage` y envío el archivo a `POST /images`.
  - El backend responde con una ruta relativa (`data.url`) y yo la convierto en URL absoluta usando `API_URL + data.url`.
  - Guardo esa URL en el campo `photoUri` de la tarea.
- En la lista (`TaskList` + `TaskItem`):
  - Si una tarea tiene `photoUri`, muestro un icono de imagen.
  - Al tocar el icono, abro un **modal** en `home.tsx` donde:
    - Renderizo la imagen desde la URL devuelta por Hono.
    - Muestro también la **URL como texto**, para evidenciar que viene del backend.

### Ubicación con Google Maps

- Cuando creo una tarea intento obtener la ubicación actual del dispositivo.
- Si la tarea tiene coordenadas, muestro un icono de ubicación.
- Al presionar ese icono, abro Google Maps en la posición guardada usando un `Linking.openURL` con una URL del tipo:
  - `https://www.google.com/maps?q=<latitude>,<longitude>`.

### Resumen técnico Examen transversal

- Autenticación y registro contra backend remoto (Hono API).
- Token guardado en `AsyncStorage` y contexto global.
- Rutas protegidas: las tabs solo se muestran si el usuario está autenticado.
- Todo List completamente sincronizado con el servidor (sin almacenamiento local como fuente de verdad).
- Subida de imágenes con `multipart/form-data` y uso de la URL que entrega el servidor.
- Manejo de ubicación y apertura en Google Maps desde cada tarea.

### Explicación personal de lo que hicimos en la Evaluación 3

En esta tercera evaluación llevamos la aplicación desde un manejo local de datos a trabajar completamente contra un backend real. Nuestro objetivo fue que el listado de tareas, las imágenes y la ubicación quedaran siempre sincronizados con la API en Hono, usando el token de autenticación para asociar todo al usuario que está logueado.

Para ordenar la lógica de las tareas, decidimos concentrar todo en un custom hook llamado `useTodos`. En este hook mantenemos el estado de las tareas, el estado de carga y los posibles errores. También definimos las funciones que necesitamos desde la interfaz: `addTask`, `toggleTask`, `removeTask` y `reload`. De esta manera, en la pantalla `home.tsx` solo consumimos el hook y la vista queda mucho más limpia, enfocada en cómo mostrar la información y no en los detalles de red.

Internamente, el hook se conecta directamente con la API que definimos en `app/servicios/api.tsx`. Cuando llamamos a `reload`, ejecutamos `getTodos()` contra el backend y luego transformamos la respuesta al tipo `Task` que usamos en toda la app, usando la función `mapApiTodoToTask`. Así mantenemos una sola estructura de datos en el resto del proyecto, independiente de cómo venga exactamente la respuesta del servidor.

Para crear una tarea, en `addTask` primero validamos el título y, si hay una foto, llamamos a `uploadImage` para subir la imagen al backend. Con la URL que nos devuelve el servidor llamamos a `createTodo`, guardamos la nueva tarea y la agregamos al estado local para que aparezca inmediatamente en la lista. Cuando queremos marcar una tarea como completada o desmarcarla, usamos `toggleTask`, que llama a `updateTodo` en el backend y después actualiza solo esa tarea en el estado. Finalmente, con `removeTask` llamamos a `deleteTodo` y filtramos la tarea eliminada del arreglo local.

Con esta organización sentimos que la aplicación quedó más escalable y fácil de mantener. Si en el futuro cambiara la API o la forma de guardar los datos, solo tendríamos que ajustar la capa de servicios y el hook `useTodos`, sin tocar la lógica de las pantallas.

## Enlaces de video para demostracion en WEB

- https://youtube.com/shorts/03285MiVlQ8?feature=share

## Enlaces de video para demostracion en EXPO

- https://youtube.com/shorts/sXgLPdpyc-U?feature=share

## Enlaces para la respuestas 

- https://www.canva.com/design/DAG8KvhUk1Q/vCn3xebxLozUlP-0drOCiw/edit?utm_content=DAG8KvhUk1Q&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton


## integrantes

- Gonzalo Croft         / seccion 51      
- Bastian Ceron         / seccion 50
- Frederick Escobar     / seccion 50
