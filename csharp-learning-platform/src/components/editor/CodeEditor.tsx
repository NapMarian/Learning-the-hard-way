"use client"

import { useRef, useState } from "react"
import Editor from "@monaco-editor/react"
import { Button } from "@/components/ui/Button"

type CodeEditorProps = {
  initialCode?: string
  exerciseId?: string
  onSubmit?: (code: string) => Promise<{ success: boolean; output?: string; error?: string }>
  readOnly?: boolean
}

export function CodeEditor({ initialCode = "", exerciseId, onSubmit, readOnly = false }: CodeEditorProps) {
  const [code, setCode] = useState(initialCode)
  const [output, setOutput] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [error, setError] = useState("")

  const handleRun = async () => {
    setIsRunning(true)
    setOutput("")
    setError("")

    try {
      // For now, we'll simulate code execution
      // In production, this would call the actual API
      const response = await fetch("/api/execute-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          language: "csharp",
          exerciseId,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setOutput(data.output || "Código ejecutado correctamente")
      } else {
        setError(data.error || "Error al ejecutar el código")
      }
    } catch (err) {
      setError("Error al conectar con el servidor")
    } finally {
      setIsRunning(false)
    }
  }

  const handleSubmit = async () => {
    if (!onSubmit) return

    setIsRunning(true)
    setOutput("")
    setError("")

    try {
      const result = await onSubmit(code)

      if (result.success) {
        setOutput(result.output || "¡Ejercicio completado correctamente!")
      } else {
        setError(result.error || "El código no pasó todas las pruebas")
      }
    } catch (err) {
      setError("Error al enviar el ejercicio")
    } finally {
      setIsRunning(false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 border border-gray-300 rounded-lg overflow-hidden">
        <Editor
          height="100%"
          defaultLanguage="csharp"
          value={code}
          onChange={(value) => setCode(value || "")}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: "on",
            roundedSelection: false,
            scrollBeyondLastLine: false,
            readOnly: readOnly,
            automaticLayout: true,
          }}
        />
      </div>

      {/* Controls */}
      <div className="mt-4 flex gap-2">
        <Button
          onClick={handleRun}
          disabled={isRunning}
          className="flex-1"
        >
          {isRunning ? "Ejecutando..." : "▶ Ejecutar Código"}
        </Button>
        {onSubmit && (
          <Button
            onClick={handleSubmit}
            disabled={isRunning}
            variant="secondary"
            className="flex-1"
          >
            {isRunning ? "Enviando..." : "✓ Enviar Solución"}
          </Button>
        )}
      </div>

      {/* Output */}
      {(output || error) && (
        <div className="mt-4">
          {output && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="text-sm font-semibold text-green-800 mb-2">Output:</div>
              <pre className="text-sm text-green-900 whitespace-pre-wrap font-mono">
                {output}
              </pre>
            </div>
          )}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="text-sm font-semibold text-red-800 mb-2">Error:</div>
              <pre className="text-sm text-red-900 whitespace-pre-wrap font-mono">
                {error}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
