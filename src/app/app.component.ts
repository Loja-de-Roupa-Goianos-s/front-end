import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from "./shared/components/header/header.component";
import { FooterComponent } from "./shared/components/footer/footer.component";
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    FooterComponent,
    RouterOutlet,
    CommonModule
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  router = inject(Router);

  hideHeaderFooter = false;
  private excludedRoutes = ['/login', '/not-found', '/404'];

  ngOnInit() {
    // Inscreva-se nos eventos de mudança de rota
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Verifica se a URL atual está na lista de rotas excluídas
      this.hideHeaderFooter = this.excludedRoutes.some(route =>
        event.urlAfterRedirects === route ||
        event.urlAfterRedirects.startsWith(route + '/')
      );
    });
  }

}
