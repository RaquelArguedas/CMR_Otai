from enum import Enum

class Estado(Enum):
    ELIMINADO = 1
    EN_PROGRESO = 2
    SOLICITADO = 3
    EN_PLANEACION = 4
    ACTIVO = 5
    INACTIVO = 6

class Modalidad(Enum):
    HIBRIDA = 1
    PRESENCIAL = 2
    VIRTUAL = 3

    

