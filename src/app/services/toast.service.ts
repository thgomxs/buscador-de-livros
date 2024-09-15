import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastrService: ToastrService) {}

  public toastSuccess(message: string): void {
    this.toastrService.success(message, 'Concluido');
  }

  public toastError(message: string): void {
    this.toastrService.error(message, 'Erro');
  }
}
