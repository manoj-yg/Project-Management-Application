// This Error class in built in  nodejs so no defined anywhere we can directly extend this
class ApiError extends Error{
    constructor(
        statusCode,
        message="Something Not working",
        errors=[],
        stack=""
    ){
        super(message)
        this.statusCode=statusCode
        this.data=null
        this.message=message
        this.success=false
        this.errors=errors

        if(stack){
            this.stack=stack
        }else{
            Error.captureStackTrace(this, this.constructor)
        }

    }
}

export {ApiError};