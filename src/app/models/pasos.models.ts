export interface Pasos {
    result: Result[];
}

export interface Result {
    id:      number;
    name:    string;
    estatus: number;
    name_a:  string;
    name_b:  string;
}

export interface InfoPaso {
    id_client: number;
    fecha_a: Date;
    fecha_b: Date;
    hora_a: Date;
    hora_b: Date;
    observaciones: string;
    paso: number;
    medio: number;
  }