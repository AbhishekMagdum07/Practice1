import { Component } from '@angular/core';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
  userLoginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.userLoginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  

  onSubmit(){
    if(this.userLoginForm.valid){
    const credentials = this.userLoginForm.value;

    this.authService.login(credentials).subscribe(
      (response) => {
        const token = response.token;
        this.authService.setToken(token);
        // localStorage.setItem('userToken',token)
        alert("Login Successful")
        console.log('Login Successful');
        
        this.router.navigate(['products'])
       

      },
    
      (error: string) => {
        alert("Login Failed")
        console.log('login failed'+error);
      }
    )
    }

}
   
}


