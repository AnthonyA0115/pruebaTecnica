import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'usuarios',
        loadChildren: () => import('../pages/usuarios/usuarios.module').then( m => m.UsuariosPageModule)
      },
      {
        path: 'registrar-usuario',
        loadChildren: () => import('../pages/registrar-usuario/registrar-usuario.module').then( m => m.RegistrarUsuarioPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/usuarios',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/usuarios',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
