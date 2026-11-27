const showErrorInfo = async (error, { callout, formatMessage }) => {
  let errorResponse;

  try {
    errorResponse = await error?.response?.clone().json();
  } catch {
    // Response is missing or does not contain valid JSON
  }

  const backendMessage = errorResponse?.errors
    ?.map(({ message }) => message)
    .filter(Boolean)
    .join('\n') || errorResponse?.message
    || errorResponse?.error;

  const errorMessage =
    backendMessage
    || error?.message
    || formatMessage({ id: 'stripes-leipzig-components.showErrorInfo.errorHasOccurred' });

  const prefix = formatMessage({ id: 'stripes-leipzig-components.showErrorInfo.error' });

  callout?.sendCallout?.({
    type: 'error',
    message: `${prefix}: ${errorMessage}`,
    timeout: 0,
  });

  return errorMessage;
};

export default showErrorInfo;
