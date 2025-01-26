import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalCrearTareaComponent } from 'src/app/componentes/modales/modal-crear-tarea/modal-crear-tarea.component';
import { ModalListaTareasComponent } from 'src/app/componentes/modales/modal-lista-tareas/modal-lista-tareas.component';
import { UsuarioService } from '../service/usuario.service';
import { catchError, tap } from 'rxjs';
import { LoadingService } from 'src/app/componentes/loading/loading.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
  standalone: false,
})
export class UsuariosPage implements OnInit {
  usuarios: any[] = [];

  constructor(
    private modalController: ModalController,
    private UsuarioService: UsuarioService,
    private loading: LoadingService,
  ) {
  }

  async ngOnInit() {
    this.consultarUsuarios();
  }

  consultarUsuarios(){
    this.loading.goLoading();
    this.UsuarioService.obtenerUsuarios('').pipe(
      tap((data) => {
        this.usuarios=data;
        this.loading.endLoading();
      }),
      catchError((error) => {
        console.error('Error al obtener las tareas:', error);
        this.loading.endLoading();
        throw error; // Re-lanzar el error si quieres que se maneje más adelante
      })
    ).subscribe();
  }

  async verTareas(idUsuario: any) {
    const modal = await this.modalController.create({
      component: ModalListaTareasComponent,
      componentProps: { // Aquí se envían los datos
        idUsuario: idUsuario
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      //this.message = `Hello, ${data}!`;
    }
  }

  async crearTarea(idUsuario: any) {
    const modal = await this.modalController.create({
      component: ModalCrearTareaComponent,
      componentProps: { // Aquí se envían los datos
        idUsuario: idUsuario
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      //this.message = `Hello, ${data}!`;
    }
  }

}
