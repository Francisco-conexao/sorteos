import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { api } from "./config";

@Injectable({
    providedIn: 'root'
})
export class SorteosService {

    headers = new HttpHeaders({
        'Content-Type': 'application/json',
    })

    constructor(private http: HttpClient) {
    }

    listar() {
        return new Promise(
            resolve => {
                this.http.get(api + 'sorteos/listar', { headers: this.headers })
                    .subscribe(
                        data => {
                            resolve(data);
                        }
                    )
            }
        )
    }

    crear(data) {
        return new Promise(
            resolve => {
                this.http.post(api + 'sorteos/crear', data, { headers: this.headers })
                    .subscribe(
                        data => {
                            resolve(data);
                        }
                    )
            }
        )
    }

    eliminar(data) {
        return new Promise(
            resolve => {
                this.http.post(api + 'sorteos/eliminar', data, { headers: this.headers })
                    .subscribe(
                        data => {
                            resolve(data);
                        }
                    )
            }
        )
    }
}
