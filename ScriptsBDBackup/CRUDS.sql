-- Tabla Perfil
-- Create (Insertar un nuevo perfil):
GO
CREATE PROCEDURE createPerfil
    @nombre VARCHAR(50)
AS
BEGIN
    INSERT INTO Perfil (nombre)
    VALUES (@nombre);
END
GO

GO
-- Read (Leer información de un perfil por ID):
CREATE PROCEDURE readPerfil
    @idperfil INT
AS
BEGIN
    SELECT idPerfil, nombre
    FROM Perfil
    WHERE idPerfil = @idperfil;
END
GO

GO
-- Update (Actualizar un perfil por ID):
CREATE PROCEDURE updatePerfil
    @idPerfil INT,
    @nombre VARCHAR(50)
AS
BEGIN
    UPDATE Perfil
    SET nombre = ISNULL(@nombre, nombre)
    WHERE idPerfil = @idPerfil;
END
GO

GO
-- Delete (Eliminar un perfil por ID):
CREATE PROCEDURE deletePerfil
    @idperfil INT
AS
BEGIN
    DELETE FROM Perfil
    WHERE idPerfil = @idperfil;
END
GO

GO
-- Tabla Estado
-- Create (Insertar un nuevo estado):
CREATE PROCEDURE createEstado
    @nombre VARCHAR(50)
AS
BEGIN
    INSERT INTO Estado (nombre)
    VALUES (@nombre);
END
GO

GO
-- Read (Leer información de un estado por ID):
CREATE PROCEDURE readEstado
    @idEstado INT
AS
BEGIN
    SELECT idEstado, nombre
    FROM Estado
    WHERE idEstado = @idEstado;
END
GO

GO
-- Update (Actualizar un estado por ID):
CREATE PROCEDURE updateEstado
    @idEstado INT,
    @nombre VARCHAR(50)
AS
BEGIN
    UPDATE Estado
    SET nombre = ISNULL(@nombre, nombre)
    WHERE idEstado = @idEstado;
END
GO

GO
-- Delete (Eliminar un estado por ID):
CREATE PROCEDURE deleteEstado
    @idEstado INT
AS
BEGIN
    DELETE FROM Estado
    WHERE idEstado = @idEstado;
END
GO

GO
-- Tabla Funcionario
-- Create (Insertar un nuevo funcionario):
CREATE PROCEDURE createFuncionario
    @nombre VARCHAR(50),
    @apellido VARCHAR(50),
    @fechaNacimiento DATE,
    @cedula INT,
    @numTelefono INT,
    @correo VARCHAR(50),
    @idEstado INT,
    @fechaIngreso DATE,
    @idPerfil INT
AS
BEGIN
    INSERT INTO Funcionario (nombre, apellido, fechaNacimiento, cedula, numTelefonno, correo, idEstado, fechaIngreso, idPerfil)
    VALUES (@nombre, @apellido, @fechaNacimiento, @cedula, @numTelefono, @correo, @idEstado, @fechaIngreso, @idPerfil);
END
GO

GO
-- Read (Leer información de un funcionario por ID):
CREATE PROCEDURE readFuncionario
    @idFuncionario INT
AS
BEGIN
    SELECT idFuncionario, nombre, apellido, fechaNacimiento, cedula, numTelefonno, correo, idEstado, fechaIngreso, idPerfil
    FROM Funcionario
    WHERE idFuncionario = @idFuncionario;
END
GO

GO
-- Update (Actualizar un funcionario por ID):
CREATE PROCEDURE updateFuncionario
    @idFuncionario INT,
    @nombre VARCHAR(50),
    @apellido VARCHAR(50),
    @fechaNacimiento DATE,
    @cedula INT,
    @numTelefono INT,
    @correo VARCHAR(50),
    @idEstado INT,
    @fechaIngreso DATE,
    @idPerfil INT
