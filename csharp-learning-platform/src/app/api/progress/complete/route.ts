import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const { lessonId, userId } = await req.json()

    if (!lessonId || !userId) {
      return NextResponse.json(
        { error: "Faltan parámetros requeridos" },
        { status: 400 }
      )
    }

    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId }
    })

    if (!lesson) {
      return NextResponse.json(
        { error: "Lección no encontrada" },
        { status: 404 }
      )
    }

    // Update progress
    await prisma.userProgress.upsert({
      where: {
        userId_lessonId: {
          userId,
          lessonId
        }
      },
      update: {
        completed: true,
        completedAt: new Date(),
        score: 100,
      },
      create: {
        userId,
        lessonId,
        completed: true,
        completedAt: new Date(),
        score: 100,
      }
    })

    // Award XP
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        xp: {
          increment: lesson.xpReward
        }
      }
    })

    // Update level based on XP
    let newLevel = user.level
    if (user.xp >= 5000) newLevel = "EXPERT"
    else if (user.xp >= 3000) newLevel = "SENIOR"
    else if (user.xp >= 1500) newLevel = "MID_LEVEL"
    else if (user.xp >= 500) newLevel = "JUNIOR"
    else newLevel = "BEGINNER"

    if (newLevel !== user.level) {
      await prisma.user.update({
        where: { id: userId },
        data: { level: newLevel }
      })
    }

    return NextResponse.json({
      success: true,
      xpAwarded: lesson.xpReward,
      newXp: user.xp + lesson.xpReward,
      newLevel,
    })
  } catch (error) {
    console.error("Complete lesson error:", error)
    return NextResponse.json(
      { error: "Error al completar la lección" },
      { status: 500 }
    )
  }
}
