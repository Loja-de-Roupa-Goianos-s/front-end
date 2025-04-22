import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {


  submit() {
    event?.preventDefault();
    Swal.fire({
      title: "Login Realizado com sucesso!",
      text: "Seja bem vindo Fulano!",
      icon: "success"
    });
  }


}
