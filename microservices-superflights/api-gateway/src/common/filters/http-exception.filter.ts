import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from "@nestjs/common";

@Catch()
export class AllExceptionFilters implements ExceptionFilter{
    private readonly logger = new Logger(AllExceptionFilters.name)
    //TODO: ATRAPA TODAS LAS EXCEPCIONES A NIVEL GLOBAL
    catch(exception: any, host: ArgumentsHost) {
        //TODO: OBTIENE EL CONTEXTO QUE LLEGA 
        const context = host.switchToHttp();

        //TODO: TOMAMOS LA REPUESTA DEL CONTEXTO
        const response = context.getResponse();

        //TODO: TOMAMOS LA PETICION DEL CONTEXTO
        const request = context.getRequest();

        //TODO: SI ES HTTPEXCEPTION TOMAMOS EL STATUS SINO ES INTERNAL SERVER
        const status = exception instanceof HttpException ? exception.getStatus():HttpStatus.INTERNAL_SERVER_ERROR;

        //TODO: SI ES HTTPEXCEPTION TOMAMOS EL MESSAGE SINO ES EL VALOR DEL MENSAJE DE LA EXCEPCION
        const message =  exception instanceof HttpException ? exception.getResponse(): exception.message;

        this.logger.error(`Status ${status} Error: ${JSON.stringify(message)}`)

        //TODO: DEVOLVEMOS EL PATH DE LA RUTA DONDE SUCEDIO EL ERROR
        response.status(status).json({
            timestamp:new Date().toISOString(),
            path:request.url,
            //TODO: EL MESSAGE DEL ERROR
            error:message
        })
    }

}