AS
BEGIN
    UPDATE Funcionario
    SET nombre = ISNULL(@nombre, nombre),
        apellido = ISNULL(@apellido, apellido),
        fechaNacimiento = ISNULL(@fechaNacimiento, fechaNacimiento),
        cedula = ISNULL(@cedula, cedula),
        numTelefonno = ISNULL(@numTelefono, numTelefonno),
        correo = ISNULL(@correo, correo),
        idEstado = ISNULL(@idEstado, idEstado),
        fechaIngreso = ISNULL(@fechaIngreso, fechaIngreso),
        idPerfil = ISNULL(@idPerfil, idPerfil)
    WHERE idFuncionario = @idFuncionario;
END
GO

GO
-- Delete (Eliminar un funcionario por ID):
CREATE PROCEDURE deleteFuncionario
    @idFuncionario INT
AS
BEGIN
    DELETE FROM Funcionario
    WHERE idFuncionario = @idFuncionario;
END
GO

GO
-- Tabla Modalidad
-- Create (Insertar una nueva modalidad):
CREATE PROCEDURE createModalidad
    @nombre VARCHAR(50),
    @descripcion VARCHAR(100)
AS
BEGIN
    INSERT INTO Modalidad (nombre, descripcion)
    VALUES (@nombre, @descripcion);
END
GO

GO
-- Read (Leer información de una modalidad por ID):
CREATE PROCEDURE readModalidad
    @idModalidad INT
AS
BEGIN
    SELECT idModalidad, nombre, descripcion
    FROM Modalidad
    WHERE idModalidad = @idModalidad;
END
GO

GO
-- Update (Actualizar una modalidad por ID):
CREATE PROCEDURE updateModalidad
    @idModalidad INT,
    @nombre VARCHAR(50),
    @descripcion VARCHAR(100)
AS
BEGIN
    UPDATE Modalidad
    SET nombre = ISNULL(@nombre, nombre),
        descripcion = ISNULL(@descripcion, descripcion)
    WHERE idModalidad = @idModalidad;
END
GO

GO
-- Delete (Eliminar una modalidad por ID):
CREATE PROCEDURE deleteModalidad
    @idModalidad INT
AS
BEGIN
    DELETE FROM Modalidad
    WHERE idModalidad = @idModalidad;
END
GO

GO
-- Tabla TipoCapacitacion
-- Create (Insertar un nuevo tipo de capacitación):
CREATE PROCEDURE createTipoCapacitacion
    @nombre VARCHAR(50)
AS
BEGIN
    INSERT INTO TipoCapacitacion (nombre)
    VALUES (@nombre);
END
GO

GO
-- Read (Leer información de un tipo de capacitación por ID):
CREATE PROCEDURE readTipoCapacitacion
    @idTipo INT
AS
BEGIN
    SELECT idTipo, nombre
    FROM TipoCapacitacion
    WHERE idTipo = @idTipo;
END
GO

GO
-- Update (Actualizar un tipo de capacitación por ID):
CREATE PROCEDURE updateTipoCapacitacion
    @idTipo INT,
    @nombre VARCHAR(50)
AS
BEGIN
    UPDATE TipoCapacitacion
    SET nombre = ISNULL(@nombre, nombre)
    WHERE idTipo = @idTipo;
END
GO

GO
-- Delete (Eliminar un tipo de capacitación por ID):
CREATE PROCEDURE deleteTipoCapacitacion
    @idTipo INT
AS
BEGIN
    DELETE FROM TipoCapacitacion
    WHERE idTipo = @idTipo;
END
GO

GO
-- Tabla TipoEvaluacion
-- Create (Insertar un nuevo tipo de evaluación):
CREATE PROCEDURE createTipoEvaluacion
    @nombre VARCHAR(50),
    @precio FLOAT
AS
BEGIN
    INSERT INTO TipoEvaluacion (nombre, precio)
    VALUES (@nombre, @precio);
END
GO

GO
-- Read (Leer información de un tipo de evaluación por ID):
CREATE PROCEDURE readTipoEvaluacion
    @idTipo INT
