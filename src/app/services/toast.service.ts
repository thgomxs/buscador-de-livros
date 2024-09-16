import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private _toastrService: ToastrService) {}

  public toastSuccess(message: string): void {
    this._toastrService.success(message, 'Concluido');
  }

  public toastError(message: string): void {
    this._toastrService.error(message, 'Erro');
  }
}
