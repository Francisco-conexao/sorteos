import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { api } from './config';

@Injectable({
  providedIn: 'root',
})
export class PagosService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  pagos(data) {
    return new Promise((resolve) => {
      this.http
        .post(api + 'pagos/apartarBoletos', data, { headers: this.headers })
        .subscribe((data) => {
          resolve(data);
        });
    });
  }

  listarBoletos(data) {
    return new Promise((resolve) => {
      this.http
        .post(api + 'pagos/listarBoletos', data, { headers: this.headers })
        .subscribe((data) => {
          resolve(data);
        });
    });
  }

  borrarApartados() {
    return new Promise((resolve) => {
      this.http
        .get(api + 'pagos/borrarApartados', { headers: this.headers })
        .subscribe((data) => {
          resolve(data);
        });
    });
  }
}
