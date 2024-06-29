import { roles } from "../../middleware/auth.js";


export const endPoints ={
    create:[roles.Admin],
    get:[roles.Admin, roles.User],
    active:[roles.Admin],
    delete:[roles.Admin],
}