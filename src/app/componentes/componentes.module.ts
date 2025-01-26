import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { ModalListaTareasComponent } from './modales/modal-lista-tareas/modal-lista-tareas.component';
import { ModalCrearTareaComponent } from './modales/modal-crear-tarea/modal-crear-tarea.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HeaderComponent,
    ModalListaTareasComponent,
    ModalCrearTareaComponent
  ],
  exports: [
    HeaderComponent,
    ModalListaTareasComponent,
    ModalCrearTareaComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule
  ]
})
export class ComponentesModule { }
