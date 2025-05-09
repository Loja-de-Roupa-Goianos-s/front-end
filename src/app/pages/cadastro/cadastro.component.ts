import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MAT_DATE_LOCALE, provideNativeDateAdapter} from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import { Estado } from '../../shared/types/estado';
import { EstadosService } from '../../core/services/estados/estados.service';
import { CadastroService } from '../../core/services/cadastro/cadastro.service';
import { User } from '../../shared/types/user';
import { hasFormError } from '../../shared/utils/helpers';

@Component({
  selector: 'app-cadastro',
  imports:
      [
        MatInputModule,
        MatFormFieldModule,
        CommonModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatIconModule,
        MatDatepickerModule,
        MatRadioModule,
        MatCheckboxModule,
        MatSelectModule
      ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
    provideNativeDateAdapter(),
  ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent implements OnInit {

  cadastroForm!: FormGroup;
  hide:string = 'password';
  route = inject(Router);
  hasFormError = hasFormError;

  estados: Estado[] = [];
  estadosService = inject(EstadosService);
  cadastroService = inject(CadastroService);

  ngOnInit() {
    this.createForm();
    this.getEstados();
  };

  createForm() {
    this.cadastroForm = new FormGroup({
      nome: new FormControl<string | null>(null,[Validators.required]),
      nascimento: new FormControl<Date | null>(null,[Validators.required]),
      cpf: new FormControl<string | null>(null,[Validators.required]),
      telefone: new FormControl<string | null>(null,[Validators.required]),
      email: new FormControl<string | null>(null,[Validators.required, Validators.email]),
      confirmarEmail: new FormControl<string | null>(null,[Validators.required, Validators.email]),
      senha: new FormControl<string | null>(null,[Validators.required, Validators.minLength(3)]),
      confirmarSenha: new FormControl<string | null>(null,[Validators.required]),
      genero: new FormControl<string | null>('outro'),
      cidade: new FormControl<string | null>(null,[Validators.required]),
      estado: new FormControl<string | null>(null,[Validators.required]),
      aceitarTermos: new FormControl<boolean | null>(false,[Validators.requiredTrue]),
    });
  };

  showPassword() {
    this.hide = this.hide === 'password' ? '' : 'password';
  }

  submit() {

    if(this.cadastroForm?.valid) {

      const formTratado = this.tratarForm(this.cadastroForm.value);

      this.cadastroService.setCadastro(formTratado).subscribe({
        next: (res) =>{
          const Toast = Swal.mixin({
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
          Toast.fire({
            icon: "success",
            title: "Cadastro realizado com sucesso!"
          });

          this.route.navigate(['/login']);
        },
        error: (err) => {
          Swal.fire({
            title: "Cadastro falhou!",
            text: "Tente novamente!",
            icon: "error"
          });

          this.cadastroForm.reset();
        }
      });
    };

  };

  tratarForm(formValue: User): Omit<User, 'confirmarEmail' | 'confirmarPassword'> {

    const { confirmarEmail, confirmarPassword, ...resto } = formValue;
    return resto;

  }

  getEstados(){
    this.estadosService.getEstados().subscribe({
      next: (res) => {
        this.estados = res;
      },
      error: (err) => {
        Swal.fire({
          title: "Falha ao carregar estados!",
          text: "Tente novamente!",
          icon: "error"
        });
      }
    });
  }


};
