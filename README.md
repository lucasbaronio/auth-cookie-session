# Auth Cookie Session

¡Bienvenido a Auth Cookie Session!

Este proyecto es un ejemplo de implementación de autenticación básica utilizando Express, cookie-session, jsonwebtoken y Mongoose en Node.js.

## Funcionalidades

- Configuración inicial de un servidor Node.js con Express.
- Implementación de sesiones cookie-session para el manejo de autenticación.
- Creación de endpoints básicos para la autenticación de usuarios utilizando JSON Web Tokens (JWT).
- Integración con MongoDB utilizando Mongoose para el almacenamiento de datos de usuarios.

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado lo siguiente en tu sistema:

- Node.js y npm (Node Package Manager).
- MongoDB (puedes instalarlo localmente o utilizar un servicio de base de datos en la nube).

## Instalación

1. Clona este repositorio en tu máquina local utilizando el siguiente comando:

  ```bash
  git clone https://github.com/lucasbaronio/auth-cookie-session.git
  ```

2. Navega al directorio del proyecto:

  ```bash
  cd auth-cookie-session
  ```

3. Instala las dependencias del proyecto utilizando yarn:

  ```bash
  yarn
  ```

## Configuración
Antes de ejecutar el servidor, asegúrate de configurar las siguientes variables de entorno:

- HTTP_PORT -> Puerto en el que se ejecutará el servidor (por defecto: 3000)
- DATABASE_HOST -> Host donde va a estar levantada la base de datos mongoDB (por defecto: 127.0.0.1)
- DATABASE_PORT -> Puerto que esta levantada la base de datos mongoDB
- DATABASE_USER -> Usuario para acceder a la base de datos mongoDB
- DATABASE_PASSWORD -> Contraseña para acceder a la base de datos mongoDB
- JWT_SECRET -> String con el secret de la generacion del token de JWT
- JWT_EXPIRES_IN -> Tiempo de expiración de los token JWT (ej: 6h)
- COOKIE_SESSION_SECRET -> String con el secret de la cookie
- COOKIE_SESSION_EXPIRES_IN -> Tiempo de expiracion de la cookie en milisegundos (ej: 5400000)

Puedes configurar estas variables de entorno creando un archivo .env en la raíz del proyecto y especificando los valores deseados.

## Uso

Una vez que hayas instalado las dependencias y configurado las variables de entorno, puedes iniciar el servidor ejecutando el siguiente comando:

```bash
yarn start:dev
```
El servidor se ejecutará en el puerto especificado y estará listo para recibir solicitudes.

## Endpoints

El servidor proporciona los siguientes endpoints para la autenticación de usuarios:

// TODO
- POST /registro: Registro de un nuevo usuario.
- POST /login: Inicio de sesión de un usuario existente.
- GET /perfil: Obtiene los datos del perfil del usuario autenticado.

## Contribución

¡Las contribuciones son bienvenidas! Si tienes ideas para mejorar este proyecto, por favor crea una solicitud de extracción o abre un problema para discutir tus ideas.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.

```
Este README.md proporciona una visión general del proyecto, instrucciones de instalación y
configuración, detalles sobre cómo usarlo y cómo contribuir, así como información sobre la
licencia del proyecto. ¡Espero que sea útil para tu proyecto! Si necesitas alguna modificación
o tienes alguna pregunta, ¡no dudes en decírmelo!
```









