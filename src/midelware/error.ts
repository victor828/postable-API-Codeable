// import { NextFunction } from "express";


export class ApiError extends Error{
    status:number;
    details?: Record<string,any>;

    constructor(message:string,status:number,details?:Record<string,any>){
        super(message);
        this.status=status;
        this.details=details;
    }
}


// export default function errorHandler(
//     error:Error,
//     _req:Request,
//     res:Response,
//     _next:NextFunction
// ){
//     console.log("Error Handler");
//     if(error instanceof ApiError){
//         res.status(error.status).json({
//             ok:false,
//             error:{
//                 message:error.message,
//                 details:error.details
//             }
//         })
//     }
// }