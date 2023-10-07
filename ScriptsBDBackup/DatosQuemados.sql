-- Sentencias INSERT para la tabla Perfil
INSERT INTO Perfil (nombre) VALUES ('programador');
INSERT INTO Perfil (nombre) VALUES ('dise�ador');
INSERT INTO Perfil (nombre) VALUES ('administrador');

-- Sentencias INSERT para la tabla Estado
INSERT INTO Estado (nombre) VALUES ('Eliminado');
INSERT INTO Estado (nombre) VALUES ('En progreso');
INSERT INTO Estado (nombre) VALUES ('Solicitado');
INSERT INTO Estado (nombre) VALUES ('En planeaci�n');
INSERT INTO Estado (nombre) VALUES ('Activo');
INSERT INTO Estado (nombre) VALUES ('Inactivo');

-- Sentencias INSERT para la tabla Funcionario
INSERT INTO Funcionario (nombre, apellido, fechaNacimiento, cedula, numTelefonno, correo, idEstado, fechaIngreso, idPerfil)
VALUES ('Catalina', 'Espinach', '1990-01-15', 123456789, 88888888, 'cat.esp@itcr.com', 5, '2021-05-10', 3);
INSERT INTO Funcionario (nombre, apellido, fechaNacimiento, cedula, numTelefonno, correo, idEstado, fechaIngreso, idPerfil)
VALUES ('Mario', 'Chac�n', '1985-09-25', 987654321, 88888888, 'mar.cha@itcr.com', 5, '2020-08-20', 3);

-- Sentencias INSERT para la tabla Modalidad
INSERT INTO Modalidad (nombre, descripcion)
VALUES ('presencial', 'Modalidad de capacitaci�n presencial.');
INSERT INTO Modalidad (nombre, descripcion)
VALUES ('virtual', 'Modalidad de capacitaci�n virtual.');
INSERT INTO Modalidad (nombre, descripcion)
VALUES ('h�brida', 'Modalidad de capacitaci�n h�brida.');

-- Sentencias INSERT para la tabla TipoCapacitacion
INSERT INTO TipoCapacitacion (nombre)
VALUES ('Aplicaci�n y evaluaci�n de Accesibilidad Web');
INSERT INTO TipoCapacitacion (nombre)
VALUES ('Teleconferencias y videoconferencias Accesibles');
INSERT INTO TipoCapacitacion (nombre)
VALUES ('Uso de Lectores de Pantalla');

-- Sentencias INSERT para la tabla TipoEvaluacion
INSERT INTO TipoEvaluacion (nombre, precio)
VALUES ('Evaluacion1', 10000);
INSERT INTO TipoEvaluacion (nombre, precio)
VALUES ('Evaluacion2', 15000);
INSERT INTO TipoEvaluacion (nombre, precio)
VALUES ('Evaluacion3', 20000);

-- Sentencias INSERT para la tabla Cliente
INSERT INTO Cliente (cedJuridica, nombre, numTelefono, correo, fechaIngreso, idEstado)
VALUES (123456789, 'ICE', 22223333, 'ice@gmail.com', '2023-10-05', 5);
INSERT INTO Cliente (cedJuridica, nombre, numTelefono, correo, fechaIngreso, idEstado)
VALUES (987654321, 'UCR', 44445555, 'ucr@gmail.com', '2023-10-05', 6);
INSERT INTO Cliente (cedJuridica, nombre, numTelefono, correo, fechaIngreso, idEstado)
VALUES (567890123, 'ESPH', 66667777, 'esph@gmail.com', '2023-10-05', 5);

-- Sentencias INSERT para la tabla Proyecto
INSERT INTO Proyecto (idProyecto, nombre, descripcion, idCliente, documento, fechaInicio, fechaFinalizacion, subTotal, idEstado)
VALUES ('CA001', 'Proyecto A', 'Descripci�n del Proyecto A', 1, null, '2023-10-05', '2023-12-31', 1000.00, 1);
INSERT INTO Proyecto (idProyecto, nombre, descripcion, idCliente, documento, fechaInicio, fechaFinalizacion, subTotal, idEstado)
VALUES ('CA001', 'Proyecto B', 'Descripci�n del Proyecto B', 2, null, '2023-11-01', '2024-01-31', 1500.00, 2);
INSERT INTO Proyecto (idProyecto, nombre, descripcion, idCliente, documento, fechaInicio, fechaFinalizacion, subTotal, idEstado)
VALUES ('CA001', 'Proyecto C', 'Descripci�n del Proyecto C', 3, null, '2023-12-15', '2024-03-15', 2000.00, 3);

