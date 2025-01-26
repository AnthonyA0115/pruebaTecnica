import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false,
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() titulo!: any;
  paletteToggle = false;
  private routerSubscription!: Subscription;

  constructor(private router: Router) {}

  ngOnInit() {
    // Verifica el tema inicial al cargar el componente
    this.updatePaletteToggle();

    // Suscríbete a los eventos de navegación para actualizar el estado del tema
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updatePaletteToggle();
      }
    });
  }

  ngOnDestroy() {
    // Cancela la suscripción al Router cuando el componente se destruye
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  toggleChange(event: boolean) {
    this.paletteToggle = event;
    this.toggleDarkPalette(event);
  }

  toggleDarkPalette(shouldAdd: boolean) {
    document.documentElement.classList.toggle('ion-palette-dark', shouldAdd);
  }

  private updatePaletteToggle() {
    // Detecta si el tema oscuro está activado basándose en la clase HTML
    this.paletteToggle = document.documentElement.classList.contains('ion-palette-dark');
  }
}
