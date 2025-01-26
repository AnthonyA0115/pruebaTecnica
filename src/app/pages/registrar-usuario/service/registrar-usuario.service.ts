import { Injectable } from '@angular/core';
import { mainService } from 'src/app/services/main.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrarUsuarioService {

  constructor(private mainService:mainService) { }

  crearUsuarios(params:any){
    return this.mainService.post('Usuarios/PostUsuario',params);
  }
  
}