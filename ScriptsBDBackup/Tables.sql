-- Tabla Perfil
CREATE TABLE Perfil (
    idPerfil INT IDENTITY(1,1) PRIMARY KEY,
    nombre VARCHAR(50)
);

-- Tabla Estado
CREATE TABLE Estado (
    idEstado INT IDENTITY(1,1) PRIMARY KEY,
    nombre VARCHAR(50)
);

-- Tabla Funcionario
CREATE TABLE Funcionario (
    idFuncionario INT IDENTITY(1,1) PRIMARY KEY,
    nombre VARCHAR(50),
    apellido VARCHAR(50),
    fechaNacimiento DATE,
    cedula INT,
    numTelefonno INT,
    correo VARCHAR(50),
    idEstado INT,
    fechaIngreso DATE,
    FOREIGN KEY (idEstado) REFERENCES Estado(idEstado)
);

-- Tabla Modalidad
CREATE TABLE Modalidad (
    idModalidad INT IDENTITY(1,1) PRIMARY KEY,
    nombre VARCHAR(50),
    descripcion VARCHAR(100)
);

-- Tabla TipoCapacitacion
CREATE TABLE TipoCapacitacion (
    idTipo INT IDENTITY(1,1) PRIMARY KEY,
    nombre VARCHAR(50)
);

-- Tabla TipoEvaluacion
CREATE TABLE TipoEvaluacion (
    idTipo INT IDENTITY(1,1) PRIMARY KEY,
    nombre VARCHAR(50),
    precio FLOAT
);

-- Tabla Cliente
CREATE TABLE Cliente (
    idCliente INT IDENTITY(1,1) PRIMARY KEY,
    cedJuridica INT,
    nombre VARCHAR(50),
    numTelefono INT,
    correo VARCHAR(100),
    fechaIngreso DATE,
    idEstado INT,
    FOREIGN KEY (idEstado) REFERENCES Estado(idEstado)
);

-- Tabla Proyecto
CREATE TABLE Proyecto (
    id INT IDENTITY(1,1) PRIMARY KEY,
	idProyecto VARCHAR(20) UNIQUE,
    nombre VARCHAR(50),
    descripcion VARCHAR(100),
    idCliente INT,
    documento VARBINARY(MAX),
    fechaInicio DATE,
    fechaFinalizacion DATE,
    subTotal FLOAT,
    idEstado INT,
    FOREIGN KEY (idCliente) REFERENCES Cliente(idCliente),
    FOREIGN KEY (idEstado) REFERENCES Estado(idEstado)
);

CREATE TABLE PerfilXFuncionario ( 
	PerfilXFuncionario INT IDENTITY(1,1) PRIMARY KEY,
    idPerfil INT,
    idFuncionario INT, 
	FOREIGN KEY (idPerfil) REFERENCES Perfil(idPerfil),
    FOREIGN KEY (idFuncionario) REFERENCES Funcionario(idFuncionario)
);

-- Tabla Evaluacion
CREATE TABLE Evaluacion (
    id INT IDENTITY(1,1) PRIMARY KEY,
    idEvaluacion VARCHAR(20) UNIQUE,
    nombre VARCHAR(50),
    descripcion VARCHAR(50),
    fechaCreacion DATE,
    idTipo INT,
    fechaEjecucion DATE,
    documento VARBINARY(MAX),
    idEstado INT,
    precio MONEY,
    idProyecto INT,
    idCliente INT,
    FOREIGN KEY (idTipo) REFERENCES TipoEvaluacion(idTipo),
    FOREIGN KEY (idEstado) REFERENCES Estado(idEstado),
    FOREIGN KEY (idProyecto) REFERENCES Proyecto(id),
    FOREIGN KEY (idCliente) REFERENCES Cliente(idCliente)
);

-- Tabla Capacitacion
CREATE TABLE Capacitacion (
    id INT IDENTITY(1,1) PRIMARY KEY,
    idCapacitacion VARCHAR(20) UNIQUE,
    nombre VARCHAR(50),
    descripcion VARCHAR(50),
    fechaCreacion DATE,
    fechaEjecucion DATE,
    documento VARBINARY(MAX),
    idEstado INT,
    horasDuracion INT,
    fechaFinalizacion DATE,
    idModalidad INT,
    idFuncionario INT,
    precio MONEY,
    idTipo INT,
    idProyecto INT,
    idCliente INT,
    FOREIGN KEY (idEstado) REFERENCES Estado(idEstado),
    FOREIGN KEY (idModalidad) REFERENCES Modalidad(idModalidad),
    FOREIGN KEY (idFuncionario) REFERENCES Funcionario(idFuncionario),
    FOREIGN KEY (idTipo) REFERENCES TipoCapacitacion(idTipo),
    FOREIGN KEY (idProyecto) REFERENCES Proyecto(id),
    FOREIGN KEY (idCliente) REFERENCES Cliente(idCliente)
);

-- Tabla Usuario
CREATE TABLE Usuario (
    idUsuario INT IDENTITY(1,1) PRIMARY KEY,
    nombre VARCHAR(50),
    apellido VARCHAR(50),
    fechaNacimiento DATE,
    cedula INT,
    numTelefono INT,
    correo VARCHAR(100),
    fechaIngreso DATE,
    contrasenha VARCHAR(20),
    idEstado INT,
    FOREIGN KEY (idEstado) REFERENCES Estado(idEstado)
);

-- Tabla Porcentajes
CREATE TABLE Porcentajes (
    idPorcentajes INT IDENTITY(1,1) PRIMARY KEY,
    fdu FLOAT,
    coordinacionGeneral FLOAT,
    coordinacionEspecifica FLOAT,
    iva FLOAT,
    fechaIngreso DATE,
    idUsuario INT,
    FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario)
);

-- Tabla Cotizacion
CREATE TABLE Cotizacion (
    idCotizacion INT IDENTITY(1,1) PRIMARY KEY,
    nombre VARCHAR(50),
    descripcion VARCHAR(100),
    idCliente INT,
    idPorcentajesC INT,
    total FLOAT,
    idServicio VARCHAR(50),
    idEstado INT,
    fechaCreacion DATE,
    FOREIGN KEY (idCliente) REFERENCES Cliente(idCliente),
    FOREIGN KEY (idPorcentajesC) REFERENCES Porcentajes(idPorcentajes),
    FOREIGN KEY (idEstado) REFERENCES Estado(idEstado)
);

-- Tabla ProyectoXFuncionario
CREATE TABLE ProyectoXFuncionario (
    idProyectoXFuncionario INT IDENTITY(1,1) PRIMARY KEY,
    idProyecto INT,
    idFuncionario INT,
    FOREIGN KEY (idProyecto) REFERENCES Proyecto(id),
    FOREIGN KEY (idFuncionario) REFERENCES Funcionario(idFuncionario)
);

