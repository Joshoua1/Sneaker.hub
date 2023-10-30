import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import './login.js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Component-specific logic, if needed
  }
}
