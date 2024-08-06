const HttpStatus = {
    OK: 200,
    NOT_FOUND: 404,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    INTERNAL_SERVER_ERROR: 500,
    MISSING_DATA: 428,
  };
  
  const errorsDictionary = {
      OK: 'OK',
      UNAUTHORIZED: "Unauthorized",
      FORBIDDEN: "Forbidden",
      INTERNAL_SERVER_ERROR: "Internal Server Error",
      NOT_FOUND: "Not found",
      MISSING_DATA : "Missing data",

  }
  
  export class HttpResponse {
    Ok(res, data) {
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: errorsDictionary.OK,
        data,
      });
    }
  
    NotFound(res, data) {
      return res.status(HttpStatus.NOT_FOUND).json({
        status: HttpStatus.NOT_FOUND,
        message: errorsDictionary.NOT_FOUND,
        data,
      });
    }
  
    Unauthorized(res, data) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        status: HttpStatus.UNAUTHORIZED,
        message: errorsDictionary.UNAUTHORIZED,
         data,
      });
    }
  
    Forbidden(res, data) {
      return res.status(HttpStatus.FORBIDDEN).json({
        status: HttpStatus.FORBIDDEN,
        message: errorsDictionary.FORBIDDEN,
         data,
      });
    }
  
    ServerError(res, data) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: errorsDictionary.INTERNAL_SERVER_ERROR,
         data,
      });
    }

    MissingData(res,data) {
      return res.status(HttpStatus.MISSING_DATA).json({
        status: HttpStatus.MISSING_DATA,
        message: errorsDictionary.MISSING_DATA,
        data,
      });
    }
  }

  const httpResponse = new HttpResponse();


  export default httpResponse;


