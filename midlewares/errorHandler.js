import  httpResponse  from "../src/utils/httpresponse.js";
import {logger} from "../logs/logger.js";

export const errorHandler = (error, req, res, next) => {
    logger.info( `error ${error}`) 
    const status = error.status || 500
    return httpResponse.ServerError(res, error.message)
}