-- Sentencias INSERT para la tabla Evaluacion
INSERT INTO Evaluacion (idEvaluacion, nombre, descripcion, fechaCreacion, idTipo, fechaEjecucion, documento, idEstado, precio, idProyecto, idCliente)
VALUES ('EVAL001', 'Evaluaci�n 1', 'Descripci�n de la Evaluaci�n 1', '2023-10-10', 1, '2023-10-15', null, 1, 500.00, 1, 1);
INSERT INTO Evaluacion (idEvaluacion, nombre, descripcion, fechaCreacion, idTipo, fechaEjecucion, documento, idEstado, precio, idProyecto, idCliente)
VALUES ('EVAL002', 'Evaluaci�n 2', 'Descripci�n de la Evaluaci�n 2', '2023-11-15', 2, '2023-11-20', null, 2, 750.00, 2, 2);
INSERT INTO Evaluacion (idEvaluacion, nombre, descripcion, fechaCreacion, idTipo, fechaEjecucion, documento, idEstado, precio, idProyecto, idCliente)
VALUES ('EVAL003', 'Evaluaci�n 3', 'Descripci�n de la Evaluaci�n 3', '2023-12-20', 3, '2023-12-25', null, 3, 1000.00, 3, 3);

-- Sentencias INSERT para la tabla Capacitacion
INSERT INTO Capacitacion (idCapacitacion, nombre, descripcion, fechaCreacion, fechaEjecucion, documento, idEstado, horasDuracion, fechaFinalizacion, idModalidad, idFuncionario, precio, idTipo, idProyecto, idCliente)
VALUES ('CA001', 'Capacitaci�n 1', 'Descripci�n de la Capacitaci�n 1', '2023-10-10', '2023-10-15', 0x54686973206973206120646F63756D656E74, 1, 20, '2023-10-30', 1, 1, 500.00, 1, 1, 1);
INSERT INTO Capacitacion (idCapacitacion, nombre, descripcion, fechaCreacion, fechaEjecucion, documento, idEstado, horasDuracion, fechaFinalizacion, idModalidad, idFuncionario, precio, idTipo, idProyecto, idCliente)
VALUES ('CA002', 'Capacitaci�n 2', 'Descripci�n de la Capacitaci�n 2', '2023-11-15', '2023-11-20', 0x546869732069732062, 2, 30, '2023-12-15', 2, 2, 750.00, 2, 2, 2);
INSERT INTO Capacitacion (idCapacitacion, nombre, descripcion, fechaCreacion, fechaEjecucion, documento, idEstado, horasDuracion, fechaFinalizacion, idModalidad, idFuncionario, precio, idTipo, idProyecto, idCliente)
VALUES ('CA003', 'Capacitaci�n 3', 'Descripci�n de la Capacitaci�n 3', '2023-12-20', '2023-12-25', 0x546869732069732063, 3, 25, '2024-01-10', 3, 3, 1000.00, 3, 3, 3);

-- Insertar un usuario con datos completos
INSERT INTO Usuario (nombre, apellido, fechaNacimiento, cedula, numTelefono, correo, fechaIngreso, contrasenha, idEstado)
VALUES ('Catalina', 'Espinach', '1990-05-15', 123456789, 555-123-4567, 'cat.esp@itcr.com', '2023-01-10', '123', 5);

-- Insertar valores en la tabla Porcentajes
INSERT INTO Porcentajes (fdu, coordinacionGeneral, coordinacionEspecifica, iva, fechaIngreso, idUsuario)
VALUES (0.1, 0.05, 0.03, 0.13, '2023-10-05', 1);

-- Insertar valores en la tabla Cotizacion
INSERT INTO Cotizacion (nombre, descripcion, idCliente, idPorcentajesC, total, idServicio, idEstado, fechaCreacion)
VALUES ('Cotizaci�n 1', 'Descripci�n de la cotizaci�n 1', 1, 1, 1500.00, 'CA001', 2, '2023-10-05');
INSERT INTO Cotizacion (nombre, descripcion, idCliente, idPorcentajesC, total, idServicio, idEstado, fechaCreacion)
VALUES ('Cotizaci�n 2', 'Descripci�n de la cotizaci�n 2', 2, 1, 1500.00, 'EVAL001', 2, '2023-10-05');

-- Insertar valores en la tabla ProyectoXFuncionario
INSERT INTO ProyectoXFuncionario (idProyecto, idFuncionario)
VALUES (1, 1);
-- Insertar valores en la tabla ProyectoXFuncionario
INSERT INTO ProyectoXFuncionario (idProyecto, idFuncionario)
VALUES (1, 2);
