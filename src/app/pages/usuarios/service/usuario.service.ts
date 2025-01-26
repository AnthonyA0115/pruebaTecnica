import { Injectable } from '@angular/core';
import { mainService } from 'src/app/services/main.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private mainService:mainService) { }

  obtenerUsuarios(params:any){
    return this.mainService.get('Usuarios/GetUsuarios',params);
  }

  
  eliminarUsuario(params:any){
    return this.mainService.post('Usuarios/eliminarUsuario',params);
  }

  obtenerTareasUsuario(params:any){
    return this.mainService.get('Tareas/GetTareasPorUsuario',params);
  }

  crearTareaUsuario(params:any){
    return this.mainService.post('Tareas/PostTarea',params);
  }

  actualizarTareaUsuario(params:any){
    return this.mainService.put('Tareas/PutTarea',params);
  }

  eliminarTareaUsuario(params:any){
    return this.mainService.put('Tareas/PutTarea',params);
  }

}