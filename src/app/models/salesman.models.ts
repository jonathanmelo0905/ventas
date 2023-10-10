export interface Salesman {
    tittle:  string;
    clients: InfoSalesman[];
}

export interface InfoSalesman {
    id:       number;
    name:     string;
    user:     string;
    password: string;
    url:      string;
    cedula:   string;
    phone:    string;
    estado:   boolean;
}
