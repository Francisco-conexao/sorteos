import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";

import { ArticulosService } from "../services/articulos.service";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    
    filter:any;
    articulo:any = {'promocion':0,'contado':0,'porcentaje3':0, 'porcentaje6':0, 'porcentaje9':0, 'porcentaje12':0};
    articuloEdit:any = {};
    articulos:any = [];
    articulos2:any = [];
    articuloSelect:any = [];

    grupo:string = '0';
    grupos:any = [];
    grupos2:any = [];

    estado:string = 'E';
    buscar:string;
    ordenar:string = null;

    constructor(private modalService: NgbModal, private router: Router, private spinner: NgxSpinnerService, private sanitizer : DomSanitizer,
        //SERVICES-----------------------------
        private articulosServ: ArticulosService
        ) {
            this.articuloSelect = [];
    }

    ngOnInit(): void {
        this.listarArticulos();
    }

    listarArticulos(){
        this.spinner.show();
        this.articulosServ.listar({}).then((data:any)=>{
            this.spinner.hide();
            if(data.articulos != null){
                this.articulos = data.articulos;
                this.articulos2 = data.articulos;
            }else{
                this.articulos = [];
                this.articulos2 = [];
            }
            
            this.buscar = null;
        })
    }

    getItems(ev: any) {
        console.log(ev);
        this.articulos = this.articulos2;
        const val = ev
        if (val && val.trim() != '') {
            console.log(val)
            this.articulos = this.articulos.filter((item) => {
                return (item.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
        }
    }


    //Subir archivo-------------------------------------------------------------------------------------
    modalAchivo(content) {
        this.modalService.open(content, { backdropClass: 'light-blue', size: 'sm' });
    }

    archivo: any = null;
    src:any = null;
    subiendo(event) {
        var files = event.target.files;
        var file = files[0];

        if (files && file) {
            var reader = new FileReader();
            reader.onload = this._handleReaderLoaded.bind(this);
            reader.readAsBinaryString(file);
        }
    }

    _handleReaderLoaded(readerEvent) {
        var binaryString = readerEvent.target.result;
        this.archivo = btoa(binaryString);
        //this.src = this.sanitizer.bypassSecurityTrustResourceUrl('data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' + this.archivo + '#toolbar=1&navpanes=1');
    }

    upload() {
        Swal.fire({
            title: '¿Estas seguro que quieres actulizar los productos?',
            text: "¡No podras recuperar los cambios!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si',
            cancelButtonText: 'No'
        }).then((result) => {
            console.log(result)
            if (result.value) {
                this.spinner.show();
                this.articulosServ.crear({'archivo':this.archivo}).then((data:any)=>{
                    this.spinner.hide();
                    this.archivo = null;
                    this.src = null;
                    Swal.fire({
                        icon: 'success',
                        title: 'Bien',
                        text: 'El archivo se cargo con exito, se actualizaron '+data.cantidad+' productos',
                    })
                    this.modalService.dismissAll();
                })
            }
        })
        
    }
}
