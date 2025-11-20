import { getServerSession } from "next-auth"
import { redirect, notFound } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { LessonContent } from "@/components/lessons/LessonContent"

export default async function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect("/login")
  }

  const lesson = await prisma.lesson.findUnique({
    where: { id },
    include: {
      module: true,
      exercises: {
        include: {
          testCases: true
        },
        orderBy: { order: 'asc' }
      }
    }
  })

  if (!lesson) {
    notFound()
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email! }
  })

  if (!user) {
    redirect("/login")
  }

  // Get or create user progress
  let progress = await prisma.userProgress.findUnique({
    where: {
      userId_lessonId: {
        userId: user.id,
        lessonId: lesson.id
      }
    }
  })

  if (!progress) {
    progress = await prisma.userProgress.create({
      data: {
        userId: user.id,
        lessonId: lesson.id
      }
    })
  }

  return (
    <LessonContent
      lesson={{
        id: lesson.id,
        title: lesson.title,
        description: lesson.description,
        content: lesson.content,
        xpReward: lesson.xpReward,
        module: {
          title: lesson.module.title
        }
      }}
      exercises={lesson.exercises.map(ex => ({
        id: ex.id,
        title: ex.title,
        description: ex.description,
        instructions: ex.instructions,
        starterCode: ex.starterCode,
        difficulty: ex.difficulty,
        xpReward: ex.xpReward,
        hints: ex.hints,
        testCases: ex.testCases.filter(tc => !tc.isHidden).map(tc => ({
          input: tc.input,
          expectedOutput: tc.expectedOutput
        }))
      }))}
      progress={{
        completed: progress.completed,
        score: progress.score
      }}
      userId={user.id}
    />
  )
}
