import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { BoletosService } from '../services/boletos.service';
import { PagosService } from '../services/pagos.service';
import Swal from 'sweetalert2';
import { SorteosService } from '../services/sorteos.service';
import Swiper from 'swiper';

import 'swiper/swiper-bundle.css';

@Component({
  selector: 'app-sorteo',
  templateUrl: './sorteo.component.html',
  styleUrls: ['./sorteo.component.scss'],
})
export class SorteoComponent implements OnInit {
  boletos: any = [];
  boletos2: any = [];
  boletosSelect: any = [];
  boletosSelectRandom: any = [];
  buscar: string;

  @ViewChild('modalCupon') modalCupon: any;

  el = document.getElementById('anim');

  numBoletos: number = 1;
  animacion: number = 0;

  paquetes: any = [
    {
      id: 1,
      boletos: 1,
      precio: 25,
      fecha: '2022-06-17',
      estatus: 1,
      color: '',
    },
    {
      id: 2,
      boletos: 2,
      precio: 35,
      fecha: '2022-06-17',
      estatus: 0,
      color: 'rosa',
    },
    {
      id: 3,
      boletos: 3,
      precio: 45,
      fecha: '2022-06-17',
      estatus: 0,
      color: 'verde',
    },
    {
      id: 4,
      boletos: 4,
      precio: 50,
      fecha: '2022-06-17',
      estatus: 0,
      color: 'verde',
    },
  ];
  paquete: any = {};

  cliente: any = {};

  cupon: string = null;
  whastapp: string = null;

  cuponValido: any = {};

  sorteos: any = null;
  sorteoSelect: any = {};

  views = 'home';

  constructor(
    private modalService: NgbModal,
    private pagosServ: PagosService,
    private boletosServ: BoletosService,
    private spinner: NgxSpinnerService,
    private sorteosServ: SorteosService
  ) {
    this.borrarApartados();
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    const swiper = new Swiper('.swiper', {
      slidesPerView: 1.1,
      spaceBetween: 20,
    });
  }

  borrarApartados() {
    this.pagosServ.borrarApartados().then(() => {
      this.listarSorteos();
    });
  }

  listarSorteos() {
    this.spinner.show();
    this.sorteosServ.listar().then((data: any) => {
      this.spinner.hide();
      if (data.sorteos) {
        this.sorteos = data.sorteos;
        console.log(this.sorteos);
        this.sorteos.forEach((sorteo) => {
          if (sorteo.select == 1) {
            this.sorteoSelect = sorteo;
          }
        });
        console.log(this.sorteoSelect);
        this.paquetes[0].precio = parseFloat(this.sorteoSelect.precio1);
        this.paquetes[1].precio = parseFloat(this.sorteoSelect.precio2);
        this.paquetes[2].precio = parseFloat(this.sorteoSelect.precio3);
        this.paquetes[3].precio = parseFloat(this.sorteoSelect.precio4);
        console.log(this.paquetes);
        this.listarBoletos(this.sorteoSelect);
        // this.abrirModalCupon(this.modalCupon);
      }
    });
  }

  listarBoletos(sorteoSelect) {
    this.spinner.show();
    this.pagosServ.listarBoletos(sorteoSelect).then((data: any) => {
      this.spinner.hide();
      const fill = (number, len) =>
        '0'.repeat(len - number.toString().length) + number.toString();

      this.boletos = [];
      for (let i = 0; i < 5000; i++) {
        this.boletos.push({ num: fill(i, 4), vendido: 0, select: 0 });
      }

      if (data.boletos) {
        this.boletos.forEach((item1) => {
          data.boletos.forEach((item2) => {
            if (item1.num == item2.boleto) {
              item1.vendido = 1;
            }
          });
        });
      }

      this.boletos2 = this.boletos;

      if (!this.cuponValido.cupon) {
        this.paquete = this.paquetes[0];
      }
    });
  }

  getItems(ev) {
    this.boletos = this.boletos2;
    const val = ev.toString();
    if (val) {
      this.boletos = this.boletos.filter((item) => {
        return item.num.indexOf(val) > -1;
      });
    }
  }

  selecNum(boleto) {
    if (boleto.vendido == 0) {
      if (this.boletosSelect.length < this.paquete.boletos) {
        boleto.select = !boleto.select && true;
      } else {
        boleto.select = boleto.select && false;
      }
      this.boletosSelect = this.boletos.filter((boleto) => {
        if (boleto.select == true) {
          return boleto;
        }
      });
    }
  }

  abrirModal(content) {
    this.modalService.open(content, {
      backdropClass: 'light-blue',
      size: 'md',
    });
    this.boletosSelect = [];
    this.boletosSelectRandom = [];
    this.animacion = 0;
    this.borrarSelect();
  }

  abrirModalCompra(content) {
    this.modalService.open(content, {
      backdropClass: 'light-blue',
      size: 'md',
    });
  }

  abrirModalCupon(content) {
    this.modalService.open(content, {
      backdropClass: 'light-blue',
      size: 'sm',
    });
  }

  generarBoletos(boletos) {
    this.boletosSelectRandom = [];
    for (let index = 0; index < boletos; index++) {
      let random = Math.floor(Math.random() * (4999 - 0) + 0);
      if (this.boletos[random].vendido) {
        index--;
      } else {
        console.log(
          this.boletosSelectRandom.find(
            (data) => data.num == this.boletos[random].num
          )
        );
        if (
          this.boletosSelectRandom.find(
            (data) => data.num == this.boletos[random].num
          )
        ) {
          index--;
        } else {
          this.boletosSelectRandom.push(this.boletos[random]);
        }
      }
    }
    this.animacion = 1;
    setTimeout(() => {
      this.animacion = 2;
    }, 6000);
  }

