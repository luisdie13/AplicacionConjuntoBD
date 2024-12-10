// Importar la librería mysql2
const mysql = require('mysql2');

// Configuración de la conexión a la base de datos
const conexion = mysql.createConnection({
  host: 'localhost',
  user: 'userapp', // Reemplazar con el nombre de usuario configurado
  password: '51250539Ldoc.', // Reemplazar con la contraseña configurada
  database: 'bancodb'
});

// Conectar a la base de datos
conexion.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conexión a la base de datos establecida.');
  
  // Realizar las consultas solicitadas
  listadoCuentas();
  listadoClientes();
  listadoCuentasClientes();
  listadoClientesSinCuentas();
});

// 3.1. Listado de todas las cuentas creadas
function listadoCuentas() {
  conexion.query('SELECT * FROM Cuentas', (err, result) => {
    if (err) {
      console.error('Error al obtener cuentas:', err);
      return;
    }
    console.log('\nListado de todas las cuentas creadas:');
    console.log(result);
  });
}

// 3.2. Listado de todos los clientes creados
function listadoClientes() {
  conexion.query('SELECT * FROM Clientes', (err, result) => {
    if (err) {
      console.error('Error al obtener clientes:', err);
      return;
    }
    console.log('\nListado de todos los clientes creados:');
    console.log(result);
  });
}

// 3.3. Listado de todas las cuentas que están asociadas a clientes
function listadoCuentasClientes() {
  const query = `
    SELECT Cuentas.id AS cuenta_id, Cuentas.numero_cuenta, Clientes.nombre AS cliente_nombre 
    FROM Cuentas
    JOIN Clientes ON Cuentas.cliente_id = Clientes.id
  `;
  
  conexion.query(query, (err, result) => {
    if (err) {
      console.error('Error al obtener cuentas asociadas a clientes:', err);
      return;
    }
    console.log('\nListado de todas las cuentas asociadas a clientes:');
    console.log(result);
  });
}

// 3.4. Listado de todos los clientes que no tienen cuentas asociadas
function listadoClientesSinCuentas() {
  const query = `
    SELECT Clientes.id, Clientes.nombre
    FROM Clientes
    LEFT JOIN Cuentas ON Clientes.id = Cuentas.cliente_id
    WHERE Cuentas.cliente_id IS NULL
  `;
  
  conexion.query(query, (err, result) => {
    if (err) {
      console.error('Error al obtener clientes sin cuentas:', err);
      return;
    }
    console.log('\nListado de clientes sin cuentas asociadas:');
    console.log(result);
  });
}