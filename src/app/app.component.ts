import { Component, inject, model, OnInit } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { ClipboardModule } from 'ngx-clipboard';
import {
  MatDialog,
  MatDialogContent,
} from '@angular/material/dialog';


@Component({
  selector: 'app-root',
  imports: [MatFormFieldModule, FormsModule, MatInputModule, MatButtonModule, ClipboardModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'teste-mp';
  dialog = inject(MatDialog);

  nomes = model<string>('');
  mensagem = model<string>('');
  resultado = model<string>('');

  ngOnInit(): void {
    this.nomes.subscribe((nomesStr: string) => {
      this.atualizarResultado();
    });
    
    this.mensagem.subscribe((mensagemStr: string) => {
      this.atualizarResultado();
    })
  }

  atualizarResultado() {
    this.resultado.set('');
    let resultadoStr = '';
    const nomesArr = this.nomes().split('\n');
    nomesArr.forEach((nome: string) => {
      resultadoStr += this.mensagem().replace('NOME', nome);
      resultadoStr += '\n\n';
      this.resultado.set(resultadoStr);
    })
  }

  openDialog() {
    this.dialog.open(DialogDataExampleDialog);
  }
}


@Component({
  selector: 'dialog-data-example-dialog',
  template: `
    <mat-dialog-content>
      Copiado!
    </mat-dialog-content>
  `,
  imports: [MatDialogContent],
})
export class DialogDataExampleDialog {
}
