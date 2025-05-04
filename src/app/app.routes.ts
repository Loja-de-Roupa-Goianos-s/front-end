import { Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { SenhaMudancaComponent } from './pages/senha-mudanca/senha-mudanca.component';

export const routes: Routes = [

  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component:CadastroComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'senhaMudanca', component: SenhaMudancaComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/not-found'}

];
