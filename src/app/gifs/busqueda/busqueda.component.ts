import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../../service/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {
  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>
  constructor(private GifsService: GifsService) { }

  buscar(){
    const valor = this.txtBuscar.nativeElement.value;
    if(valor.trim().length === 0){return ;}
    this.GifsService.buscarGfis(valor);
    this.txtBuscar.nativeElement.value = '';
  }
}
