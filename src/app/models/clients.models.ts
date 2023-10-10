export interface DataClients {
  tittle: string;
  clients: Clients[];
}

export interface Clients {
  id_client: number;
  id_resp: salesman;
  name: string;
  phone: string;
  email: string;
  id_camp: campaing;
  medio: medio;
  project: project;
  date: Date;
  time: string;
  level: number;
  remarketing: number;
  ubicacion: string;
  prioridad: number;
  interes: number;
}

export interface NewClients {
  id_resp: salesman;
  name: string;
  phone: string;
  email: string;
  id_camp: campaing;
  medio: medio;
  project: project;
  date: Date;
  time: string;
  level: number;
  remarketing: number;
  ubicacion: string;
  prioridad: number;
  interes: number;
}

export enum salesman {
  MARCELA = 1007161077,
  JHON = 1070707962,
  ANA = 40036864,
}
enum medio {
  FACEBOOK = 1,
  INSTAGRAM = 2,
  WHATSAPP = 3,
  EMAIL = 4,
}

enum project {
  MONTES = 1,
  CASA7 = 2,
}

enum campaing {
  KML_MARCELA = 1,
  COMENTARIOS = 2,
}
