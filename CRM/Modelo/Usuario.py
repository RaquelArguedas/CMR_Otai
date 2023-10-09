from Enums import *

class Usuario:
    def __init__(self, idUsuario, nombre, apellido, fechaNacimiento, cedula, numTelefono, correo, fechaIngreso, contrasenha, estado):
        try:
            self.idUsuario = int(idUsuario)
            self.nombre = str(nombre)
            self.apellido = str(apellido)
            self.fechaNacimiento = str(fechaNacimiento)
            self.cedula = int(cedula)
            self.numTelefono = int(numTelefono)
            self.correo = str(correo)
            self.fechaIngreso = str(fechaIngreso)
            self.contrasenha = str(contrasenha)
            self.estado = Estado(estado)
        except (ValueError, TypeError):
            raise TypeError("Tipos de atributos no válidos")

    def editar(self, nombre, apellido, fechaNacimiento, cedula, numTelefono, correo, fechaIngreso, contrasenha, estado):
        try:
            if nombre is not None:
                self.nombre = str(nombre)
            if apellido is not None:
                self.apellido = str(apellido)
            if fechaNacimiento is not None:
                self.fechaNacimiento = str(fechaNacimiento)
            if cedula is not None:
                self.cedula = int(cedula)
            if numTelefono is not None:
                self.numTelefono = int(numTelefono)
            if correo is not None:
                self.correo = str(correo)
            if fechaIngreso is not None:
                self.fechaIngreso = str(fechaIngreso)
            if contrasenha is not None:
                self.contrasenha = str(contrasenha)
            if estado is not None:
                self.estado = Estado(estado)
        except (ValueError, TypeError):
            raise TypeError("Tipos de atributos no válidos")

    def toList(self):
        lista = [
            self.idUsuario,
            self.nombre,
            self.apellido,
            self.fechaNacimiento,
            self.cedula,
            self.numTelefono,
            self.correo,
            self.fechaIngreso,
            self.contrasenha,
            self.estado.value  # Para obtener el valor numérico de la enumeración
        ]
        return lista

