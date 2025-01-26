import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsuariosPageRoutingModule } from './usuarios-routing.module';

import { UsuariosPage } from './pages/usuarios.page';
import { ComponentesModule } from 'src/app/componentes/componentes.module';
import { IonLoading  } from '@ionic/angular/standalone';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsuariosPageRoutingModule,
    ComponentesModule,
    IonLoading
  ],
  declarations: [UsuariosPage]
})
export class UsuariosPageModule {}
