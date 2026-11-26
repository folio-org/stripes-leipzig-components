const showErrorInfo = (error, { callout, formatMessage }) => {
  const errorMessage =
    error?.message || formatMessage({ id: 'stripes-leipzig-components.showErrorInfo.errorHasOcurred' });
  const prefix = formatMessage({ id: 'stripes-leipzig-components.showErrorInfo.error' });

  callout?.sendCallout?.({
    type: 'error',
    message: `${prefix}: ${errorMessage}`,
    timeout: 0,
  });

  return errorMessage;
};

export default showErrorInfo;
