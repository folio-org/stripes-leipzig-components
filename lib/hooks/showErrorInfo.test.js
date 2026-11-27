import showErrorInfo from './showErrorInfo';

describe('showErrorInfo', () => {
  const callout = {
    sendCallout: jest.fn(),
  };

  const formatMessage = jest.fn(({ id }) => {
    const messages = {
      'stripes-leipzig-components.showErrorInfo.errorHasOccurred': 'An error has occurred.',
      'stripes-leipzig-components.showErrorInfo.error': 'Error',
    };

    return messages[id];
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows the error message in a callout', async () => {
    const error = new Error('Request failed');

    const result = await showErrorInfo(error, { callout, formatMessage });

    expect(result).toBe('Request failed');
    expect(callout.sendCallout).toHaveBeenCalledWith({
      type: 'error',
      message: 'Error: Request failed',
      timeout: 0,
    });
  });

  it('shows the backend error message instead of the HTTP status text', async () => {
    const error = {
      message: 'Unprocessable Entity',
      response: {
        clone: () => ({
          json: async () => ({
            errors: [{ message: 'The name already exists' }],
          }),
        }),
      },
    };

    const result = await showErrorInfo(error, { callout, formatMessage });

    expect(result).toBe('The name already exists');
    expect(callout.sendCallout).toHaveBeenCalledWith({
      type: 'error',
      message: 'Error: The name already exists',
      timeout: 0,
    });
  });

  it('shows a fallback message when the error has no message', async () => {
    const result = await showErrorInfo({}, { callout, formatMessage });

    expect(result).toBe('An error has occurred.');
    expect(callout.sendCallout).toHaveBeenCalledWith({
      type: 'error',
      message: 'Error: An error has occurred.',
      timeout: 0,
    });
  });
});
