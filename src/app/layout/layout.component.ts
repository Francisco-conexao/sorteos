import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
    user:any = {};
    constructor(private router: Router) { }

    ngOnInit(): void {
        this.user = JSON.parse(localStorage.getItem('GURAMI'));
    }

    verClientes(){
        this.router.navigateByUrl('clientes');
    }

    verArticulos(){
        this.router.navigateByUrl('home');
    }

    verCompras(){
        this.router.navigateByUrl('compras');
    }

    verVentas(){
        this.router.navigateByUrl('ventas');
    }

    salir(){
        localStorage.removeItem('GURAMI');
        this.router.navigateByUrl('login');
    }
}
