import { createErrorHandler, createSuccessHandler } from '../handlers';

describe('Success handler', () => {

  describe('When the request ID does not match the most recent request ID', () => {

    it('should not dispatch the given action', () => {
      const dispatch = jest.fn();
      const action = jest.fn(() => 'createdAction');
      const handler = createSuccessHandler(dispatch, action);

      handler({
        body: 'body',
        options: {
          requestId: '123',
        },
        latestRequestId: '321'
      });

      expect(action).not.toHaveBeenCalled();
      expect(dispatch).not.toHaveBeenCalled();
    });
  });

  describe('When the request ID matches the most recent request ID', () => {

    it('should dispatch the given action with the body from the response', () => {
      const dispatch = jest.fn();
      const action = jest.fn(() => 'createdAction');
      const handler = createSuccessHandler(dispatch, action);

      handler({
        body: 'body',
        options: {
          requestId: '123',
        },
        latestRequestId: '123'
      });

      expect(action).toHaveBeenCalledWith('body');
      expect(dispatch).toHaveBeenCalledWith('createdAction');
    });
  });
});

describe('Error handler', () => {

  const response = {
    status: 400,
    headers: {
      get: () => 'correlationId'
    },
  };

  describe('When the request ID does not match the most recent request ID', () => {

    it('should not dispatch the given action', () => {
      const dispatch = jest.fn();
      const action = jest.fn(() => 'createdAction');
      action.toString = () => 'ACTION_NAME';
      const handler = createErrorHandler(dispatch, action);

      handler({
        error: {
          message: 'message',
        },
        options: {
          requestId: '123',
        },
        latestRequestId: '321',
        response,
      });

      expect(action).not.toHaveBeenCalled();
      expect(dispatch).not.toHaveBeenCalled();
    });
  });

  describe('When the request ID matches the most recent request ID', () => {

    it('should dispatch the given action with the body from the response', () => {
      const dispatch = jest.fn();
      const action = jest.fn(() => 'createdAction');
      action.toString = () => 'ACTION_NAME';
      const handler = createErrorHandler(dispatch, action);

      handler({
        error: {
          message: 'message',
        },
        options: {
          requestId: '123',
        },
        latestRequestId: '123',
        response,
      });

      expect(action).toHaveBeenCalledWith({
        message: 'message',
        statusCode: 400,
        requestId: 'correlationId',
      }, {
        log: {
          name: 'ACTION_NAME',
          response,
        }
      });
      expect(dispatch).toHaveBeenCalledWith('createdAction');
    });
  });
});
