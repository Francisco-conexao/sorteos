import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { api } from "./config";

@Injectable({
    providedIn: 'root'
})
export class BoletosService {

    headers = new HttpHeaders({
        'Content-Type': 'application/json',
    })

    constructor(private http: HttpClient) {
    }

    listarPedido() {
        return new Promise(
            resolve => {
                this.http.get(api + 'boletos/listarPedido', { headers: this.headers })
                    .subscribe(
                        data => {
                            resolve(data);
                        }
                    )
            }
        )
    }

    listarBoletos(data) {
        return new Promise(
            resolve => {
                this.http.post(api + 'boletos/listarBoletos', data, { headers: this.headers })
                    .subscribe(
                        data => {
                            resolve(data);
                        }
                    )
            }
        )
    }

    listarCupones() {
        return new Promise(
            resolve => {
                this.http.get(api + 'boletos/listarCupones', { headers: this.headers })
                    .subscribe(
                        data => {
                            resolve(data);
                        }
                    )
            }
        )
    }

    crearCupon(data) {
        return new Promise(
            resolve => {
                this.http.post(api + 'boletos/crearCupon', data, { headers: this.headers })
                    .subscribe(
                        data => {
                            resolve(data);
                        }
                    )
            }
        )
    }

    eliminarCupon(data) {
        return new Promise(
            resolve => {
                this.http.post(api + 'boletos/eliminarCupon', data, { headers: this.headers })
                    .subscribe(
                        data => {
                            resolve(data);
                        }
                    )
            }
        )
    }

    validarCupon(data) {
        return new Promise(
            resolve => {
                this.http.post(api + 'boletos/validarCupon', data, { headers: this.headers })
                    .subscribe(
                        data => {
                            resolve(data);
                        }
                    )
            }
        )
    }

    canjearBoletos(data) {
        return new Promise(
            resolve => {
                this.http.post(api + 'boletos/canjearBoletos', data, { headers: this.headers })
                .subscribe(
                    data => {
                        resolve(data);
                    }
                )
            }
        )
    }



}
