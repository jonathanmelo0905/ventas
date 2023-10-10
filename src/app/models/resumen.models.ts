export interface Resumen {
    tittle:  string;
    pasos: Pasos[];
}

export interface Pasos {
    id:            number;
    id_client:     number;
    fecha_a:       Date;
    fecha_b:       Date;
    hora_a:        string;
    hora_b:        string;
    observaciones: string;
    paso:          number;
    medio:         number;
}
