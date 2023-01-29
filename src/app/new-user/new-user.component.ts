import { Component,OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup,Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit{
  userForm: FormGroup;/**obj formulaire qui correspond au formulaire dans
  le template*/

  constructor(private formBuilder:FormBuilder,
              private userService: UserService,
              private router: Router){}
  ngOnInit(){
    this.initForm();
  }
  initForm(){
    this.userForm=this.formBuilder.group(
      {
        firstName:['',Validators.required],
        lastName:['',Validators.required],
        email:['',[Validators.required,Validators.email]],
        drinkPreference:['',Validators.required],
        hobbies:this.formBuilder.array([])
      }
    )
  }

  onSubmitForm(){
    const formValue = this.userForm.value;
    const newUser = new User(
      formValue['firstName'],
      formValue['lastName'],
      formValue['email'],
      formValue['drinkPreference'],
      formValue['hobbies']? formValue['hobbies']:[] /** peut etre pas de hobbies */
    )
    this.userService.addUser(newUser);
    this.router.navigate(['/users']);
  }
  /** pour de raison de typage stricte tableau de hobbies */
  getHobbies(){
    return this.userForm.get('hobbies') as FormArray;
  }
  onAddHobby(){
    const newHobbyControl=this.formBuilder.control('',Validators.required);
    this.getHobbies().push(newHobbyControl);
  }
}
