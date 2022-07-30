import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {

  public inputControl: FormControl = new FormControl;
  

  constructor() { }

  ngOnInit(): void {
    this.inputControl = new FormControl();
  }

}