AS
BEGIN
    SELECT idTipo, nombre, precio
    FROM TipoEvaluacion
    WHERE idTipo = @idTipo;
END
GO

GO
-- Update (Actualizar un tipo de evaluación por ID):
CREATE PROCEDURE updateTipoEvaluacion
    @idTipo INT,
    @nombre VARCHAR(50),
    @precio FLOAT
AS
BEGIN
    UPDATE TipoEvaluacion
    SET nombre = ISNULL(@nombre, nombre),
        precio = ISNULL(@precio, precio)
    WHERE idTipo = @idTipo;
END
GO

GO
-- Delete (Eliminar un tipo de evaluación por ID):
CREATE PROCEDURE deleteTipoEvaluacion
    @idTipo INT
AS
BEGIN
    DELETE FROM TipoEvaluacion
    WHERE idTipo = @idTipo;
END
GO

GO
-- Tabla Cliente
-- Create (Insertar un nuevo cliente):
CREATE PROCEDURE createCliente
    @cedJuridica INT,
    @nombre VARCHAR(50),
    @numTelefono INT,
    @correo VARCHAR(100),
    @fechaIngreso DATE,
    @idEstado INT
AS
BEGIN
    INSERT INTO Cliente (cedJuridica, nombre, numTelefono, correo, fechaIngreso, idEstado)
    VALUES (@cedJuridica, @nombre, @numTelefono, @correo, @fechaIngreso, @idEstado);
END
GO

GO
-- Read (Leer información de un cliente por ID):
CREATE PROCEDURE readCliente
    @idCliente INT
AS
BEGIN
    SELECT idCliente, cedJuridica, nombre, numTelefono, correo, fechaIngreso, idEstado
    FROM Cliente
    WHERE idCliente = @idCliente;
END
GO

GO
-- Update (Actualizar un cliente por ID):
CREATE PROCEDURE updateCliente
    @idCliente INT,
    @cedJuridica INT,
    @nombre VARCHAR(50),
    @numTelefono INT,
    @correo VARCHAR(100),
    @fechaIngreso DATE,
    @idEstado INT
AS
BEGIN
    UPDATE Cliente
    SET cedJuridica = @cedJuridica,
        nombre = ISNULL(@nombre, nombre),
        numTelefono = ISNULL(@numTelefono, numTelefono),
        correo = ISNULL(@correo, correo),
        fechaIngreso = ISNULL(@fechaIngreso, fechaIngreso),
        idEstado = ISNULL(@idEstado, idEstado)
    WHERE idCliente = @idCliente;
END
GO

GO
-- Delete (Eliminar un cliente por ID):
CREATE PROCEDURE deleteCliente
    @idCliente INT
AS
BEGIN
    DELETE FROM Cliente
    WHERE idCliente = @idCliente;
END
GO

GO
-- Tabla Proyecto
-- Create (Insertar un nuevo proyecto):
CREATE PROCEDURE createProyecto
    @idProyecto VARCHAR(20),
    @nombre VARCHAR(50),
    @descripcion VARCHAR(100),
    @idCliente INT,
    @documento VARBINARY(MAX),
    @fechaInicio DATE,
    @fechaFinalizacion DATE,
    @subTotal FLOAT,
    @idEstado INT
AS
BEGIN
    INSERT INTO Proyecto (idProyecto, nombre, descripcion, idCliente, documento, fechaInicio, fechaFinalizacion, subTotal, idEstado)
    VALUES (@idProyecto, @nombre, @descripcion, @idCliente, @documento, @fechaInicio, @fechaFinalizacion, @subTotal, @idEstado);
END
GO

GO
-- Read (Leer información de un proyecto por ID):
CREATE PROCEDURE readProyecto
    @id INT
AS
BEGIN
    SELECT id, idProyecto, nombre, descripcion, idCliente, fechaInicio, fechaFinalizacion, subTotal, idEstado
    FROM Proyecto
    WHERE id = @id;
END
GO

