# C# Learning Platform

Plataforma interactiva para aprender C# y .NET con ejercicios prácticos, seguimiento de progreso y editor de código integrado.

## 🚀 Características

- **Editor de Código Integrado**: Monaco Editor (el mismo de VS Code) con syntax highlighting para C#
- **Sistema de Autenticación**: Registro y login seguro con NextAuth.js
- **Seguimiento de Progreso**: Sistema de niveles (Principiante → Junior → Mid-Level → Senior → Expert)
- **Ejercicios Prácticos**: Ejercicios con validación automática y casos de prueba
- **Módulos Estructurados**: Contenido organizado por dificultad
- **Recomendaciones Personalizadas**: Sugerencias de tecnologías complementarias según tu nivel
- **XP y Logros**: Sistema de puntos de experiencia y achievements

## 📋 Requisitos Previos

- Node.js 18+
- PostgreSQL
- npm o yarn

## 🛠️ Instalación

1. Clona el repositorio:
\`\`\`bash
git clone <tu-repo>
cd csharp-learning-platform
\`\`\`

2. Instala las dependencias:
\`\`\`bash
npm install
\`\`\`

3. Crea un archivo \`.env\` basado en \`.env.example\`:
\`\`\`bash
cp .env.example .env
\`\`\`

4. Configura las variables de entorno en \`.env\`:
\`\`\`env
DATABASE_URL="postgresql://user:password@localhost:5432/csharp_learning?schema=public"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
\`\`\`

Para generar \`NEXTAUTH_SECRET\`:
\`\`\`bash
openssl rand -base64 32
\`\`\`

5. Inicializa la base de datos:
\`\`\`bash
npm run prisma:push
npm run prisma:seed
\`\`\`

6. Inicia el servidor de desarrollo:
\`\`\`bash
npm run dev
\`\`\`

7. Abre [http://localhost:3000](http://localhost:3000) en tu navegador

## 📚 Stack Tecnológico

### Frontend
- **Next.js 14+** - Framework React con App Router
- **TypeScript** - Type safety
- **TailwindCSS** - Estilos utility-first
- **Monaco Editor** - Editor de código integrado

### Backend
- **Next.js API Routes** - Backend serverless
- **PostgreSQL** - Base de datos relacional
- **Prisma ORM** - Type-safe database client
- **NextAuth.js** - Autenticación

### Herramientas
- **React Hook Form** + **Zod** - Validación de formularios
- **React Markdown** - Renderizado de contenido

## 🗂️ Estructura del Proyecto

\`\`\`
csharp-learning-platform/
├── prisma/
│   ├── schema.prisma      # Esquema de base de datos
│   └── seed.ts            # Datos iniciales
├── src/
│   ├── app/
│   │   ├── (auth)/        # Páginas de autenticación
│   │   ├── (dashboard)/   # Páginas protegidas
│   │   ├── api/           # API routes
│   │   ├── layout.tsx     # Layout principal
│   │   └── page.tsx       # Página de inicio
│   ├── components/
│   │   ├── ui/            # Componentes UI reutilizables
│   │   ├── dashboard/     # Componentes del dashboard
│   │   ├── editor/        # Editor de código
│   │   └── lessons/       # Componentes de lecciones
│   └── lib/
│       ├── auth.ts        # Configuración de NextAuth
│       ├── prisma.ts      # Cliente de Prisma
│       └── utils.ts       # Utilidades
└── public/                # Archivos estáticos
\`\`\`

## 🎯 Sistema de Niveles

| Nivel | XP Requerido | Descripción |
|-------|--------------|-------------|
| Principiante | 0 - 500 XP | Fundamentos de C# y sintaxis básica |
| Junior | 500 - 1500 XP | POO, colecciones y manejo de errores |
| Mid-Level | 1500 - 3000 XP | LINQ, async/await, patrones de diseño |
| Senior | 3000 - 5000 XP | Arquitectura, testing, optimización |
| Expert | 5000+ XP | Temas avanzados y mejores prácticas |

**Nota**: A partir del nivel Mid-Level, se considera que estás listo para el mundo laboral.

## 📖 Uso

### Crear una cuenta
1. Ve a `/register`
2. Completa el formulario de registro
3. Inicia sesión en `/login`

### Comenzar a aprender
1. En el dashboard verás todos los módulos disponibles
2. Haz clic en una lección para comenzar
3. Lee el contenido y completa los ejercicios
4. Gana XP y sube de nivel

### Resolver ejercicios
1. Lee las instrucciones del ejercicio
2. Escribe tu código en el editor Monaco
3. Haz clic en "Ejecutar Código" para probar
4. Haz clic en "Enviar Solución" para validar contra los test cases
5. Gana XP al completar ejercicios correctamente

## 🚀 Deploy en Vercel

1. Pushea tu código a GitHub

2. Importa el proyecto en Vercel

3. Configura las variables de entorno:
   - \`DATABASE_URL\` - URL de tu base de datos PostgreSQL (usa Vercel Postgres)
   - \`NEXTAUTH_URL\` - URL de tu aplicación en producción
   - \`NEXTAUTH_SECRET\` - Secret para NextAuth

4. Deploy!

### Configurar Vercel Postgres

\`\`\`bash
# Instala Vercel CLI
npm i -g vercel

# Crea una base de datos Postgres
vercel postgres create

# Conecta el proyecto
vercel link

# Obtén las credenciales
vercel env pull
\`\`\`

5. Ejecuta las migraciones en producción:
\`\`\`bash
npx prisma db push
npx prisma db seed
\`\`\`

## 🔧 Scripts Disponibles

- \`npm run dev\` - Inicia el servidor de desarrollo
- \`npm run build\` - Construye la aplicación para producción
- \`npm start\` - Inicia el servidor de producción
- \`npm run lint\` - Ejecuta el linter
- \`npm run prisma:generate\` - Genera el cliente de Prisma
- \`npm run prisma:push\` - Sincroniza el esquema con la base de datos
- \`npm run prisma:studio\` - Abre Prisma Studio (GUI para la DB)
- \`npm run prisma:seed\` - Puebla la base de datos con datos iniciales

## 🤝 Contribuir

Las contribuciones son bienvenidas! Si quieres agregar más lecciones, ejercicios o mejorar la plataforma:

1. Fork el proyecto
2. Crea una rama para tu feature (\`git checkout -b feature/nueva-leccion\`)
3. Commit tus cambios (\`git commit -m 'Add: nueva lección sobre Loops'\`)
4. Push a la rama (\`git push origin feature/nueva-leccion\`)
5. Abre un Pull Request

## 📝 Roadmap

- [ ] Integrar Judge0 API para ejecución real de código C#
- [ ] Sistema de logros y badges
- [ ] Leaderboard y competencias
- [ ] Más módulos (Loops, Arrays, POO, LINQ, etc.)
- [ ] Soporte para más lenguajes (Python, JavaScript, etc.)
- [ ] Sistema de comentarios y discusiones
- [ ] Modo oscuro
- [ ] PWA (Progressive Web App)

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👥 Autor

Desarrollado por Maria - [GitHub](https://github.com/tu-usuario)

---

¡Feliz aprendizaje! 🎓
