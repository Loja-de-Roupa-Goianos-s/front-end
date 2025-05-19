import { Component, inject, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BannerComponent } from "../../shared/components/banner/banner.component";
import {MatButtonModule} from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { AutenticacaoService } from '../../core/services/autenticacao/autenticacao.service';
import { UserService } from '../../core/services/user/user.service';

@Component({
  selector: 'app-login',
  imports: [MatInputModule, MatFormFieldModule, CommonModule, ReactiveFormsModule, BannerComponent, MatButtonModule,RouterLink,MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  route = inject(Router);
  authservice = inject(AutenticacaoService);
  userService = inject(UserService);
  hide:string = 'password';
  Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

  ngOnInit() {
    this.createForm();
  };

  showPassword() {
    this.hide = this.hide === 'password' ? '' : 'password';
  }

  createForm() {
    this.loginForm = new FormGroup({
      email: new FormControl<string | null>(null, [Validators.required, Validators.email]),
      senha: new FormControl<string | null>(null, [Validators.required, Validators.minLength(3)])
    });
  };

  submit() {

    if(this.loginForm.valid) {

      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('senha')?.value;

      this.authservice.autenticar(email, password).subscribe({
        next: (res) => {
          console.log('Login response:', res);

          this.Toast.fire({
            icon: "success",
            title: "Login realizado com sucesso!"
          });

          this.route.navigateByUrl('/home');
          this.loginForm.reset();
        },
        error: (err) => {

          Swal.fire({
            title: "Login falhou!",
            text: "Tente novamente!",
            icon: "error"
          });

        }

      });
    };
  };


};
