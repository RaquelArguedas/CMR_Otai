class Perfil:
    def __init__(self, idPerfil, nombre):
        try:
            self.idPerfil = int(idPerfil)
            self.nombre = str(nombre)
        except (ValueError, TypeError):
            raise TypeError("Tipos de atributos no válidos")

    def editar(self, nombre):
        try:
            if nombre is not None:
                self.nombre = str(nombre)
        except (ValueError, TypeError):
            raise TypeError("Tipos de atributos no válidos")

    def toList(self):
        lista = [
            self.idPerfil,
            self.nombre
        ]
        return lista

    def __str__(self):
        return f"Perfil -> idPerfil:{self.idPerfil}, nombre:{self.nombre}"