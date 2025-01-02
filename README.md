# ISA Authentication System

Sistema de autenticación responsivo desarrollado con Next.js y Supabase, que permite a los usuarios registrarse e iniciar sesión a través de correo electrónico/número de teléfono, contraseña o Google OAuth.

## Características

- 🔐 Autenticación con email/teléfono y contraseña
- 🌐 Inicio de sesión con Google
- 📱 Diseño responsivo
- 🌓 Tema claro/oscuro
- 🔒 Middleware de protección de rutas
- 🐳 Dockerizado para desarrollo y producción

## Requisitos Previos

- Node.js 18 o superior
- Docker y Docker Compose
- Cuenta en Supabase
- Proyecto configurado en Google Cloud Platform (para OAuth)

## Configuración del Proyecto

1. Clonar el repositorio:
```bash
git clone <url-del-repositorio>
cd auth-isa
```

2. Configurar las variables de entorno:
```bash
cp .env.example .env.local
```
Editar `.env.local` con tus credenciales:
- Obtener las credenciales de Supabase desde el panel de control
- Configurar las credenciales de Google OAuth desde Google Cloud Console

3. Configurar OAuth en Supabase:
- Agregar las URLs de redirección en el panel de Supabase:
  - `http://localhost:3000/auth/callback`
  - `http://vscode.descarga-lo.com:3000/auth/callback`

## Desarrollo con Docker

1. Iniciar el contenedor de desarrollo:
```bash
docker-compose up
```

2. Acceder a la aplicación:
- Local: http://localhost:3000
- Desarrollo: http://vscode.descarga-lo.com:3000

## Desarrollo Local (sin Docker)

1. Instalar dependencias:
```bash
npm install
```

2. Iniciar el servidor de desarrollo:
```bash
npm run dev
```

## Producción con Docker

1. Construir la imagen:
```bash
docker build -t isa-auth .
```

2. Ejecutar el contenedor:
```bash
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_SUPABASE_URL=your_url \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key \
  -e NEXT_PUBLIC_SITE_URL=your_site_url \
  isa-auth
```

## Estructura del Proyecto

```
auth-isa/
├── src/
│   ├── app/                 # Rutas y páginas de Next.js
│   ├── components/         # Componentes React
│   │   ├── auth/          # Componentes de autenticación
│   │   └── ui/            # Componentes de interfaz
│   └── lib/               # Utilidades y configuración
├── public/                # Archivos estáticos
├── docker-compose.yml     # Configuración de Docker para desarrollo
├── Dockerfile            # Configuración de Docker para producción
└── README.md            # Documentación
```

## Próximas Características

- [ ] Integración de asistente IA
- [ ] Mejoras en la seguridad
- [ ] Pruebas automatizadas
- [ ] Optimización de rendimiento

## Contribuir

1. Fork el repositorio
2. Crear una rama para tu característica (`git checkout -b feature/amazing-feature`)
3. Commit tus cambios (`git commit -m 'Add some amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abrir un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.
