// Importa la función registerRootComponent desde el paquete 'expo'.
// Esta función registra el componente raíz de tu aplicación para que pueda ejecutarse correctamente.
import { registerRootComponent } from 'expo';

// Importa el componente principal de tu aplicación desde el archivo 'App.js'.
// Este componente normalmente contiene la estructura principal de tu app.
import App from './App';

// Registra el componente App como el componente raíz de la aplicación.
// Esto asegura que tu aplicación se inicie correctamente, ya sea en desarrollo o en producción.
registerRootComponent(App);
