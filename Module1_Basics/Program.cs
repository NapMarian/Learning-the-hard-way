using System;

class Program
{
    static void Main(string[] args)
    {
        // --- Lección 2: Operadores y Control de Flujo ---

        Console.WriteLine("=== OPERADORES ARITMÉTICOS ===");
        
        int a = 15;
        int b = 4;
        
        Console.WriteLine($"a = {a}, b = {b}");
        Console.WriteLine($"Suma: {a} + {b} = {a + b}");
        Console.WriteLine($"Resta: {a} - {b} = {a - b}");
        Console.WriteLine($"Multiplicación: {a} * {b} = {a * b}");
        Console.WriteLine($"División: {a} / {b} = {a / b}"); // División entera
        Console.WriteLine($"Módulo (residuo): {a} % {b} = {a % b}");
        Console.WriteLine($"División decimal: {a} / {b} = {(double)a / b:F2}"); // Conversión a double

        Console.WriteLine("\n=== OPERADORES DE COMPARACIÓN ===");
        
        int edad = 29;
        int edadMinima = 18;
        
        Console.WriteLine($"Edad: {edad}, Edad mínima: {edadMinima}");
        Console.WriteLine($"¿Edad >= 18?: {edad >= edadMinima}");
        Console.WriteLine($"¿Edad < 18?: {edad < edadMinima}");
        Console.WriteLine($"¿Edad == 29?: {edad == 29}");

        Console.WriteLine("\n=== OPERADORES LÓGICOS ===");
        
        bool tieneEdadSuficiente = edad >= 18;
        bool tieneLicencia = true;
        bool puedeConducir = tieneEdadSuficiente && tieneLicencia;
        
        Console.WriteLine($"Tiene edad suficiente: {tieneEdadSuficiente}");
        Console.WriteLine($"Tiene licencia: {tieneLicencia}");
        Console.WriteLine($"¿Puede conducir? (ambas deben ser true): {puedeConducir}");

        Console.WriteLine("\n=== SWITCH STATEMENT ===");
        
        int diaDeLaSemana = 3;
        string nombreDia;
        
        switch (diaDeLaSemana)
        {
            case 1:
                nombreDia = "Lunes";
                break;
            case 2:
                nombreDia = "Martes";
                break;
            case 3:
                nombreDia = "Miércoles";
                break;
            case 4:
                nombreDia = "Jueves";
                break;
            case 5:
                nombreDia = "Viernes";
                break;
            case 6:
                nombreDia = "Sábado";
                break;
            case 7:
                nombreDia = "Domingo";
                break;
            default:
                nombreDia = "Día inválido";
                break;
        }
        
        Console.WriteLine($"El día {diaDeLaSemana} de la semana es: {nombreDia}");

        Console.WriteLine("\n=== TU EJERCICIO ===");
        Console.WriteLine("Calculadora de áreas:");
        
        // Cambia este valor para calcular diferentes figuras:
        // 1 = Cuadrado, 2 = Círculo, 3 = Triángulo
        int figura = 1;
        
        switch (figura)
        {
            case 1: // Cuadrado
                double lado = 5.0;
                double areaCuadrado = lado * lado;
                Console.WriteLine($"Área del cuadrado (lado={lado}): {areaCuadrado}");
                break;
                
            case 2: // Círculo
                double radio = 3.0;
                double areaCirculo = Math.PI * radio * radio;
                Console.WriteLine($"Área del círculo (radio={radio}): {areaCirculo:F2}");
                break;
                
            case 3: // Triángulo
                double baseTriangulo = 6.0;
                double alturaTriangulo = 4.0;
                double areaTriangulo = (baseTriangulo * alturaTriangulo) / 2;
                Console.WriteLine($"Área del triángulo (base={baseTriangulo}, altura={alturaTriangulo}): {areaTriangulo}");
                break;
                
            default:
                Console.WriteLine("Figura no reconocida. Usa 1, 2 o 3.");
                break;
        }

        Console.WriteLine("\nPresiona cualquier tecla para salir...");
        Console.ReadKey();
    }
}
