import { inject } from "@angular/core"
import { UserService } from "../services/user/user.service"
import { Router } from "@angular/router";
import Swal from "sweetalert2";

export const authGuard = () => {
  const userService = inject(UserService);
  const router = inject(Router);

  let Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    })

  if(userService.estaLogado()){
    return true;
  }else{
    Toast.fire({
            icon: "error",
            title: "Você não está autorizado a acessar essa rota! Faça login!"
          });
    router.navigate(['/login']);
    return false;
  }
}
