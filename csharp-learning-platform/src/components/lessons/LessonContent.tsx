"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { CodeEditor } from "@/components/editor/CodeEditor"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import ReactMarkdown from "react-markdown"

type Exercise = {
  id: string
  title: string
  description: string
  instructions: string
  starterCode: string
  difficulty: string
  xpReward: number
  hints: string[]
  testCases: Array<{
    input: string
    expectedOutput: string
  }>
}

type LessonContentProps = {
  lesson: {
    id: string
    title: string
    description: string
    content: string
    xpReward: number
    module: {
      title: string
    }
  }
  exercises: Exercise[]
  progress: {
    completed: boolean
    score: number
  }
  userId: string
}

export function LessonContent({ lesson, exercises, progress, userId }: LessonContentProps) {
  const router = useRouter()
  const [currentExercise, setCurrentExercise] = useState(0)
  const [showHints, setShowHints] = useState(false)
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set())

  const exercise = exercises[currentExercise]

  const handleSubmitExercise = async (code: string) => {
    try {
      const response = await fetch("/api/exercises/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          exerciseId: exercise.id,
          code,
          userId,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setCompletedExercises(prev => new Set(prev).add(exercise.id))

        // If all exercises completed, mark lesson as complete
        if (completedExercises.size + 1 === exercises.length) {
          await markLessonComplete()
        }

        return {
          success: true,
          output: `¡Correcto! Has ganado ${exercise.xpReward} XP.\n\nTests pasados: ${data.testsPassed}/${data.testsTotal}`,
        }
      } else {
        return {
          success: false,
          error: data.error || `Tests pasados: ${data.testsPassed || 0}/${data.testsTotal || 0}\n\n${data.output || ""}`,
        }
      }
    } catch (err) {
      return {
        success: false,
        error: "Error al enviar el ejercicio",
      }
    }
  }

  const markLessonComplete = async () => {
    try {
      await fetch("/api/progress/complete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lessonId: lesson.id,
          userId,
        }),
      })

      router.refresh()
    } catch (err) {
      console.error("Error marking lesson complete:", err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600">{lesson.module.title}</div>
              <h1 className="text-2xl font-bold text-gray-900">{lesson.title}</h1>
            </div>
            <Link href="/dashboard">
              <Button variant="outline">← Volver al Dashboard</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Content */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contenido de la Lección</CardTitle>
                <CardDescription>{lesson.description}</CardDescription>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none">
                <ReactMarkdown>{lesson.content}</ReactMarkdown>
              </CardContent>
            </Card>

            {/* Exercises List */}
            {exercises.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Ejercicios Prácticos</CardTitle>
                  <CardDescription>
                    Completa {exercises.length} ejercicio(s) para dominar esta lección
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {exercises.map((ex, index) => (
                      <button
                        key={ex.id}
                        onClick={() => setCurrentExercise(index)}
                        className={`w-full text-left p-3 rounded-lg border transition-colors ${
                          currentExercise === index
                            ? "border-blue-600 bg-blue-50"
                            : "border-gray-200 hover:border-blue-300"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-semibold">
                              {completedExercises.has(ex.id) && "✓ "}
                              {ex.title}
                            </div>
                            <div className="text-xs text-gray-600">
                              {ex.difficulty} • {ex.xpReward} XP
                            </div>
                          </div>
                          {completedExercises.has(ex.id) && (
                            <span className="text-green-600 font-bold">✓</span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right: Exercise & Editor */}
          <div className="space-y-6">
            {exercise && (
              <>
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{exercise.title}</CardTitle>
                        <CardDescription className="mt-2">
                          {exercise.description}
                        </CardDescription>
                      </div>
                      <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                        {exercise.difficulty}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">📋 Instrucciones:</h4>
                        <div className="text-sm text-gray-700 whitespace-pre-wrap">
                          {exercise.instructions}
                        </div>
                      </div>

                      {exercise.testCases.length > 0 && (
                        <div>
                          <h4 className="font-semibold mb-2">✅ Casos de Prueba:</h4>
                          <div className="space-y-2">
                            {exercise.testCases.map((tc, idx) => (
                              <div key={idx} className="text-sm bg-gray-50 p-2 rounded">
                                <div className="font-mono">
                                  <span className="text-gray-600">Input:</span> {tc.input}
                                </div>
                                <div className="font-mono">
                                  <span className="text-gray-600">Output esperado:</span> {tc.expectedOutput}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {exercise.hints.length > 0 && (
                        <div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowHints(!showHints)}
                          >
                            {showHints ? "Ocultar" : "Mostrar"} Pistas ({exercise.hints.length})
                          </Button>
                          {showHints && (
                            <div className="mt-2 space-y-2">
                              {exercise.hints.map((hint, idx) => (
                                <div key={idx} className="text-sm bg-yellow-50 border border-yellow-200 p-2 rounded">
                                  💡 {hint}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Editor de Código</CardTitle>
                    <CardDescription>
                      Escribe tu solución aquí
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[500px]">
                      <CodeEditor
                        initialCode={exercise.starterCode}
                        exerciseId={exercise.id}
                        onSubmit={handleSubmitExercise}
                      />
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {exercises.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center text-gray-600">
                  Esta lección no tiene ejercicios prácticos. Revisa el contenido y continúa con la siguiente lección.
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
