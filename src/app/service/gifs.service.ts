import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../gifs/interface/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private _historial: string[] = [];
  private api_key: string = 'V6yRTVvnnBaEdfsstgW23o4yJ6LK6E3b';
  public resultados: Gif[] = [];
  public servive_url: string = 'http://api.giphy.com/v1/gifs';
  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  }
  get historial() {
    return [...this._historial];
  }
  buscarGfis(query: string) {
    query = query.trim().toUpperCase();
    const params = new HttpParams()
      .set('api_key',this.api_key)
      .set('q',query)
      .set('limit','10')
    this.http
      .get<SearchGifsResponse>(
        `${this.servive_url}/search`,{params}
      )
      .subscribe((resp) => {
        if (resp.pagination.count !== 0) {
          if( !this._historial.includes(query)){
            this._historial.unshift(query)
          }
          this._historial = this._historial.splice(0, 10);
          this.resultados = resp.data;
          localStorage.setItem('resultados', JSON.stringify(this.resultados));
          localStorage.setItem('historial', JSON.stringify(this._historial));
        } else {
          alert(
            'No se encontraron resultados en su búsqueda, intentelo nuevamente'
          );
        }
      });
  }
}
