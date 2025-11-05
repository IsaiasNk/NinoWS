let cantidad = prompt("Ingrese la cantidad de unidades que desea comprar:");
cantidad = Number(cantidad);
let precioUnitario = 100; // por ejemplo
let descuento = 0;
if (cantidad > 100) {
  descuento = 0.20;
} else if (cantidad > 50) {
  descuento = 0.15;
} else if (cantidad > 20) {
  descuento = 0.10;
} else {
  descuento = 0;
}
let total = cantidad * precioUnitario;
let totalConDescuento = total - (total * descuento);
console.log("Cantidad: " + cantidad);
console.log("Precio unitario: $" + precioUnitario);
console.log("Descuento aplicado: " + (descuento * 100) + "%");
console.log("Total a pagar: $" + totalConDescuento);