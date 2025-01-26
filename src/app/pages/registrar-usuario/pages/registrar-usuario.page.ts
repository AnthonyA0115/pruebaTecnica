import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingService } from 'src/app/componentes/loading/loading.service';
import { catchError, tap } from 'rxjs';
import { RegistrarUsuarioService } from '../service/registrar-usuario.service';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.page.html',
  styleUrls: ['./registrar-usuario.page.scss'],
  standalone: false,
})
export class RegistrarUsuarioPage implements OnInit {
  registroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private RegistrarUsuarioService: RegistrarUsuarioService,
    private loading: LoadingService,
  ) {
    // Inicializamos el formulario
    this.registroForm = this.fb.group({
      documento: ['', [Validators.required, Validators.minLength(3)]],
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      correo: ['', [Validators.required, Validators.email,]],
    });
  }

  ngOnInit() { }

  // Método para registrar un usuario
  registrarUsuario() {
    if (this.registroForm.valid) {
      console.log('Usuario registrado:', this.registroForm.value);
      // Aquí enviarías los datos al backend
      this.loading.goLoading();
      let params = {
        'Documento': this.registroForm.value.documento,
        'Nombre': this.registroForm.value.nombre,
        'Correo': this.registroForm.value.correo
      }
      this.RegistrarUsuarioService.crearUsuarios(params).pipe(
        tap((data) => {
          this.loading.endLoading();
          this.registroForm.reset();
        }),
        catchError((error) => {
          console.error('Error al obtener las tareas:', error);
          this.loading.endLoading();
          throw error; // Re-lanzar el error si quieres que se maneje más adelante
        })
      ).subscribe();
    } else {
      console.log('Formulario inválido');
      this.registroForm.markAllAsTouched(); // Marca todos los campos para mostrar los errores
    }
  }

}
