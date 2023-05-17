import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { api } from "./config";



@Injectable({
    providedIn: 'root'
})
export class LoginService {

   
    headers =  new HttpHeaders({
        'Content-Type':  'application/json',
    })

    constructor(private http:HttpClient) {
    }

    login(data){
        return new Promise(
            resolve=>{
                this.http.post<any>(api+'login/login', data, {headers: this.headers})
                .subscribe(
                    data =>{
                        resolve(data);
                    }
                )
            }
        )
    }

    
}
