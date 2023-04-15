import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs"
import {timeout} from "rxjs/operators"

@Injectable()
export class TimeOutInterceptor implements NestInterceptor{
    //TODO: OBTIENE LAS PETICIONES QUE SE DEMORAN MAS DE 120000 MILISEGUNDOS Y LAS MARCA COMO ERROR
    intercept(context:ExecutionContext,next:CallHandler<any>):Observable<any> | Promise<Observable<any>>{
        return next.handle().pipe(timeout(120000));
    }
}