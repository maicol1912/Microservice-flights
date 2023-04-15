//NodeJS.ProcessEnv

//declaracion para poder acceder y ver el indice de cada variable por medio del process.env
//ya que cuando accedemos al process.env nos aparecera lo que definimos en esta interfaz
declare namespace NodeJS {
    interface ProcessEnv {
        APP_URL:string
        PORT:number,
        AMQP_URL:string,
        URI_MONGODB:string
    }
}