GO
-- Update (Actualizar un proyecto por ID):
CREATE PROCEDURE updateProyecto
    @id INT,
    @idProyecto VARCHAR(20),
    @nombre VARCHAR(50),
    @descripcion VARCHAR(100),
    @idCliente INT,
    @documento VARBINARY(MAX),
    @fechaInicio DATE,
    @fechaFinalizacion DATE,
    @subTotal FLOAT,
    @idEstado INT
AS
BEGIN
    UPDATE Proyecto
    SET idProyecto = @idProyecto,
        nombre = ISNULL(@nombre, nombre),
        descripcion = ISNULL(@descripcion, descripcion),
        idCliente = @idCliente,
        documento = @documento,
        fechaInicio = ISNULL(@fechaInicio, fechaInicio),
        fechaFinalizacion = ISNULL(@fechaFinalizacion, fechaFinalizacion),
        subTotal = ISNULL(@subTotal, subTotal),
        idEstado = ISNULL(@idEstado, idEstado)
    WHERE id = @id;
END
GO

GO
-- Delete (Eliminar un proyecto por ID):
CREATE PROCEDURE deleteProyecto
    @id INT
AS
BEGIN
    DELETE FROM Proyecto
    WHERE id = @id;
END
GO

GO
-- Tabla Evaluacion
-- Create (Insertar una nueva evaluación):
CREATE PROCEDURE createEvaluacion
    @idEvaluacion VARCHAR(20),
    @nombre VARCHAR(50),
    @descripcion VARCHAR(50),
    @fechaCreacion DATE,
    @idTipo INT,
    @fechaEjecucion DATE,
    @documento VARBINARY(MAX),
    @idEstado INT,
    @precio MONEY,
    @idProyecto INT,
    @idCliente INT
AS
BEGIN
    INSERT INTO Evaluacion (idEvaluacion, nombre, descripcion, fechaCreacion, idTipo, fechaEjecucion, documento, idEstado, precio, idProyecto, idCliente)
    VALUES (@idEvaluacion, @nombre, @descripcion, @fechaCreacion, @idTipo, @fechaEjecucion, @documento, @idEstado, @precio, @idProyecto, @idCliente);
END
GO

GO
-- Read (Leer información de una evaluación por ID):
CREATE PROCEDURE readEvaluacion
    @id INT
AS
BEGIN
    SELECT id, idEvaluacion, nombre, descripcion, fechaCreacion, idTipo, fechaEjecucion, documento, idEstado, precio, idProyecto, idCliente
    FROM Evaluacion
    WHERE id = @id;
END
GO

GO
-- Update (Actualizar una evaluación por ID):
CREATE PROCEDURE updateEvaluacion
    @id INT,
    @idEvaluacion VARCHAR(20),
    @nombre VARCHAR(50),
    @descripcion VARCHAR(50),
    @fechaCreacion DATE,
    @idTipo INT,
    @fechaEjecucion DATE,
    @documento VARBINARY(MAX),
    @idEstado INT,
    @precio MONEY,
    @idProyecto INT,
    @idCliente INT
AS
BEGIN
    UPDATE Evaluacion
    SET idEvaluacion = @idEvaluacion,
        nombre = ISNULL(@nombre, nombre),
        descripcion = ISNULL(@descripcion, descripcion),
        fechaCreacion = ISNULL(@fechaCreacion, fechaCreacion),
        idTipo = @idTipo,
        fechaEjecucion = ISNULL(@fechaEjecucion, fechaEjecucion),
        documento = @documento,
        idEstado = @idEstado,
        precio = ISNULL(@precio, precio),
        idProyecto = @idProyecto,
        idCliente = @idCliente
    WHERE id = @id;
END
GO

GO
-- Delete (Eliminar una evaluación por ID):
CREATE PROCEDURE deleteEvaluacion
    @id INT
AS
BEGIN
    DELETE FROM Evaluacion
    WHERE id = @id;
END
GO

