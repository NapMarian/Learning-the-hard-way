"use client"

import { useState } from "react"
import { signOut } from "next-auth/react"
import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { ThemeToggle } from "@/components/ThemeToggle"
import { getLevelDisplayName, getXpForNextLevel } from "@/lib/utils"

type Module = {
  id: string
  title: string
  description: string
  level: string
  lessons: Array<{
    id: string
    title: string
    xpReward: number
  }>
}

type Progress = {
  lessonId: string
  completed: boolean
  score: number
}

type Recommendation = {
  id: string
  title: string
  description: string
  technology: string
  resourceUrl: string | null
}

type DashboardContentProps = {
  user: {
    name: string
    email: string
    level: string
    xp: number
  }
  modules: Module[]
  progress: Progress[]
  recommendations: Recommendation[]
}

export function DashboardContent({ user, modules, progress, recommendations }: DashboardContentProps) {
  const completedLessons = progress.filter(p => p.completed).length
  const totalLessons = modules.reduce((sum, module) => sum + module.lessons.length, 0)
  const completionPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0
  const nextLevelXp = getXpForNextLevel(user.xp)
  const xpProgress = Math.round((user.xp / nextLevelXp) * 100)

  const isReadyForWork = user.level === "MID_LEVEL" || user.level === "SENIOR" || user.level === "EXPERT"

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow dark:shadow-gray-700">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">C# Learning Platform</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 dark:text-gray-300">{user.name}</span>
            <Button variant="outline" onClick={() => signOut({ callbackUrl: "/" })}>
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Welcome Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">¡Hola, {user.name}!</CardTitle>
                <CardDescription>
                  Continúa tu viaje de aprendizaje en C#
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                    <div className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-1">Nivel Actual</div>
                    <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                      {getLevelDisplayName(user.level)}
                    </div>
                  </div>
                  <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                    <div className="text-sm text-green-600 dark:text-green-400 font-medium mb-1">Progreso General</div>
                    <div className="text-2xl font-bold text-green-900 dark:text-green-100">
                      {completedLessons}/{totalLessons} lecciones
                    </div>
                  </div>
                </div>

                {/* XP Progress Bar */}
                <div className="mt-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium dark:text-gray-200">XP: {user.xp}</span>
                    <span className="text-gray-600 dark:text-gray-400">Próximo nivel: {nextLevelXp} XP</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div
                      className="bg-blue-600 dark:bg-blue-500 h-3 rounded-full transition-all"
                      style={{ width: `${xpProgress}%` }}
                    />
                  </div>
                </div>

                {/* Ready for work indicator */}
                {isReadyForWork && (
                  <div className="mt-4 p-4 bg-green-100 dark:bg-green-900 border border-green-300 dark:border-green-700 rounded-lg">
                    <div className="flex items-center gap-2 text-green-800 dark:text-green-200">
                      <span className="text-xl">🎉</span>
                      <span className="font-semibold">¡Estás listo para el mundo laboral!</span>
                    </div>
                    <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                      Tu nivel de conocimiento es suficiente para postular a posiciones junior/mid-level.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Modules */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold dark:text-gray-100">Módulos de Aprendizaje</h2>
              {modules.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <p className="text-gray-600 dark:text-gray-400">
                      No hay módulos disponibles aún. Estamos preparando el contenido.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                modules.map((module) => {
                  const moduleLessons = module.lessons.length
                  const completedInModule = progress.filter(
                    p => p.completed && module.lessons.some(l => l.id === p.lessonId)
                  ).length
                  const moduleProgress = moduleLessons > 0
                    ? Math.round((completedInModule / moduleLessons) * 100)
                    : 0

                  return (
                    <Card key={module.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle>{module.title}</CardTitle>
                            <CardDescription className="mt-2">
                              {module.description}
                            </CardDescription>
                          </div>
                          <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                            {getLevelDisplayName(module.level)}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">
                              {completedInModule}/{moduleLessons} lecciones completadas
                            </span>
                            <span className="font-medium dark:text-gray-200">{moduleProgress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full transition-all"
                              style={{ width: `${moduleProgress}%` }}
                            />
                          </div>
                          <div className="flex gap-2 flex-wrap mt-4">
                            {module.lessons.slice(0, 3).map((lesson) => {
                              const isCompleted = progress.some(
                                p => p.lessonId === lesson.id && p.completed
                              )
                              return (
                                <Link key={lesson.id} href={`/lessons/${lesson.id}`}>
                                  <Button variant="outline" size="sm">
                                    {isCompleted && "✓ "}
                                    {lesson.title}
                                  </Button>
                                </Link>
                              )
                            })}
                            {module.lessons.length > 3 && (
                              <span className="text-sm text-gray-500 dark:text-gray-400 self-center">
                                +{module.lessons.length - 3} más
                              </span>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats Card */}
            <Card>
              <CardHeader>
                <CardTitle>Estadísticas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">XP Total</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">{user.xp}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Lecciones Completadas</span>
                  <span className="font-bold dark:text-gray-200">{completedLessons}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Progreso General</span>
                  <span className="font-bold text-green-600 dark:text-green-400">{completionPercentage}%</span>
                </div>
              </CardContent>
            </Card>

            {/* Recommendations Card */}
            <Card>
              <CardHeader>
                <CardTitle>Recomendaciones</CardTitle>
                <CardDescription>
                  Tecnologías complementarias para tu nivel
                </CardDescription>
              </CardHeader>
              <CardContent>
                {recommendations.length === 0 ? (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    No hay recomendaciones disponibles para tu nivel actual.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {recommendations.map((rec) => (
                      <div key={rec.id} className="border-l-4 border-blue-600 dark:border-blue-400 pl-3 py-2">
                        <div className="font-semibold text-sm dark:text-gray-200">{rec.technology}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">{rec.description}</div>
                        {rec.resourceUrl && (
                          <a
                            href={rec.resourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 dark:text-blue-400 hover:underline mt-1 inline-block"
                          >
                            Ver recurso →
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <ThemeToggle />
    </div>
  )
}
