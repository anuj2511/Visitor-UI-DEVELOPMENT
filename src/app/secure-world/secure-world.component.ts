import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-secure-world',
  templateUrl: './secure-world.component.html',
  styleUrls: ['./secure-world.component.scss']
})
export class SecureWorldComponent implements OnInit {

  public env: any;

  constructor() {
    this.env = environment;
    console.log(environment);
  }

  ngOnInit(): void {
  }

}