GO
-- Tabla Capacitacion
-- Create (Insertar una nueva capacitación):
CREATE PROCEDURE createCapacitacion
    @idCapacitacion VARCHAR(20),
    @nombre VARCHAR(50),
    @descripcion VARCHAR(50),
    @fechaCreacion DATE,
    @fechaEjecucion DATE,
    @documento VARBINARY(MAX),
    @idEstado INT,
    @horasDuracion INT,
    @fechaFinalizacion DATE,
    @idModalidad INT,
    @idFuncionario INT,
    @precio MONEY,
    @idTipo INT,
    @idProyecto INT,
    @idCliente INT
AS
BEGIN
    INSERT INTO Capacitacion (idCapacitacion, nombre, descripcion, fechaCreacion, fechaEjecucion, documento, idEstado, horasDuracion, fechaFinalizacion, idModalidad, idFuncionario, precio, idTipo, idProyecto, idCliente)
    VALUES (@idCapacitacion, @nombre, @descripcion, @fechaCreacion, @fechaEjecucion, @documento, @idEstado, @horasDuracion, @fechaFinalizacion, @idModalidad, @idFuncionario, @precio, @idTipo, @idProyecto, @idCliente);
END
GO

GO
-- Read (Leer información de una capacitación por ID):
CREATE PROCEDURE readCapacitacion
    @id INT
AS
BEGIN
    SELECT id, idCapacitacion, nombre, descripcion, fechaCreacion, fechaEjecucion, documento, idEstado, horasDuracion, fechaFinalizacion, idModalidad, idFuncionario, precio, idTipo, idProyecto, idCliente
    FROM Capacitacion
    WHERE id = @id;
END
GO

GO
-- Update (Actualizar una capacitación por ID):
CREATE PROCEDURE updateCapacitacion
    @id INT,
    @idCapacitacion VARCHAR(20),
    @nombre VARCHAR(50),
    @descripcion VARCHAR(50),
    @fechaCreacion DATE,
    @fechaEjecucion DATE,
    @documento VARBINARY(MAX),
    @idEstado INT,
    @horasDuracion INT,
    @fechaFinalizacion DATE,
    @idModalidad INT,
    @idFuncionario INT,
    @precio MONEY,
    @idTipo INT,
    @idProyecto INT,
    @idCliente INT
AS
BEGIN
    UPDATE Capacitacion
    SET idCapacitacion = @idCapacitacion,
        nombre = ISNULL(@nombre, nombre),
        descripcion = ISNULL(@descripcion, descripcion),
        fechaCreacion = ISNULL(@fechaCreacion, fechaCreacion),
        fechaEjecucion = ISNULL(@fechaEjecucion, fechaEjecucion),
        documento = @documento,
        idEstado = @idEstado,
        horasDuracion = ISNULL(@horasDuracion, horasDuracion),
        fechaFinalizacion = ISNULL(@fechaFinalizacion, fechaFinalizacion),
        idModalidad = @idModalidad,
        idFuncionario = @idFuncionario,
        precio = ISNULL(@precio, precio),
        idTipo = @idTipo,
        idProyecto = @idProyecto,
        idCliente = @idCliente
    WHERE id = @id;
END
GO

GO
-- Delete (Eliminar una capacitación por ID):
CREATE PROCEDURE deleteCapacitacion
    @id INT
AS
BEGIN
    DELETE FROM Capacitacion
    WHERE id = @id;
END
GO

GO
-- Tabla Usuario
-- Create (Insertar un nuevo usuario):
CREATE PROCEDURE createUsuario
    @nombre VARCHAR(50),
    @apellido VARCHAR(50),
    @fechaNacimiento DATE,
    @cedula INT,
    @numTelefono INT,
    @correo VARCHAR(100),
    @fechaIngreso DATE,
    @contrasenha VARCHAR(10),
    @idEstado INT
AS
BEGIN
    INSERT INTO Usuario (nombre, apellido, fechaNacimiento, cedula, numTelefono, correo, fechaIngreso, contrasenha, idEstado)
    VALUES (@nombre, @apellido, @fechaNacimiento, @cedula, @numTelefono, @correo, @fechaIngreso, @contrasenha, @idEstado);
