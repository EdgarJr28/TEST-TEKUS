import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserService } from '../services/api.service';
import { SocketService } from '../services/sockets.service';
import { WebsocketService } from '../services/websocket.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {
  today = new Date();
  public inputControl: FormControl = new FormControl;
  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());
  precios: any = [];


  constructor(
    public userService: UserService, public wsService: WebsocketService) {
    // obtener y refrescar mediante api rest  
    // this.obtenerPrecios();
    // this.refrescarBoard(); 
    // ---------------------------------------- 
    // ---------------------------------------- 
    // obtener y refrescar mediante WebSockets 
    this.obtenerPreciosWs();
    this.refrescarBoardWs()
  }

  ngOnInit(): void {
    this.inputControl = new FormControl();
    this.precios = []
  }

  buscar() {
    console.log(this.serializedDate.value)
  }

  trackByFn(index: any, item: any) {
    return item.id;
  }
  obtenerPrecios() {
    this.userService.getPrices().subscribe((res: any) => {
      this.precios = []
      res.data.forEach((element: any) => {
        this.precios.push(element)
      });
    })
  }

  obtenerPreciosWs() {
    this.wsService.emit("obtenerPrecios", "", (response: any) => {
      this.precios = []
      response.data.forEach((element: any) => {
        this.precios.push(element)
      });

    });
  }

  refrescarBoard() {
    setInterval(() => { this.obtenerPrecios() }, 60000);
  }

  refrescarBoardWs() {
    setInterval(() => { this.obtenerPreciosWs() }, 60000);
  }
}
