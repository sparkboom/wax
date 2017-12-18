export const createSuccessHandler = (dispatch, action) => {
  return ({ body, options, latestRequestId }) => {
    if (options.requestId === latestRequestId) {
      dispatch(action(body));
    }
  };
};

export const createErrorHandler = (dispatch, action) => {
  return ({ error, options, response, latestRequestId }) => {
    if (options.requestId === latestRequestId) {
      dispatch(action({
        message: error.message,
        statusCode: response.status,
        requestId: response.headers.get('AdStudio-CorrelationId'),
      }, {
        log: {
          name: action.toString(),
          response,
        }
      }));
    }
  };
};