END
GO

GO
-- Read (Leer información de un usuario por ID):
CREATE PROCEDURE readUsuario
    @idUsuario INT
AS
BEGIN
    SELECT idUsuario, nombre, apellido, fechaNacimiento, cedula, numTelefono, correo, fechaIngreso, contrasenha, idEstado
    FROM Usuario
    WHERE idUsuario = @idUsuario;
END
GO

GO
-- Update (Actualizar un usuario por ID):
CREATE PROCEDURE updateUsuario
    @idUsuario INT,
    @nombre VARCHAR(50),
    @apellido VARCHAR(50),
    @fechaNacimiento DATE,
    @cedula INT,
    @numTelefono INT,
    @correo VARCHAR(100),
    @fechaIngreso DATE,
    @contrasenha VARCHAR(10),
    @idEstado INT
AS
BEGIN
    UPDATE Usuario
    SET nombre = ISNULL(@nombre, nombre),
        apellido = ISNULL(@apellido, apellido),
        fechaNacimiento = ISNULL(@fechaNacimiento, fechaNacimiento),
        cedula = ISNULL(@cedula, cedula),
        numTelefono = ISNULL(@numTelefono, numTelefono),
        correo = ISNULL(@correo, correo),
        fechaIngreso = ISNULL(@fechaIngreso, fechaIngreso),
        contrasenha = ISNULL(@contrasenha, contrasenha),
        idEstado = ISNULL(@idEstado, idEstado)
    WHERE idUsuario = @idUsuario;
END
GO

GO
-- Delete (Eliminar un usuario por ID):
CREATE PROCEDURE deleteUsuario
    @idUsuario INT
AS
BEGIN
    DELETE FROM Usuario
    WHERE idUsuario = @idUsuario;
END
GO

GO
-- Tabla Porcentajes
-- Create (Insertar nuevos porcentajes):
CREATE PROCEDURE createPorcentajes
    @fdu FLOAT,
    @coordinacionGeneral FLOAT,
    @coordinacionEspecifica FLOAT,
    @iva FLOAT,
    @fechaIngreso DATE,
    @idUsuario INT
AS
BEGIN
    INSERT INTO Porcentajes (fdu, coordinacionGeneral, coordinacionEspecífica, iva, fechaIngreso, idUsuario)
    VALUES (@fdu, @coordinacionGeneral, @coordinacionEspecifica, @iva, @fechaIngreso, @idUsuario);
END
GO

GO
-- Read (Leer información de porcentajes por ID):
CREATE PROCEDURE readPorcentajes
    @idPorcentajes INT
AS
BEGIN
    SELECT idPorcentajes, fdu, coordinacionGeneral, coordinacionEspecífica, iva, fechaIngreso, idUsuario
    FROM Porcentajes
    WHERE idPorcentajes = @idPorcentajes;
END
GO

GO
-- Update (Actualizar porcentajes por ID):
CREATE PROCEDURE updatePorcentajes
    @idPorcentajes INT,
    @fdu FLOAT,
    @coordinacionGeneral FLOAT,
    @coordinacionEspecifica FLOAT,
    @iva FLOAT,
    @fechaIngreso DATE,
    @idUsuario INT
AS
BEGIN
    UPDATE Porcentajes
    SET fdu = @fdu,
        coordinacionGeneral = @coordinacionGeneral,
        coordinacionEspecífica = @coordinacionEspecifica,
        iva = @iva,
        fechaIngreso = @fechaIngreso,
        idUsuario = @idUsuario
    WHERE idPorcentajes = @idPorcentajes;
END
GO

GO
-- Delete (Eliminar porcentajes por ID):
CREATE PROCEDURE deletePorcentajes
    @idPorcentajes INT
AS
BEGIN
    DELETE FROM Porcentajes
    WHERE idPorcentajes = @idPorcentajes;
