import { roles } from "../../middleware/auth.js";


export const endPoints ={
    create:[roles.User],
    all:[roles.Admin],
    getOrder:[roles.User],
    changeStatus:[roles.Admin]
   
}