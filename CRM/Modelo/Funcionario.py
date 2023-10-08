from Enums import *

class Funcionario:
    def __init__(self, idFuncionario, nombre, apellido, fechaNacimiento, cedula, numTelefono, correo, estado, fechaIngreso, perfil):
        try:
            self.idFuncionario = int(idFuncionario)
            self.nombre = str(nombre)
            self.apellido = str(apellido)
            self.fechaNacimiento = str(fechaNacimiento)
            self.cedula = int(cedula)
            self.numTelefono = int(numTelefono)
            self.correo = str(correo)
            self.estado = Estado(estado)
            self.fechaIngreso = str(fechaIngreso)
            self.perfil = int(perfil)
            
        except (ValueError, TypeError):
            raise TypeError("Tipos de atributos no válidos")

    def editar(self, nombre, apellido, fechaNacimiento, cedula, numTelefono, correo, estado, fechaIngreso, perfil):
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
            if estado is not None:
                self.estado = Estado(estado)
            if fechaIngreso is not None:
                self.fechaIngreso = str(fechaIngreso)
            if perfil is not None:
                self.perfil = int(perfil)
            
        except (ValueError, TypeError):
            raise TypeError("Tipos de atributos no válidos")

    def toList(self):
        lista = [
            self.idFuncionario,
            self.nombre,
            self.apellido,
            self.fechaNacimiento,
            self.cedula,
            self.numTelefono,
            self.correo,
            self.estado,
            self.fechaIngreso,
            self.perfil,
        ]
        return lista