END
GO

GO
-- Tabla Cotizacion
-- Create (Insertar una nueva cotización):
CREATE PROCEDURE createCotizacion
    @nombre VARCHAR(50),
    @descripcion VARCHAR(100),
    @idCliente INT,
    @idPorcentajesC INT,
    @total FLOAT,
    @idServicio VARCHAR(20),
    @idEstado INT,
    @fechaCreacion DATE
AS
BEGIN
    INSERT INTO Cotizacion (nombre, descripcion, idCliente, idPorcentajesC, total, idServicio, idEstado, fechaCreacion)
    VALUES (@nombre, @descripcion, @idCliente, @idPorcentajesC, @total, @idServicio, @idEstado, @fechaCreacion);
END
GO

GO
-- Read (Leer información de una cotización por ID):
CREATE PROCEDURE readCotizacion
    @idCotizacion INT
AS
BEGIN
    SELECT idCotizacion, nombre, descripcion, idCliente, idPorcentajesC, total, idServicio, idEstado, fechaCreacion
    FROM Cotizacion
    WHERE idCotizacion = @idCotizacion;
END
GO

GO
-- Update (Actualizar una cotización por ID):
CREATE PROCEDURE updateCotizacion
    @idCotizacion INT,
    @nombre VARCHAR(50),
    @descripcion VARCHAR(100),
    @idCliente INT,
    @idPorcentajesC INT,
    @total FLOAT,
    @idServicio VARCHAR(20),
    @idEstado INT,
    @fechaCreacion DATE
AS
BEGIN
    UPDATE Cotizacion
    SET nombre = ISNULL(@nombre, nombre),
        descripcion = ISNULL(@descripcion, descripcion),
        idCliente = @idCliente,
        idPorcentajesC = @idPorcentajesC,
        total = ISNULL(@total, total),
        idServicio = @idServicio,
        idEstado = @idEstado,
        fechaCreacion = ISNULL(@fechaCreacion, fechaCreacion)
    WHERE idCotizacion = @idCotizacion;
END
GO

GO
-- Delete (Eliminar una cotización por ID):
CREATE PROCEDURE deleteCotizacion
    @idCotizacion INT
AS
BEGIN
    DELETE FROM Cotizacion
    WHERE idCotizacion = @idCotizacion;
END
GO

GO
-- Tabla ProyectoXFuncionario
-- Create (Insertar una nueva relación ProyectoXFuncionario):
CREATE PROCEDURE createProyectoXFuncionario
    @idProyecto INT,
    @idFuncionario INT
AS
BEGIN
    INSERT INTO ProyectoXFuncionario (idProyecto, idFuncionario)
    VALUES (@idProyecto, @idFuncionario);
END
GO

GO
-- Read (Leer información de una relación ProyectoXFuncionario por ID):
CREATE PROCEDURE readProyectoXFuncionario
    @idProyectoXFuncionario INT
AS
BEGIN
    SELECT idProyectoXFuncionario, idProyecto, idFuncionario
    FROM ProyectoXFuncionario
    WHERE idProyectoXFuncionario = @idProyectoXFuncionario;
END
GO

GO
-- Update (Actualizar una relación ProyectoXFuncionario por ID):
CREATE PROCEDURE updateProyectoXFuncionario
    @idProyectoXFuncionario INT,
    @idProyecto INT,
    @idFuncionario INT
AS
BEGIN
    UPDATE ProyectoXFuncionario
    SET idProyecto = @idProyecto,
        idFuncionario = @idFuncionario
    WHERE idProyectoXFuncionario = @idProyectoXFuncionario;
END
GO

GO
-- Delete (Eliminar una relación ProyectoXFuncionario por ID):
CREATE PROCEDURE deleteProyectoXFuncionario
    @idProyectoXFuncionario INT
AS
BEGIN
    DELETE FROM ProyectoXFuncionario
    WHERE idProyectoXFuncionario = @idProyectoXFuncionario;
END
GO