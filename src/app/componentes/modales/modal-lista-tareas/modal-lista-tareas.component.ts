import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonActionSheet, IonButton } from '@ionic/angular/standalone';
import { ActionSheetController } from '@ionic/angular';
import type { OverlayEventDetail } from '@ionic/core';
import { LoadingService } from '../../loading/loading.service';
import { UsuarioService } from 'src/app/pages/usuarios/service/usuario.service';
import { catchError, tap } from 'rxjs';


@Component({
  selector: 'app-modal-lista-tareas',
  templateUrl: './modal-lista-tareas.component.html',
  styleUrls: ['./modal-lista-tareas.component.scss'],
  standalone: false,
})
export class ModalListaTareasComponent implements OnInit {
  @Input() idUsuario: any;
  tareas: any[] = [];

  constructor(
    private modalCtrl: ModalController,
    private sheet: ActionSheetController,
    private UsuarioService: UsuarioService,
    private loading: LoadingService,
  ) { }

  async ngOnInit() {
    this.obtenerTareasUsuario();
  }

  obtenerTareasUsuario() {
    this.loading.goLoading();
    this.UsuarioService.obtenerTareasUsuario(this.idUsuario).pipe(
      tap((data) => {
        this.tareas = data;
        this.loading.endLoading();
      }),
      catchError((error) => {
        console.error('Error al obtener las tareas:', error);
        this.loading.endLoading();
        throw error; // Re-lanzar el error si quieres que se maneje más adelante
      })
    ).subscribe();
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async CambiarEstado(idTarea: any) {
    const actionSheet = await this.sheet.create({
      header: 'Por favor seleccione el estado de la tarea',
      buttons: [
        {
          text: 'Pendiente',
          handler: () => {
            this.cambiarEstadoTarea('Pendiente', idTarea);
          },
        },
        {
          text: 'Completada',
          handler: () => {
            this.cambiarEstadoTarea('Completada', idTarea);
          },
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Acción cancelada');
          },
        },
      ],
    });

    await actionSheet.present();
  }

  cambiarEstadoTarea(estado: any, idTarea: any) {
    let params = {
      'Id': idTarea,
      'Estado': estado
    }
    this.UsuarioService.actualizarTareaUsuario(params).pipe(
      tap((data) => {
        console.log(data);
        this.obtenerTareasUsuario();
      }),
      catchError((error) => {
        console.error('Error al obtener las tareas:', error);
        throw error; // Re-lanzar el error si quieres que se maneje más adelante
      })
    ).subscribe();
  }


  async eliminarTarea(idTarea: any) {
    const actionSheet = await this.sheet.create({
      header: '¿Desea eliminar la tarea?',
      buttons: [
        {
          text: 'Sí',
          role: 'destructive',
          handler: () => {
            const fecha = new Date(); // Obtiene la fecha y hora actual
            let params = {
              'Id': idTarea,
              'FechaEliminacion': fecha.toISOString()
            }
            this.UsuarioService.actualizarTareaUsuario(params).pipe(
              tap((data) => {
                console.log(data);
                this.obtenerTareasUsuario();
              }),
              catchError((error) => {
                console.error('Error al obtener las tareas:', error);
                throw error; // Re-lanzar el error si quieres que se maneje más adelante
              })
            ).subscribe();
          },
        },
        {
          text: 'No',
          handler: () => {
            console.log('No se eliminó la tarea');
          },
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Acción cancelada');
          },
        },
      ],
    });

    await actionSheet.present();
  }

}
