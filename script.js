

alert("Bienvenido a la Tienda JS!");
let nombre = prompt("¿Cuál es tu nombre?");
alert("Hola " + nombre + ", veamos qué querés comprar hoy.");


let seguirComprando = true;
let total = 0;


function sumar(precio1, precio2) {
  return precio1 + precio2;
}


while (seguirComprando) {
 
  let opcion = prompt(
    "Elige un producto:\n1 - Camiseta ($5000)\n2 - Gorra ($3000)\n3 - Zapatillas ($10000)\n4 - Salir"
  );

  
  if (opcion === "1") {
    alert("Agregaste una Camiseta al carrito");
    total = sumar(total, 5000);
  } else if (opcion === "2") {
    alert("Agregaste una Gorra al carrito");
    total = sumar(total, 3000);
  } else if (opcion === "3") {
    alert("Agregaste unas Zapatillas al carrito");
    total = sumar(total, 10000);
  } else if (opcion === "4") {
    alert("Gracias por tu compra, " + nombre + "!");
    seguirComprando = false;
  } else {
    alert("Opción no válida, por favor elegí otra.");
  }
}

alert("El total de tu compra es $" + total);
console.log("Cliente: " + nombre);
console.log("Total a pagar: $" + total);
