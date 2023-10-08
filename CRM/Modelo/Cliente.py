from Enums import *

class Cliente:
    def __init__(self, idCliente, cedJuridica, nombre, numTelefono, correo, fechaIngreso, estado):
        try:
            self.idCliente = int(idCliente)
            self.cedJuridica = int(cedJuridica)
            self.nombre = str(nombre)
            self.numTelefono = int(numTelefono)
            self.correo = str(correo)
            self.fechaIngreso = str(fechaIngreso)
            self.estado = Estado(estado)
        except (ValueError, TypeError):
            raise TypeError("Tipos de atributos no válidos")

    def editar(self, cedJuridica, nombre, numTelefono, correo, estado):
        try:
            if cedJuridica is not None:
                self.cedJuridica = int(cedJuridica)
            if nombre is not None:
                self.nombre = str(nombre)
            if numTelefono is not None:
                self.numTelefono = int(numTelefono)
            if correo is not None:
                self.correo = str(correo)
            if estado is not None:
                self.estado = Estado(estado)
        except (ValueError, TypeError):
            raise TypeError("Tipos de atributos no válidos")

    def toList(self):
        lista = [
            self.idCliente,
            self.cedJuridica,
            self.nombre,
            self.numTelefono,
            self.correo,
            self.fechaIngreso,
            self.estado
        ]
        return lista

