import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { ThemeToggle } from "@/components/ThemeToggle"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-200 to-purple-200 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/20 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto backdrop-blur-2xl bg-white/10 dark:bg-white/5 rounded-3xl p-12 border border-white/20 dark:border-white/10 shadow-2xl hover:shadow-3xl transition-all duration-300">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 drop-shadow-lg">
              Aprende C# de forma
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent"> Interactiva</span>
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-200 mb-8 drop-shadow">
              Domina la programación en C# con ejercicios prácticos, seguimiento de progreso
              y un editor de código integrado. Desde principiante hasta experto.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/register">
                <Button size="lg" className="text-lg backdrop-blur-md bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  Comenzar Gratis
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="text-lg backdrop-blur-md bg-white/20 dark:bg-white/10 border-white/30 dark:border-white/20 hover:bg-white/30 dark:hover:bg-white/20 shadow-lg hover:scale-105 transition-all duration-300">
                  Iniciar Sesión
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white drop-shadow-lg">¿Por qué esta plataforma?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "💻", title: "Editor Integrado", desc: "Escribe y ejecuta código C# directamente en tu navegador con syntax highlighting y autocompletado, similar a VS Code." },
              { icon: "📈", title: "Seguimiento de Progreso", desc: "Rastrea tu aprendizaje con un sistema de niveles, XP y logros. Sabrás exactamente cuándo estás listo para el mundo laboral." },
              { icon: "🎯", title: "Ejercicios Prácticos", desc: "Aprende haciendo con ejercicios diseñados para reforzar conceptos y validación automática de tus soluciones." },
              { icon: "🚀", title: "Ruta de Aprendizaje", desc: "Sigue un camino estructurado desde los fundamentos hasta temas avanzados, con módulos organizados por dificultad." },
              { icon: "💡", title: "Recomendaciones", desc: "Recibe sugerencias personalizadas sobre qué tecnologías aprender a continuación (SQL, Docker, Git, etc.) según tu nivel." },
              { icon: "🏆", title: "Sistema de Niveles", desc: "Avanza desde Principiante hasta Experto. Cada nivel desbloqueado te acerca más a estar listo para trabajar como desarrollador." }
            ].map((feature) => (
              <div key={feature.title} className="backdrop-blur-xl bg-white/10 dark:bg-white/5 rounded-2xl p-6 border border-white/20 dark:border-white/10 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-3xl">{feature.icon}</span>
                  <h3 className="text-xl font-bold dark:text-white">{feature.title}</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-200">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Levels Section */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white drop-shadow-lg">Tu Camino de Aprendizaje</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              { level: "Principiante", xp: "0 - 500 XP", desc: "Fundamentos de C# y sintaxis básica", gradient: "from-green-500 to-emerald-500" },
              { level: "Junior", xp: "500 - 1500 XP", desc: "POO, colecciones y manejo de errores", gradient: "from-blue-500 to-cyan-500" },
              { level: "Mid-Level", xp: "1500 - 3000 XP", desc: "LINQ, async/await, patrones de diseño", gradient: "from-purple-500 to-pink-500" },
              { level: "Senior", xp: "3000 - 5000 XP", desc: "Arquitectura, testing, optimización", gradient: "from-orange-500 to-red-500" },
              { level: "Expert", xp: "5000+ XP", desc: "Temas avanzados y mejores prácticas", gradient: "from-yellow-500 to-amber-500" },
            ].map((item) => (
              <div key={item.level} className="backdrop-blur-xl bg-white/10 dark:bg-white/5 rounded-2xl p-6 border border-white/20 dark:border-white/10 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className={`w-32 font-bold bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent text-lg`}>{item.level}</div>
                  <div className="flex-1">
                    <div className="font-semibold dark:text-white">{item.desc}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">{item.xp}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-2xl mx-auto backdrop-blur-2xl bg-gradient-to-r from-blue-600/80 to-purple-600/80 dark:from-blue-600/60 dark:to-purple-600/60 text-white rounded-3xl p-12 border border-white/20 shadow-2xl hover:shadow-3xl hover:scale-[1.02] transition-all duration-300">
            <h2 className="text-3xl font-bold mb-4 drop-shadow-lg">¿Listo para comenzar?</h2>
            <p className="text-xl mb-8 opacity-90">
              Únete ahora y comienza tu viaje para convertirte en un desarrollador C# profesional.
            </p>
            <Link href="/register">
              <Button size="lg" className="text-lg backdrop-blur-md bg-white/20 hover:bg-white/30 border border-white/30 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                Crear Cuenta Gratis
              </Button>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="backdrop-blur-xl bg-white/10 dark:bg-white/5 border-t border-white/20 dark:border-white/10">
          <div className="container mx-auto px-4 py-8 text-center text-gray-700 dark:text-gray-300">
            <p>&copy; 2025 C# Learning Platform. Desarrollado para aprender C# de forma efectiva.</p>
          </div>
        </footer>

        <ThemeToggle />
      </div>
    </div>
  )
}
