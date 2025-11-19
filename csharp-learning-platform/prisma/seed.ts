import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting seed...')

  // Create Module 1: Basics
  const module1 = await prisma.module.create({
    data: {
      title: "Módulo 1: Fundamentos de C#",
      description: "Aprende los conceptos básicos de C# y .NET",
      order: 1,
      language: "csharp",
      level: "BEGINNER",
    }
  })

  // Lesson 1: Introduction and Data Types
  const lesson1 = await prisma.lesson.create({
    data: {
      moduleId: module1.id,
      title: "Introducción a C# y Tipos de Datos",
      description: "Aprende qué es C#, la estructura básica de un programa y los tipos de datos fundamentales",
      order: 1,
      xpReward: 100,
      content: `# Lección 1: Introducción a C# y Tipos de Datos

¡Bienvenido a tu primera lección de C#! En este módulo aprenderemos los fundamentos del lenguaje.

## 1. ¿Qué es C#?
C# (pronunciado "C Sharp") es un lenguaje de programación moderno, orientado a objetos y seguro, desarrollado por Microsoft. Se ejecuta sobre la plataforma .NET.

## 2. Estructura de un Programa
Un programa básico en C# se ve así:

\`\`\`csharp
using System;

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("¡Hola, Mundo!");
    }
}
\`\`\`

- \`using System;\`: Nos permite usar clases del espacio de nombres \`System\` (como \`Console\`).
- \`class Program\`: Define una clase. Todo en C# vive dentro de una clase.
- \`static void Main\`: Es el punto de entrada de la aplicación. Aquí empieza a ejecutarse el código.

## 3. Variables y Tipos de Datos
Las variables son contenedores para guardar datos. C# es un lenguaje "fuertemente tipado", lo que significa que cada variable debe tener un tipo específico.

### Tipos Comunes:
- \`int\`: Números enteros (ej. 10, -5, 42)
- \`double\`: Números con decimales (ej. 3.14, -0.01)
- \`string\`: Texto (ej. "Hola", "Maria")
- \`bool\`: Verdadero o Falso (\`true\`, \`false\`)

### Ejemplo:
\`\`\`csharp
int edad = 25;
string nombre = "Maria";
double altura = 1.65;
bool esEstudiante = true;

Console.WriteLine($"Hola, soy {nombre} y tengo {edad} años.");
\`\`\`

## 4. String Interpolation
La interpolación de strings te permite insertar variables dentro de strings usando \`$""\`:

\`\`\`csharp
string nombre = "Maria";
int edad = 25;
Console.WriteLine($"Me llamo {nombre} y tengo {edad} años");
\`\`\`
`,
    }
  })

  // Exercise 1 for Lesson 1
  await prisma.exercise.create({
    data: {
      lessonId: lesson1.id,
      title: "Declarar Variables",
      description: "Practica declarando variables de diferentes tipos",
      instructions: "Crea variables para almacenar:\n- Tu nombre (string)\n- Tu edad (int)\n- Tu altura en metros (double)\n- Si eres estudiante (bool)\n\nLuego imprime un mensaje con todos estos datos usando string interpolation.",
      difficulty: "EASY",
      order: 1,
      xpReward: 50,
      hints: [
        "Usa 'string' para texto, 'int' para números enteros, 'double' para decimales y 'bool' para true/false",
        "La string interpolation se usa con $\"\" y {variable}",
        "Console.WriteLine() se usa para imprimir en consola"
      ],
      starterCode: `using System;

class Program
{
    static void Main(string[] args)
    {
        // Declara tus variables aquí


        // Imprime un mensaje con tus datos aquí

    }
}`,
      solution: `using System;

class Program
{
    static void Main(string[] args)
    {
        string nombre = "Maria";
        int edad = 25;
        double altura = 1.65;
        bool esEstudiante = true;

        Console.WriteLine($"Me llamo {nombre}, tengo {edad} años, mido {altura}m y {(esEstudiante ? "soy" : "no soy")} estudiante.");
    }
}`,
      testCases: {
        create: [
          {
            input: "",
            expectedOutput: "declaración de variables correcta",
            isHidden: false,
            order: 1,
          }
        ]
      }
    }
  })

  // Lesson 2: Operators and Control Flow
  const lesson2 = await prisma.lesson.create({
    data: {
      moduleId: module1.id,
      title: "Operadores y Control de Flujo",
      description: "Aprende a realizar operaciones matemáticas, comparar valores y controlar el flujo de tu programa",
      order: 2,
      xpReward: 150,
      content: `# Lección 2: Operadores y Control de Flujo

En esta lección aprenderás a realizar operaciones matemáticas, comparar valores y controlar el flujo de tu programa.

## 1. Operadores Aritméticos
Los operadores matemáticos básicos que puedes usar:

\`\`\`csharp
int a = 10;
int b = 3;

int suma = a + b;      // 13
int resta = a - b;     // 7
int multiplicacion = a * b;  // 30
int division = a / b;  // 3 (división entera)
int modulo = a % b;    // 1 (residuo de la división)

double divisionDecimal = 10.0 / 3.0;  // 3.333...
\`\`\`

## 2. Operadores de Comparación
Comparan dos valores y devuelven un \`bool\` (true/false):

\`\`\`csharp
int x = 5;
int y = 8;

bool esIgual = (x == y);        // false
bool esDiferente = (x != y);    // true
bool esMayor = (x > y);         // false
bool esMenor = (x < y);         // true
bool mayorOigual = (x >= 5);    // true
bool menorOigual = (y <= 8);    // true
\`\`\`

## 3. Operadores Lógicos
Combinan condiciones booleanas:

- \`&&\` (AND): Ambas condiciones deben ser verdaderas
- \`||\` (OR): Al menos una condición debe ser verdadera
- \`!\` (NOT): Invierte el valor

\`\`\`csharp
bool tieneEdadSuficiente = edad >= 18;
bool tieneLicencia = true;

bool puedeConducir = tieneEdadSuficiente && tieneLicencia;  // Ambas deben ser true
\`\`\`

## 4. If/Else Statements
Permiten tomar decisiones en tu código:

\`\`\`csharp
int edad = 20;

if (edad >= 18)
{
    Console.WriteLine("Eres mayor de edad");
}
else
{
    Console.WriteLine("Eres menor de edad");
}
\`\`\`

## 5. Switch Statement
Alternativa a múltiples \`if/else\` cuando comparas una variable con varios valores:

\`\`\`csharp
int dia = 3;

switch (dia)
{
    case 1:
        Console.WriteLine("Lunes");
        break;
    case 2:
        Console.WriteLine("Martes");
        break;
    case 3:
        Console.WriteLine("Miércoles");
        break;
    default:
        Console.WriteLine("Otro día");
        break;
}
\`\`\`
`,
    }
  })

  // Exercise 1 for Lesson 2
  await prisma.exercise.create({
    data: {
      lessonId: lesson2.id,
      title: "Calculadora de Áreas",
      description: "Crea un programa que calcule el área de diferentes figuras geométricas",
      instructions: "Crea un programa que:\n1. Tenga una variable 'figura' (1=Cuadrado, 2=Círculo, 3=Triángulo)\n2. Use switch para calcular el área según la figura\n3. Imprima el resultado\n\nUsa las fórmulas:\n- Cuadrado: lado * lado\n- Círculo: π * radio²\n- Triángulo: (base * altura) / 2",
      difficulty: "MEDIUM",
      order: 1,
      xpReward: 75,
      hints: [
        "Usa Math.PI para obtener el valor de π",
        "Recuerda usar 'break' después de cada caso en el switch",
        "Puedes usar variables tipo double para los cálculos"
      ],
      starterCode: `using System;

class Program
{
    static void Main(string[] args)
    {
        // Define la figura a calcular (1, 2 o 3)
        int figura = 1;

        // Usa switch para calcular el área
        switch (figura)
        {
            // Tu código aquí

        }
    }
}`,
      solution: `using System;

class Program
{
    static void Main(string[] args)
    {
        int figura = 1;

        switch (figura)
        {
            case 1:
                double lado = 5.0;
                double areaCuadrado = lado * lado;
                Console.WriteLine($"Área del cuadrado: {areaCuadrado}");
                break;

            case 2:
                double radio = 3.0;
                double areaCirculo = Math.PI * radio * radio;
                Console.WriteLine($"Área del círculo: {areaCirculo:F2}");
                break;

            case 3:
                double baseTriangulo = 6.0;
                double altura = 4.0;
                double areaTriangulo = (baseTriangulo * altura) / 2;
                Console.WriteLine($"Área del triángulo: {areaTriangulo}");
                break;

            default:
                Console.WriteLine("Figura no reconocida");
                break;
        }
    }
}`,
      testCases: {
        create: [
          {
            input: "figura = 1",
            expectedOutput: "25",
            isHidden: false,
            order: 1,
          }
        ]
      }
    }
  })

  // Create Recommendations
  await prisma.recommendation.createMany({
    data: [
      {
        title: "Git - Control de Versiones",
        description: "Aprende Git para gestionar el código de tus proyectos",
        technology: "Git",
        level: "BEGINNER",
        order: 1,
        resourceUrl: "https://git-scm.com/book/es/v2"
      },
      {
        title: "SQL - Bases de Datos",
        description: "Las aplicaciones necesitan persistir datos. SQL es esencial para trabajar con bases de datos relacionales",
        technology: "SQL",
        level: "JUNIOR",
        order: 1,
        resourceUrl: null
      },
      {
        title: "Entity Framework Core",
        description: "ORM oficial de .NET para trabajar con bases de datos de forma orientada a objetos",
        technology: "Entity Framework",
        level: "JUNIOR",
        order: 2,
        resourceUrl: null
      },
      {
        title: "ASP.NET Core",
        description: "Framework para crear aplicaciones web y APIs con .NET",
        technology: "ASP.NET Core",
        level: "MID_LEVEL",
        order: 1,
        resourceUrl: null
      },
      {
        title: "Docker",
        description: "Containerización es clave en el desarrollo moderno. Aprende Docker para empaquetar tus aplicaciones",
        technology: "Docker",
        level: "MID_LEVEL",
        order: 2,
        resourceUrl: null
      },
      {
        title: "Testing con xUnit",
        description: "Escribir tests es fundamental para código de calidad profesional",
        technology: "xUnit",
        level: "SENIOR",
        order: 1,
        resourceUrl: null
      },
      {
        title: "Arquitectura de Software",
        description: "Patrones de diseño, Clean Architecture, DDD y mejores prácticas",
        technology: "Arquitectura",
        level: "SENIOR",
        order: 2,
        resourceUrl: null
      }
    ]
  })

  console.log('Seed completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
