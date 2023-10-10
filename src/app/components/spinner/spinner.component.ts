import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

  isLoanding$ = this.services.isLoanding$;

  constructor(private readonly services: DataService) {}

  ngOnInit(): void {
  }

}
