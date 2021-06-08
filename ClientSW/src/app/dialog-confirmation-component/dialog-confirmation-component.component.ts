import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-confirmation-component',
  templateUrl: './dialog-confirmation-component.component.html',
  styleUrls: ['./dialog-confirmation-component.component.scss']
})
export class DialogoConfirmacionComponent implements OnInit {

  constructor(
      public dialogo: MatDialogRef<DialogoConfirmacionComponent>,
      @Inject(MAT_DIALOG_DATA) public mensaje: string) { }
  
      cerrarDialogo(): void {
        this.dialogo.close(false);
      }
      confirmado(): void {
        this.dialogo.close(true);
      }
  
    ngOnInit() {
    }
  
  }