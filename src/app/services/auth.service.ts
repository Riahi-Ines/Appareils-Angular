export class AuthService{
    isAuth=false;

    signIn(){
        return new Promise( /*pour dire qu'elle est async*/
            (resolve,reject) => {
                setTimeout(
                  ()=>{       
                this.isAuth=true;             
                resolve(true);
               }, 2000);
            }
        )
    }

signOut(){
    this.isAuth=false;
}

}