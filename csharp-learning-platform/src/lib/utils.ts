import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateLevel(xp: number): string {
  if (xp < 500) return "BEGINNER"
  if (xp < 1500) return "JUNIOR"
  if (xp < 3000) return "MID_LEVEL"
  if (xp < 5000) return "SENIOR"
  return "EXPERT"
}

export function getXpForNextLevel(currentXp: number): number {
  if (currentXp < 500) return 500
  if (currentXp < 1500) return 1500
  if (currentXp < 3000) return 3000
  if (currentXp < 5000) return 5000
  return 10000
}

export function getLevelDisplayName(level: string): string {
  const levelMap: { [key: string]: string } = {
    BEGINNER: "Principiante",
    JUNIOR: "Junior",
    MID_LEVEL: "Mid-Level",
    SENIOR: "Senior",
    EXPERT: "Experto"
  }
  return levelMap[level] || level
}

export function isReadyForWork(level: string, completedLessons: number): boolean {
  return level === "MID_LEVEL" || level === "SENIOR" || level === "EXPERT"
}
