import {User} from "../models/user.model";
import { Subject } from "rxjs";


export class UserService {
    private users:User[]=[
        {
        firstName:'Ines',
        lastName: 'Riahi',
        email:'ines@gmail.com',
        drinkPreference:'Tea',
        hobbies:[
            'Coder',
            'Poéte'
        ]
    }
    ];
    userSubject = new Subject<User[]>();

    emitUsers(){
        this.userSubject.next(this.users.slice());
    }

    addUser(user:User){
        this.users.push(user);
        this.emitUsers();
    }
}