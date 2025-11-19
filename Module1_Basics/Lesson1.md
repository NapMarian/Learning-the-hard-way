# Lección 1: Introducción a C# y Tipos de Datos

¡Bienvenido a tu primera lección de C#! En este módulo aprenderemos los fundamentos del lenguaje.

## 1. ¿Qué es C#?
C# (pronunciado "C Sharp") es un lenguaje de programación moderno, orientado a objetos y seguro, desarrollado por Microsoft. Se ejecuta sobre la plataforma .NET.

## 2. Estructura de un Programa
Un programa básico en C# se ve así:

```csharp
using System;

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("¡Hola, Mundo!");
    }
}
```

- `using System;`: Nos permite usar clases del espacio de nombres `System` (como `Console`).
- `class Program`: Define una clase. Todo en C# vive dentro de una clase.
- `static void Main`: Es el punto de entrada de la aplicación. Aquí empieza a ejecutarse el código.

## 3. Variables y Tipos de Datos
Las variables son contenedores para guardar datos. C# es un lenguaje "fuertemente tipado", lo que significa que cada variable debe tener un tipo específico.

### Tipos Comunes:
- `int`: Números enteros (ej. 10, -5, 42)
- `double`: Números con decimales (ej. 3.14, -0.01)
- `string`: Texto (ej. "Hola", "Maria")
- `bool`: Verdadero o Falso (`true`, `false`)

### Ejemplo:
```csharp
int edad = 25;
string nombre = "Maria";
double altura = 1.65;
bool esEstudiante = true;

Console.WriteLine($"Hola, soy {nombre} y tengo {edad} años.");
```

## 4. Tu Tarea
Vamos a crear un programa que declare algunas variables sobre ti y las imprima en la consola.
