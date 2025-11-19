import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Aprende C# de forma
            <span className="text-blue-600"> Interactiva</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Domina la programación en C# con ejercicios prácticos, seguimiento de progreso
            y un editor de código integrado. Desde principiante hasta experto.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="text-lg">
                Comenzar Gratis
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="text-lg">
                Iniciar Sesión
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">¿Por qué esta plataforma?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">💻</span>
                Editor Integrado
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Escribe y ejecuta código C# directamente en tu navegador con syntax highlighting
                y autocompletado, similar a VS Code.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">📈</span>
                Seguimiento de Progreso
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Rastrea tu aprendizaje con un sistema de niveles, XP y logros. Sabrás exactamente
                cuándo estás listo para el mundo laboral.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">🎯</span>
                Ejercicios Prácticos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Aprende haciendo con ejercicios diseñados para reforzar conceptos y validación
                automática de tus soluciones.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">🚀</span>
                Ruta de Aprendizaje
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Sigue un camino estructurado desde los fundamentos hasta temas avanzados,
                con módulos organizados por dificultad.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">💡</span>
                Recomendaciones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Recibe sugerencias personalizadas sobre qué tecnologías aprender a continuación
                (SQL, Docker, Git, etc.) según tu nivel.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">🏆</span>
                Sistema de Niveles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Avanza desde Principiante hasta Experto. Cada nivel desbloqueado te acerca
                más a estar listo para trabajar como desarrollador.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Levels Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Tu Camino de Aprendizaje</h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {[
            { level: "Principiante", xp: "0 - 500 XP", desc: "Fundamentos de C# y sintaxis básica" },
            { level: "Junior", xp: "500 - 1500 XP", desc: "POO, colecciones y manejo de errores" },
            { level: "Mid-Level", xp: "1500 - 3000 XP", desc: "LINQ, async/await, patrones de diseño" },
            { level: "Senior", xp: "3000 - 5000 XP", desc: "Arquitectura, testing, optimización" },
            { level: "Expert", xp: "5000+ XP", desc: "Temas avanzados y mejores prácticas" },
          ].map((item) => (
            <div key={item.level} className="flex items-center gap-4 p-4 bg-white rounded-lg shadow">
              <div className="w-32 font-bold text-blue-600">{item.level}</div>
              <div className="flex-1">
                <div className="font-semibold">{item.desc}</div>
                <div className="text-sm text-gray-500">{item.xp}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-2xl mx-auto bg-blue-600 text-white rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-4">¿Listo para comenzar?</h2>
          <p className="text-xl mb-8 opacity-90">
            Únete ahora y comienza tu viaje para convertirte en un desarrollador C# profesional.
          </p>
          <Link href="/register">
            <Button size="lg" variant="secondary" className="text-lg">
              Crear Cuenta Gratis
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="container mx-auto px-4 py-8 text-center text-gray-600">
          <p>&copy; 2025 C# Learning Platform. Desarrollado para aprender C# de forma efectiva.</p>
        </div>
      </footer>
    </div>
  )
}
