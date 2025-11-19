# Lección 2: Operadores y Control de Flujo

En esta lección aprenderás a realizar operaciones matemáticas, comparar valores y controlar el flujo de tu programa.

## 1. Operadores Aritméticos
Los operadores matemáticos básicos que puedes usar:

```csharp
int a = 10;
int b = 3;

int suma = a + b;      // 13
int resta = a - b;     // 7
int multiplicacion = a * b;  // 30
int division = a / b;  // 3 (división entera)
int modulo = a % b;    // 1 (residuo de la división)

double divisionDecimal = 10.0 / 3.0;  // 3.333...
```

## 2. Operadores de Comparación
Comparan dos valores y devuelven un `bool` (true/false):

```csharp
int x = 5;
int y = 8;

bool esIgual = (x == y);        // false
bool esDiferente = (x != y);    // true
bool esMayor = (x > y);         // false
bool esMenor = (x < y);         // true
bool mayorOigual = (x >= 5);    // true
bool menorOigual = (y <= 8);    // true
```

## 3. Operadores Lógicos
Combinan condiciones booleanas:

- `&&` (AND): Ambas condiciones deben ser verdaderas
- `||` (OR): Al menos una condición debe ser verdadera
- `!` (NOT): Invierte el valor

```csharp
bool tieneEdadSuficiente = edad >= 18;
bool tieneLicencia = true;

bool puedeConducir = tieneEdadSuficiente && tieneLicencia;  // Ambas deben ser true
```

## 4. Switch Statement
Alternativa a múltiples `if/else` cuando comparas una variable con varios valores:

```csharp
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
```

## Tu Tarea
Vamos a crear un pequeño programa que calcule el área de diferentes figuras geométricas usando operadores y `switch`.
