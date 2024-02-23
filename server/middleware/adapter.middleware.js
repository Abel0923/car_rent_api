function ReqMiddleware(controller) {
    
  return async (req, res, next) => {
    const httpRequest = {
      path: req.path,
      method: req.method,
      pathParams: req.params,
      queryParams: req.query,
      body: req.body,
      files: req.files,
      headers: req.headers,
    };

    return await controller(httpRequest, res, next)
      .then(({ status, ...httpResponse }) => {
        res.status(200).json(httpResponse);
      })
      .catch(({ status, ...error }) => {
        res.status(status ? status: 500).json(ErrorHandler(error));
      });
  };
}

function ErrorHandler(error) {
  let { errors, msg } = error;

  if (!msg) {
    error.msg = errors ? errors : 'Something Went Wrong!';
  } else {
    error.msg = msg || 'Something Went Wrong!';
  }

  return error;
}


module.exports = { ReqMiddleware, ErrorHandler }