Realizado por Tatiana Diaz e Ivan Aragon

# Crear archivo .env:
La base de datos se realizo con MongoDB Atlas

    .env
    PORT=5000
    MONGO_URI=mongodb+srv://reto_devlock_db:admin123@reto.qz762fo.mongodb.net/?appName=Reto
    JWT_SECRET=jwt_llave_secreta


# Ejecutar la Aplicacion

    npm run dev || npm start


# Endpoints de la API

    La URL base para todos los endpoints es localhost:5000/api/v1

# Autenticación ( /auth)

-   `POST /auth/register: Registrar un nuevo usuario
    -   Body: { "nombre": "Nombre",
                "email": "ejemplo@email.com",
                "password": "contraseña" }

-   `POST /auth/login: Iniciar sesion
    -   Body:{"email": "ejemplo@email.com",
             "password": "contraseña" }

# Snippets ( /snippets)

Nota: Todos estos endpoints requieren un token de autenticacion, asi que se debe incluir el token jwt en el encabezado Authorization de las solicitudes como Bearer <token>

-   POST /snippets: Crear un nuevo snippet
        Body: { "title": "Snippet",
                "language": "javascript",
                "code": "console.log('Hola');",
                "tags": ["ejemplo"] }

-   GET /snippets: Listar todos los snippets del usuario autenticado

-   PUT /snippets/:id: Actualizar un snippet por su ID
        Body: { "title": "Título actualizado",
                "language": "javascript",
                "code": "console.log('Hola Mundo');" }

-   DELETE /snippets/:id: Borrar un snippet por su ID
