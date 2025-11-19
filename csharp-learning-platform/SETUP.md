# Guía de Configuración Rápida

## Pasos para ejecutar el proyecto localmente

### 1. Instalar PostgreSQL

Si no tienes PostgreSQL instalado, descárgalo de:
- Windows: https://www.postgresql.org/download/windows/
- O usa Docker: `docker run --name postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres`

### 2. Crear Base de Datos

Conecta a PostgreSQL y crea una base de datos:
\`\`\`sql
CREATE DATABASE csharp_learning;
\`\`\`

### 3. Configurar Variables de Entorno

Crea un archivo \`.env\` en la raíz del proyecto con:

\`\`\`env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/csharp_learning?schema=public"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="tu-secret-aqui"
\`\`\`

Para generar el secret:
\`\`\`bash
# En Windows PowerShell
[Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes((New-Guid).ToString()))

# En Linux/Mac
openssl rand -base64 32
\`\`\`

### 4. Instalar Dependencias

\`\`\`bash
npm install
\`\`\`

### 5. Configurar Base de Datos

\`\`\`bash
# Genera el cliente de Prisma
npm run prisma:generate

# Sincroniza el esquema con la base de datos
npm run prisma:push

# Puebla la base de datos con datos iniciales
npm run prisma:seed
\`\`\`

### 6. Iniciar el Servidor de Desarrollo

\`\`\`bash
npm run dev
\`\`\`

### 7. Abrir en el Navegador

Abre http://localhost:3000

### 8. Crear tu Primera Cuenta

1. Ve a "Crear Cuenta"
2. Regístrate con tu email
3. Inicia sesión
4. ¡Comienza a aprender!

## Comandos Útiles

\`\`\`bash
# Ver/editar base de datos con interfaz visual
npm run prisma:studio

# Resetear base de datos (borra todo y vuelve a crear)
npm run prisma:push -- --force-reset

# Ver logs de Next.js
npm run dev

# Build para producción
npm run build
npm start
\`\`\`

## Solución de Problemas

### Error de conexión a la base de datos
- Verifica que PostgreSQL esté corriendo
- Verifica que el \`DATABASE_URL\` en \`.env\` sea correcto
- Verifica que la base de datos \`csharp_learning\` exista

### Error "Module not found"
- Ejecuta \`npm install\` de nuevo
- Borra \`node_modules\` y vuelve a instalar: \`rm -rf node_modules && npm install\`

### Error con Prisma
- Ejecuta \`npm run prisma:generate\` de nuevo
- Verifica que el schema en \`prisma/schema.prisma\` esté correcto

### La aplicación no carga
- Verifica que el puerto 3000 no esté en uso
- Revisa los logs en la consola para ver errores específicos

## ¿Necesitas ayuda?

Abre un issue en el repositorio con:
1. Descripción del problema
2. Mensaje de error completo
3. Pasos que seguiste
4. Sistema operativo y versión de Node.js

¡Feliz aprendizaje! 🚀
