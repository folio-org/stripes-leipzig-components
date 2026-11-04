import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';

import {
  renderHook,
  waitFor,
} from '@folio/jest-config-stripes/testing-library/react';
import { useOkapiKy } from '@folio/stripes/core';

import { useOkapiKyMutation } from './useOkapiKyMutation';

describe('useOkapiKyMutation', () => {
  const api = '/api/sources';
  const mutationKey = 'QK_SOURCES';
  const id = '123';
  let queryClient;
  let mockRequest;

  const wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  const doMockRequest = (method, responseBody = JSON.stringify({ id: '123456' })) => {
    if (method === 'post') {
      mockRequest = jest.fn(() => Promise.resolve({
        text: jest.fn(() => Promise.resolve(responseBody)),
      }));
    } else {
      mockRequest = jest.fn(() => Promise.resolve());
    }

    useOkapiKy.mockReturnValue({
      [method]: mockRequest,
    });
  };

  beforeEach(() => {
    jest.clearAllMocks();
    queryClient = new QueryClient();
  });

  it('should call POST with id and correct payload', async () => {
    doMockRequest('post');

    const { result: requestResult } = renderHook(
      () => useOkapiKyMutation({ mutationKey, id, api }),
      { wrapper }
    );

    const { result } = renderHook(() => requestResult.current.useCreate(), { wrapper });

    const payload = { name: 'Test Source' };
    result.current.mutateAsync(payload);

    await waitFor(() => {
      expect(mockRequest).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(mockRequest).toHaveBeenCalledWith(api, { json: { ...payload, id } });
    });
  });

  it('should call POST without id, but correct payload', async () => {
    doMockRequest('post');

    const { result: requestResult } = renderHook(
      () => useOkapiKyMutation({ mutationKey, id: undefined, api }),
      { wrapper }
    );

    const { result } = renderHook(() => requestResult.current.useCreate(), { wrapper });

    const payload = { name: 'Test Source' };
    result.current.mutateAsync(payload);

    await waitFor(() => {
      expect(mockRequest).toHaveBeenCalledWith(api, { json: payload });
    });
  });

  it('should return the parsed response body of a POST as data', async () => {
    doMockRequest('post');

    const { result: requestResult } = renderHook(
      () => useOkapiKyMutation({ mutationKey, api }),
      { wrapper }
    );

    const { result } = renderHook(() => requestResult.current.useCreate(), { wrapper });

    result.current.mutateAsync({ name: 'Test Source' });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual({ id: '123456' });
  });

  it('should return null as data if the POST response has no body', async () => {
    doMockRequest('post', '');

    const { result: requestResult } = renderHook(
      () => useOkapiKyMutation({ mutationKey, api }),
      { wrapper }
    );

    const { result } = renderHook(() => requestResult.current.useCreate(), { wrapper });

    result.current.mutateAsync({ name: 'Test Source' });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toBeNull();
  });

  it('should call PUT with correct payload and URL', async () => {
    doMockRequest('put');

    const { result: requestResult } = renderHook(
      () => useOkapiKyMutation({ mutationKey, id, api }),
      { wrapper }
    );

    const { result } = renderHook(() => requestResult.current.useUpdate(), { wrapper });

    const payload = { name: 'Updated Source' };
    result.current.mutateAsync(payload);

    await waitFor(() => {
      expect(mockRequest).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(mockRequest).toHaveBeenCalledWith(`${api}/${id}`, { json: payload });
    });
  });

  it('should call DELETE with correct URL', async () => {
    doMockRequest('delete');

    const { result: requestResult } = renderHook(
      () => useOkapiKyMutation({ mutationKey, id, api }),
      { wrapper }
    );

    const { result } = renderHook(() => requestResult.current.useDelete(), { wrapper });

    result.current.mutateAsync();

    await waitFor(() => {
      expect(mockRequest).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(mockRequest).toHaveBeenCalledWith(`${api}/${id}`, {});
    });
  });

  it('should call DELETE on the api itself without an id if withoutId is set', async () => {
    doMockRequest('delete');

    const { result: requestResult } = renderHook(
      () => useOkapiKyMutation({ mutationKey, api }),
      { wrapper }
    );

    const { result } = renderHook(() => requestResult.current.useDelete({ withoutId: true }), { wrapper });

    result.current.mutateAsync();

    await waitFor(() => {
      expect(mockRequest).toHaveBeenCalledWith(api, {});
    });
  });

  it('should fail DELETE without an id if withoutId is not set', async () => {
    doMockRequest('delete');

    const { result: requestResult } = renderHook(
      () => useOkapiKyMutation({ mutationKey, api }),
      { wrapper }
    );

    const { result } = renderHook(() => requestResult.current.useDelete(), { wrapper });

    await expect(result.current.mutateAsync()).rejects.toThrow('DELETE requires an "id"');
    expect(mockRequest).not.toHaveBeenCalled();
  });

  it('should merge static kyOptions into the request', async () => {
    doMockRequest('post');

    const { result: requestResult } = renderHook(
      () => useOkapiKyMutation({ mutationKey, api }),
      { wrapper }
    );

    const kyOptions = { headers: { 'X-Test': '1' }, timeout: false };
    const { result } = renderHook(() => requestResult.current.useCreate({ kyOptions }), { wrapper });

    const payload = { name: 'Test Source' };
    result.current.mutateAsync(payload);

    await waitFor(() => {
      expect(mockRequest).toHaveBeenCalledWith(api, { json: payload, ...kyOptions });
    });
  });

  it('should send a body from kyOptions instead of the JSON payload', async () => {
    doMockRequest('post');

    const { result: requestResult } = renderHook(
      () => useOkapiKyMutation({ mutationKey, api }),
      { wrapper }
    );

    const formData = new FormData();
    const kyOptions = ({ data, overwrite }) => ({ body: data, searchParams: { overwrite } });
    const { result } = renderHook(() => requestResult.current.useCreate({ kyOptions }), { wrapper });

    result.current.mutateAsync({ data: formData, overwrite: true });

    await waitFor(() => {
      expect(mockRequest).toHaveBeenCalledWith(api, { body: formData, searchParams: { overwrite: true } });
    });
  });

  it('should pass kyOptions to PUT', async () => {
    doMockRequest('put');

    const { result: requestResult } = renderHook(
      () => useOkapiKyMutation({ mutationKey, id, api }),
      { wrapper }
    );

    const kyOptions = { headers: { 'X-Test': '1' } };
    const { result } = renderHook(() => requestResult.current.useUpdate({ kyOptions }), { wrapper });

    const payload = { name: 'Updated Source' };
    result.current.mutateAsync(payload);

    await waitFor(() => {
      expect(mockRequest).toHaveBeenCalledWith(`${api}/${id}`, { json: payload, ...kyOptions });
    });
  });

  it('should pass kyOptions to DELETE', async () => {
    doMockRequest('delete');

    const { result: requestResult } = renderHook(
      () => useOkapiKyMutation({ mutationKey, id, api }),
      { wrapper }
    );

    const kyOptions = { headers: { 'X-Test': '1' } };
    const { result } = renderHook(() => requestResult.current.useDelete({ kyOptions }), { wrapper });

    result.current.mutateAsync();

    await waitFor(() => {
      expect(mockRequest).toHaveBeenCalledWith(`${api}/${id}`, kyOptions);
    });
  });

  it('should not pass kyOptions on to useMutation', async () => {
    doMockRequest('delete');

    const { result: requestResult } = renderHook(
      () => useOkapiKyMutation({ mutationKey, id, api }),
      { wrapper }
    );

    const onSuccess = jest.fn();
    const { result } = renderHook(
      () => requestResult.current.useDelete({ kyOptions: { timeout: false }, onSuccess }),
      { wrapper }
    );

    result.current.mutateAsync();

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalled();
    });
  });

  it('should show error calling mutation without api', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => renderHook(() => useOkapiKyMutation({ mutationKey, id }), { wrapper }))
      .toThrow('useOkapiKyMutation requires an "api" parameter');

    consoleErrorSpy.mockRestore();
  });
});
