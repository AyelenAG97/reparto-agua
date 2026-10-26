import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Cliente } from '../models/cliente'
import { Observable } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class ClientesService {

    private url = 'https://6ada5f057512f497b3ffdf2e.mockapi.io/clientes'

    constructor(private http: HttpClient) {}

    getAll(): Observable<any> {
        return this.http.get(this.url)
    }

    add(cliente: Cliente): Observable<any> {
        return this.http.post(this.url, cliente)
    }

    update(cliente: Cliente): Observable<any> {
        return this.http.put(this.url + '/' + cliente.id, cliente)
    }

    delete(id: string): Observable<any> {
        return this.http.delete(this.url + '/' + id)
    }
}
