import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { UsuarioService } from 'src/app/pages/usuarios/service/usuario.service';
import { LoadingService } from '../../loading/loading.service';
import { catchError, tap } from 'rxjs';

@Component({
  selector: 'app-modal-crear-tarea',
  templateUrl: './modal-crear-tarea.component.html',
  styleUrls: ['./modal-crear-tarea.component.scss'],
  standalone: false,

})
export class ModalCrearTareaComponent  implements OnInit {
  crearTareaForm: FormGroup;
  @Input() idUsuario: any;

  constructor(
    private fb: FormBuilder,
    private modalCtrl: ModalController,
    private UsuarioService: UsuarioService,
    private loading: LoadingService,
  ) {
    // Inicializamos el formulario
    this.crearTareaForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(5)]],
      descripcion: ['', Validators.required],
      fechaLimite: ['', Validators.required]
    });
  }

  ngOnInit() {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  crearTarea(){
    if (this.crearTareaForm.valid) {
      this.loading.goLoading();
      let params = {
        'UsuarioId': this.idUsuario,
        'Titulo': this.crearTareaForm.value.titulo,
        'Descripcion': this.crearTareaForm.value.descripcion,
        'Estado': 'Creada',
        'FechaLimite': this.crearTareaForm.value.fechaLimite
      }
      this.UsuarioService.crearTareaUsuario(params).pipe(
        tap((data) => {
          this.loading.endLoading();
          this.crearTareaForm.reset();
        }),
        catchError((error) => {
          console.error('Error al obtener las tareas:', error);
          this.loading.endLoading();
          throw error; // Re-lanzar el error si quieres que se maneje más adelante
        })
      ).subscribe();
      // Aquí enviarías los datos al backend
    } else {
      console.log('Formulario inválido');
      this.crearTareaForm.markAllAsTouched(); // Marca todos los campos para mostrar los errores
    }
  }
}
