import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user';
import { AuthenticationService } from 'src/app/shared/services/authentication-service.service';
import { LoginService } from 'src/app/shared/services/login.service';
import { RegisterService } from 'src/app/shared/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public agreementCheckBox: boolean = false;
  public sexTypes: string[] = ['male', 'female'];
  public employmentStatuses: string[] = ["Full-time", "Part-time", "Unemployed"];
  public maritalStatuses: string[] = ["Single", "Married", "Divorced", "Widowed"];
  public titles: string[] = ["ms", "mrs", "mr"];
  public newUser: User = new User();
  public response: User;
  public failedRegistration: boolean = false;
  public httpError: any;
  public userLoginInfo = {
    username: '',
    password: ''
  }



  constructor(
    private authService: AuthenticationService,
    private loginService: LoginService,
    private _location: Location,
    private route: Router,
    private registerService: RegisterService) { }

  ngOnInit(): void { }

  backButton() {
    this._location.back();
  }

  registerUser(form: NgForm): any {
    if (form.invalid) return alert('Please complete all fields before submitting')
    console.log(form.value);
    console.log("Creating new user", this.newUser);
    this.newUser = form.value;
    this.newUser.type = "customer";

    this.userLoginInfo.username = this.newUser.username;
    this.userLoginInfo.password = this.newUser.password;
    console.log(this.userLoginInfo);


    this.registerService.registerNewUser(this.newUser).subscribe(
      res => {
        this.response = res;
        console.log('HTTP response', res);
        console.log('successful login');

        this.loginService.login(this.userLoginInfo)
          .subscribe(
            res => {
              console.log('HTTP response', res);
              console.log('successful login');
              console.log('returned token', res.id);
              localStorage.setItem("sessionToken", res.id);
              localStorage.setItem("userId", res.userId);
              this.authService.setLoggedInStatus(true);
            },
            err => {
              console.log('HTTP Error', err);
              console.log('failed login');
            },
            () => console.log('HTTP request completed.'));

        this.route.navigate(['/register-account/success', this.response.username]);
      },
      err => {
        console.log('HTTP Error', err);
        this.httpError = err;
        console.log(this.httpError.error.error.message);
        alert(this.httpError.error.error.message);
        console.log('failed registration');
        this.failedRegistration = true;
      },
      () => console.log('HTTP request completed.'));

  }
}
