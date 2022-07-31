import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserService } from '../services/api.service';
import { SocketService } from '../services/sockets.service';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {
  today = new Date();
  valUSD: number = 30;
  valEUR: number = 2.10;
  valCOP: number = 100000.00;
  public inputControl: FormControl = new FormControl;
  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());
  preciosObs?: Observable<any>


  constructor(public socketService: SocketService,
     public userService: UserService) {

  }

  ngOnInit(): void {
    this.inputControl = new FormControl();
    this.userService.getPrices().subscribe((res) => {
      console.log(res)
    })


  }

  buscar() {
    console.log(this.serializedDate.value)
    console.log(this.preciosObs)
  }
}
