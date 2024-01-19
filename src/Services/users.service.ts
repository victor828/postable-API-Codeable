import { consults_Users } from "../Consult/users.consults";

class Users {
    async getAll (){
        const response = await consults_Users.getUsers();
       return response
         ?  {ok: true, data: response} 
         :  {ok: false, data: response};

    }
}

export const service_Users = new Users();