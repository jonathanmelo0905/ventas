export interface Resumen {
    tittle:  string;
    pasos: Pasos[];
}

export interface Pasos {
    id:            number;
    id_client:     number;
    fecha:       Date;
    fecha_b:       Date;
    hora:        string;
    hora_b:        string;
    observaciones: string;
    paso:          number;
    medio:         number;
}