  losQuiero() {
    this.boletosSelectRandom.forEach((item) => {
      this.selecNum(item);
    });
    this.boletosSelectRandom = [];
  }

  borrarSelect() {
    this.boletos.forEach((item) => {
      item.select = 0;
    });
  }

  elegirPaquete(paquete) {
    if (!this.cuponValido.cupon) {
      let boletosRes = this.boletos.filter((data) => data.vendido == 0);
      if (boletosRes.length >= paquete.boletos) {
        this.paquetes.forEach((item) => {
          item.estatus = 0;
        });
        paquete.estatus = 1;
        this.paquete = paquete;
        console.log(this.paquete);
        this.boletosSelect = [];
        this.borrarSelect();
      }
    }
  }

  async pagar(boletosCarrito, total) {
    console.log(this.boletosSelect);
    let boletos: any = [];
    boletosCarrito.forEach((item) => {
      boletos.push(item.num);
      item.vendido = 1;
    });
    await this.pagosServ
      .pagos({
        cliente: { celular: this.whastapp },
        boletos: boletos,
        total: total,
        sorteo: this.sorteoSelect,
        cantidadBoletos: boletos.length,
      })
      .then((data: any) => {
        this.boletosSelect = [];
        this.views = 'confirmacion';
      });
  }

  ValidarCupon() {
    this.spinner.show();
    this.boletosServ.validarCupon({ cupon: this.cupon }).then((data: any) => {
      this.spinner.hide();
      this.modalService.dismissAll();
      if (data.status == 200) {
        // Swal.fire({
        //   icon: 'success',
        //   title: '¡Bien!',
        //   text: 'Cupon valido por ' + data.cupon.boletos + ' boletos',
        // });
        this.paquetes.forEach((item) => {
          if (item.boletos == data.cupon.boletos) {
            console.log(item);
            this.elegirPaquete(item);
          }
        });
        this.cuponValido = data.cupon;
        this.views = 'paquete';
      } else {
        Swal.fire({
          icon: 'error',
          title: '¡Oops!',
          text: 'Cupon no valido',
        });
      }
    });
  }

  async canjearBoletos(boletosSelect, cuponValido) {
    this.spinner.show();
    await this.boletosServ
      .canjearBoletos({
        cupon: cuponValido,
        boletos: boletosSelect,
        cliente: { celular: this.whastapp },
        sorteo: this.sorteoSelect,
      })
      .then((data: any) => {
        this.spinner.hide();
        this.boletosSelect = [];
        this.cuponValido = {};
        this.modalService.dismissAll();
        this.listarBoletos(this.sorteoSelect);
      });
  }

  selecSorteo(sorteo) {
    console.log('sorteos', this.sorteos);
    this.sorteos.forEach((sorteo) => {
      sorteo.select = 0;
    });
    sorteo.select = 1;
    this.sorteoSelect = sorteo;
    this.paquetes[0].precio = this.sorteoSelect.precio1;
    this.paquetes[1].precio = this.sorteoSelect.precio2;
    this.paquetes[2].precio = this.sorteoSelect.precio3;
    this.paquetes[3].precio = this.sorteoSelect.precio4;
    this.carrito = [];
    this.listarBoletos(this.sorteoSelect);
    this.views = 'cupon';
  }

  //CARRITO DE CROMPRA ---------------------------------------
  carrito = [];
  total = 0;
  agregarCarrito() {
    let carritoSelect = {
      boletos: this.boletosSelect,
      numBoletos: this.paquete.boletos,
      precio: this.paquete.precio,
    };
    this.carrito.push(carritoSelect);
    if (!carritoSelect.precio.cupon) {
      this.total += parseFloat(carritoSelect.precio);
    }
    this.boletosSelect.forEach((item) => {
      item.vendido = 1;
    });
    this.boletosSelect = [];
    this.borrarSelect();
    console.log(this.carrito);
  }

  abrirModalCarrito(content) {
    this.modalService.open(content, {
      backdropClass: 'light-blue',
      size: 'sm',
    });
  }

  eliminarCarrito(index, carrito) {
    if (!carrito.cupon.cupon) {
      this.total -= parseFloat(this.carrito[index].precio);
    }
    this.carrito.splice(index, 1);
    console.log(carrito);
    carrito.boletos.forEach((item) => {
      item.vendido = 0;
    });
  }

  agregarCarritoCupon() {
    let carritoSelect = {
      boletos: this.boletosSelect,
      numBoletos: this.paquete.boletos,
      precio: this.paquete.precio,
      cupon: this.cuponValido,
    };
    this.carrito.push(carritoSelect);
    if (!carritoSelect.cupon.cupon) {
      this.total += parseFloat(carritoSelect.precio);
    }
    this.boletosSelect.forEach((item) => {
      item.vendido = 1;
    });
    this.boletosSelect = [];
    this.borrarSelect();
    this.cuponValido = {};
    console.log(this.carrito);
    this.views = 'carrito';
  }

  async pagarCarrito() {
    let boletosCupon = [];
    let cuponValido = {};
    let boletosPago = [];
    let total: number = 0;
    console.log(this.carrito);
    this.carrito.forEach((item) => {
      if (item.cupon.cupon) {
        cuponValido = item.cupon;
        boletosCupon = item.boletos;
      } else {
        total += parseFloat(item.precio);
        item.boletos.forEach((boleto) => {
          boletosPago.push(boleto);
        });
      }
    });
    console.log(boletosCupon);
    console.log(cuponValido);
    if (boletosCupon.length >= 1) {
      await this.canjearBoletos(boletosCupon, cuponValido);
    }
    if (boletosPago.length >= 1) {
      await this.pagar(boletosPago, total);
    }
    this.modalService.dismissAll();
    this.carrito = [];
  }
}
