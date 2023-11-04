from Enums import *
from Perfil import *
class Funcionario:
    def __init__(self, idFuncionario, nombre, apellido, fechaNacimiento, cedula, numTelefono, correo, estado, fechaIngreso, perfiles):
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
            # Verificar si 'funcionarios' es una lista de instancias de la clase 'Funcionario'
            if isinstance(perfiles, list) and all(isinstance(item, Perfil) for item in perfiles):
                self.perfiles = perfiles
            else:
                raise TypeError("'funcionarios' no es una lista de instancias de la clase 'Funcionario'")
            
        except (ValueError, TypeError):
            raise TypeError("Tipos de atributos no válidos")

    def editar(self, nombre, apellido, fechaNacimiento, cedula, numTelefono, correo, estado, fechaIngreso, perfiles):
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
            if perfiles is not None:
                print("perfiles: ", perfiles)
                # Verificar si 'documentos' es una lista de enteros
                if isinstance(perfiles, list) and all(isinstance(item, Perfil) for item in perfiles):
                    self.perfiles = perfiles
                else:
                    raise TypeError("'perfiles' no es una lista de enteros")
            
        except (ValueError, TypeError):
            raise TypeError("Tipos de atributos no válidos")

    def toList(self):
        listaPerfiles = []
        for f in self.perfiles:
            listaPerfiles += [f.toList()]
        lista = [
            self.idFuncionario,
            self.nombre,
            self.apellido,
            self.fechaNacimiento,
            self.cedula,
            self.numTelefono,
            self.correo,
            self.estado.value,
            self.fechaIngreso,
            listaPerfiles,
        ]
        return lista

    def __str__(self):
        return f"Funcionario -> idFuncionario:{self.idFuncionario}, nombre:{self.nombre}, apellido:{self.apellido}, cedula:{self.cedula}"