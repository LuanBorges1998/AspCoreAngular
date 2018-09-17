import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable'
import { ICliente } from '../Models/cliente.interface';

@Injectable()
export class ClienteService {

    constructor(private http: Http) {

    }

    //get
    getClientes() {
        return this.http.get("/api/clientes").map(data => <ICliente[]>data.json());
    }

    //post - incluir dados
    addCliente(cliente: ICliente) {
        return this.http.post("/api/clientes", cliente);
    }

    //put - alterar dados
    editCliente(cliente: ICliente) {
        return this.http.put(`/api/clientes/${cliente.id}`, cliente);
    }

    //delete
    deleteCliente(clienteId: number ){
        return this.http.delete(`/api/clientes/${clienteId}`);
    }
}

