class Porcentaje:
    def __init__(self, idPorcentaje, fdu, coordinacionGeneral, coordinacionEspecifica, iva, fechaIngreso, idUsuario):
        try:
            self.idPorcentaje = int(idPorcentaje)
            self.fdu = float(fdu)
            self.coordinacionGeneral = float(coordinacionGeneral)
            self.coordinacionEspecifica = float(coordinacionEspecifica)
            self.iva = float(iva)
            self.fechaIngreso = str(fechaIngreso)
            self.idUsuario = int(idUsuario)
        except (ValueError, TypeError):
            raise TypeError("Tipos de atributos no válidos")

    def editar(self, fdu, coordinacionGeneral, coordinacionEspecifica, iva, fechaIngreso, idUsuario):
        try:
            if fdu is not None:
                self.fdu = float(fdu)
            if coordinacionGeneral is not None:
                self.coordinacionGeneral = float(coordinacionGeneral)
            if coordinacionEspecifica is not None:
                self.coordinacionEspecifica = float(coordinacionEspecifica)
            if iva is not None:
                self.iva = float(iva)
            if fechaIngreso is not None:
                self.fechaIngreso = str(fechaIngreso)
            if idUsuario is not None:
                self.idUsuario = int(idUsuario)
        except (ValueError, TypeError):
            raise TypeError("Tipos de atributos no válidos")

    def toList(self):
        list = [
            self.idPorcentaje,
            self.fdu,
            self.coordinacionGeneral,
            self.coordinacionEspecifica,
            self.iva,
            self.fechaIngreso,
            self.idUsuario
        ]
        return list