import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { DashboardContent } from "@/components/dashboard/DashboardContent"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect("/login")
  }

  // Get user data with progress
  const user = await prisma.user.findUnique({
    where: { email: session.user.email! },
    include: {
      progress: {
        include: {
          lesson: {
            include: {
              module: true
            }
          }
        }
      }
    }
  })

  if (!user) {
    redirect("/login")
  }

  // Get all modules with lessons
  const modules = await prisma.module.findMany({
    include: {
      lessons: {
        orderBy: { order: 'asc' }
      }
    },
    orderBy: { order: 'asc' }
  })

  // Get recommendations for user level
  const recommendations = await prisma.recommendation.findMany({
    where: {
      level: user.level
    },
    orderBy: { order: 'asc' }
  })

  return (
    <DashboardContent
      user={{
        name: user.name || "Usuario",
        email: user.email,
        level: user.level,
        xp: user.xp,
      }}
      modules={modules}
      progress={user.progress}
      recommendations={recommendations}
    />
  )
}
