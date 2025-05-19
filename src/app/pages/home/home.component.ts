import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user/user.service';
import { TokenService } from '../../core/services/token/token.service';
import { CadastroService } from '../../core/services/cadastro/cadastro.service';
import { User } from '../../shared/types/user';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { timer } from 'rxjs';


@Component({
  selector: 'app-home',
  imports: [CommonModule,RouterLink ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  nome = '';


  tokenService = inject(TokenService);
  cadastroService = inject(CadastroService)
  userService = inject(UserService);
  router = inject(Router);
  cadastro!: User;
  token = '';
  user$ = this.userService.retornarUser();

  ngOnInit(): void {
    this.token = this.tokenService.retornarToken();
    this.verificarLogado();
  };

  verificarLogado(){
    let verificacao = this.tokenService.possuiToken();

    if(verificacao){

      this.cadastroService.buscarCadastro().subscribe((res) =>{
          this.cadastro = res;
          this.nome = this.cadastro.nome;
      });

      return true

    }else{
      return false
    };

  };

  deslogar(){

    Swal.fire({
                title: "Você tem certeza que quer sair?",
                icon: "warning",
                showDenyButton: true,
                confirmButtonText: "Deslogar",
                denyButtonText: `Cancelar`

              }).then((result)=>{

                if (result.isConfirmed) {

                  Swal.fire({
                    title:"Deslogado!",
                    icon:"success",
                    showConfirmButton: false
                  });

                   setTimeout(() => {
                    this.tokenService.excluirToken();
                    window.location.reload();
                  }, 1000);

                } else if (result.isDenied) {

                  Swal.fire("Você continua aqui!", "", "success");

                }
              })
  };

}
