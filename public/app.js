const API_URL = '/api/productos';
const formulario = document.getElementById('form-producto');
const productoId = document.getElementById('producto-id');
const nombre = document.getElementById('nombre');
const descripcion = document.getElementById('descripcion');
const precio = document.getElementById('precio');
const stock = document.getElementById('stock');
const categoria = document.getElementById('categoria');
const listaProductos = document.getElementById('lista-productos');
const totalProductos = document.getElementById('total-productos');
const mensaje = document.getElementById('mensaje');
const tituloFormulario = document.getElementById('titulo-formulario');
const btnGuardar = document.getElementById('btn-guardar');
const btnCancelar = document.getElementById('btn-cancelar');
const btnRecargar = document.getElementById('btn-recargar');
// Mostrar mensajes al usuario
function mostrarMensaje(texto, tipo = 'exito') {
mensaje.textContent = texto;
mensaje.className = `mensaje ${tipo}`;
}
// Escapar texto antes de insertarlo en el HTML
function escaparHTML(valor) {
return String(valor ?? '').replace(/[&<>"']/g, caracter => ({
'&': '&amp;',
'<': '&lt;',
'>': '&gt;',
'"': '&quot;',
"'": '&#39;'
})[caracter]);
}
// Realizar solicitudes a la API
async function solicitarAPI(url, opciones = {}) {
const respuesta = await fetch(url, {
...opciones,
headers: {
...(opciones.body ? { 'Content-Type': 'application/json' } : {}),
...opciones.headers
}
});
const datos = await respuesta.json().catch(() => ({}));

if (!respuesta.ok) {
throw new Error(
datos.mensaje || `Error HTTP ${respuesta.status}`
);
}
return datos;
}
// Consultar y mostrar los productos
async function cargarProductos() {
listaProductos.textContent = 'Cargando productos...';
totalProductos.textContent = 'Consultando...';
try {
const productos = await solicitarAPI(API_URL);
if (!Array.isArray(productos)) {
throw new Error('La API no devolvió una lista válida.');
}
totalProductos.textContent =
`${productos.length} producto(s) registrado(s)`;
if (productos.length === 0) {
listaProductos.textContent =
'Todavía no hay productos registrados.';
return;
}
listaProductos.innerHTML = productos.map(producto => `
<article class="producto">
<h3>${escaparHTML(producto.nombre)}</h3>
<p>${escaparHTML(producto.descripcion || 'Sin descripción')}</p>
<p class="precio">
${Number(producto.precio).toLocaleString('es-MX', {
style: 'currency',
currency: 'MXN'
})}
</p>
<p><strong>Stock:</strong> ${escaparHTML(producto.stock)}</p>
<p><strong>Categoría:</strong>
${escaparHTML(producto.categoria || 'General')}

</p>
<div class="acciones-producto">
<button type="button" data-accion="editar"
data-id="${escaparHTML(producto._id)}">
Editar
</button>
<button type="button" class="eliminar"
data-accion="eliminar"
data-id="${escaparHTML(producto._id)}">
Eliminar
</button>
</div>
</article>
`).join('');
} catch (error) {
listaProductos.textContent =
'No fue posible cargar los productos.';
totalProductos.textContent = 'Error de conexión';
mostrarMensaje(error.message, 'error');
}
}
// Registrar o actualizar productos
formulario.addEventListener('submit', async evento => {
evento.preventDefault();
const id = productoId.value;
const datosProducto = {
nombre: nombre.value.trim(),
descripcion: descripcion.value.trim(),
precio: Number(precio.value),
stock: Number(stock.value),
categoria: categoria.value.trim() || 'General'
};
if (
!datosProducto.nombre ||
precio.value === '' ||
stock.value === '' ||
!Number.isFinite(datosProducto.precio) ||
datosProducto.precio < 0 ||
!Number.isInteger(datosProducto.stock) ||

datosProducto.stock < 0
) {
mostrarMensaje(
'Revisa el nombre, el precio y el stock.',
'error'
);
return;
}
btnGuardar.disabled = true;
try {
const resultado = await solicitarAPI(
id ? `${API_URL}/${encodeURIComponent(id)}` : API_URL,
{
method: id ? 'PUT' : 'POST',
body: JSON.stringify(datosProducto)
}
);
mostrarMensaje(
resultado.mensaje || 'Operación realizada correctamente.'
);
limpiarFormulario();
await cargarProductos();
} catch (error) {
mostrarMensaje(error.message, 'error');
} finally {
btnGuardar.disabled = false;
}
});
// Detectar los botones de editar y eliminar
listaProductos.addEventListener('click', async evento => {
const boton = evento.target.closest('button[data-accion]');
if (!boton) return;
const id = boton.dataset.id;
const accion = boton.dataset.accion;
if (accion === 'editar') {
try {
const producto = await solicitarAPI(
`${API_URL}/${encodeURIComponent(id)}`

);
productoId.value = producto._id;
nombre.value = producto.nombre;
descripcion.value = producto.descripcion || '';
precio.value = producto.precio;
stock.value = producto.stock;
categoria.value = producto.categoria || '';
tituloFormulario.textContent = 'Editar producto';
btnGuardar.textContent = 'Guardar cambios';
btnCancelar.hidden = false;
formulario.scrollIntoView({
behavior: 'smooth',
block: 'start'
});
nombre.focus();
} catch (error) {
mostrarMensaje(error.message, 'error');
}
}
if (accion === 'eliminar') {
const confirmar = window.confirm(
'¿Seguro que deseas eliminar este producto?'
);
if (!confirmar) return;
boton.disabled = true;
try {
const resultado = await solicitarAPI(
`${API_URL}/${encodeURIComponent(id)}`,
{ method: 'DELETE' }
);
if (productoId.value === id) {
limpiarFormulario();
}
mostrarMensaje(
resultado.mensaje || 'Producto eliminado correctamente.'
);

await cargarProductos();
} catch (error) {
mostrarMensaje(error.message, 'error');
boton.disabled = false;
}
}
});
// Restablecer el formulario
function limpiarFormulario() {
formulario.reset();
productoId.value = '';
tituloFormulario.textContent = 'Registrar producto';
btnGuardar.textContent = 'Guardar producto';
btnCancelar.hidden = true;
}
btnCancelar.addEventListener('click', limpiarFormulario);
btnRecargar.addEventListener('click', cargarProductos);
// Consultar los productos al abrir la página
cargarProductos();