import { Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { SenhaMudancaComponent } from './pages/senha-mudanca/senha-mudanca.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { authGuard } from './core/guards/auth.guard';

const protectedRoutes:Routes = [
  { path: 'perfil', component: PerfilComponent, canActivate: [authGuard] },
  { path: 'senhaMudanca', component: SenhaMudancaComponent, canActivate: [authGuard] },
]

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  // Public routes
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },

  // Protected routes
  ...protectedRoutes,

  // 404 route
  { path: 'not-found', component: NotFoundComponent },

  // Catch-all (must be last!)
  { path: '**', redirectTo: '/not-found' },
];

