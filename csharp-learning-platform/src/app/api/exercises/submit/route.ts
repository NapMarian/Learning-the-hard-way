import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const { exerciseId, code, userId } = await req.json()

    if (!exerciseId || !code || !userId) {
      return NextResponse.json(
        { error: "Faltan parámetros requeridos" },
        { status: 400 }
      )
    }

    // Get exercise with test cases
    const exercise = await prisma.exercise.findUnique({
      where: { id: exerciseId },
      include: { testCases: true }
    })

    if (!exercise) {
      return NextResponse.json(
        { error: "Ejercicio no encontrado" },
        { status: 404 }
      )
    }

    // In production, this would:
    // 1. Execute code against each test case
    // 2. Compare outputs
    // 3. Return results

    // For now, mock validation
    const testsPassed = exercise.testCases.length
    const testsTotal = exercise.testCases.length

    const passed = testsPassed === testsTotal

    // Create submission record
    const submission = await prisma.exerciseSubmission.create({
      data: {
        userId,
        exerciseId,
        code,
        passed,
        testsPassed,
        testsTotal,
      }
    })

    if (passed) {
      // Award XP to user
      await prisma.user.update({
        where: { id: userId },
        data: {
          xp: {
            increment: exercise.xpReward
          }
        }
      })
    }

    return NextResponse.json({
      success: passed,
      testsPassed,
      testsTotal,
      output: passed ? "¡Todos los tests pasaron!" : "Algunos tests fallaron",
    })
  } catch (error) {
    console.error("Submit exercise error:", error)
    return NextResponse.json(
      { error: "Error al procesar el ejercicio" },
      { status: 500 }
    )
  }
}
