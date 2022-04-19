import { Component, OnInit } from '@angular/core';
import { GifsService } from '../../service/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent{

  constructor(private GifsService: GifsService) { }

  get historial(){
    return this.GifsService.historial;
  }
  buscar(termino: string){
    this.GifsService.buscarGfis(termino)
  }

}
