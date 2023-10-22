import { Component, Input ,OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  registrationForm: FormGroup;
  otpByUser!: any;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registrationForm = this.fb.group({
      fullName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      email: ['', Validators.required],
      contactNumber: ['', Validators.required],
      password: ['', Validators.required],
      gender: ['', Validators.required], 
      
    });
  }
  ngOnInit(): void {
   
  }


  onSubmit() {
    if(this.registrationForm.valid) {
    const formData = this.registrationForm.value;
    

      this.authService.register(formData).subscribe(
      (response) => {
        alert("OTP sent to your email address")
        console.log("success");
      },
      (error) => {
        console.error('Error from Spring Boot:', error);
      }
    );
    }
  }

  validate() {
    if (this.otpByUser) {
      this.authService.validate(this.otpByUser).subscribe(
        
        (response: any) => {
          alert("Registration Successfull")
          console.log('Response from Spring Boot:', response);
        },
        (error: any) => {
     
          console.error('Error from Spring Boot:', error);
        }
      );
    } else {
      console.error('Invalid OTP value.');
    }
  }
}  