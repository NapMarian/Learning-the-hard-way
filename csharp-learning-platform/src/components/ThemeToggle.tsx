"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Button } from "./ui/Button"

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="fixed top-4 right-4 z-50 backdrop-blur-md bg-white/30 dark:bg-black/30 border-white/20 dark:border-white/10 hover:bg-white/40 dark:hover:bg-black/40 shadow-lg"
    >
      {theme === "dark" ? "🌞" : "🌙"}
    </Button>
  )
}
