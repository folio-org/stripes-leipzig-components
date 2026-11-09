import { useMutation } from 'react-query';

import { useOkapiKy } from '@folio/stripes/core';

// kyOptions can be an object or a function
const resolveKyOptions = (kyOptions, variables) => (
  (typeof kyOptions === 'function' ? kyOptions(variables) : kyOptions) ?? {}
);

// send the payload as JSON, unless kyOptions has a body (e.g. a file)
const withPayload = (payload, kyOptions) => (
  'body' in kyOptions ? kyOptions : { json: payload, ...kyOptions }
);

export const useOkapiKyMutation = ({ mutationKey, id, api } = {}) => {
  if (!api) throw new Error('useOkapiKyMutation requires an "api" parameter');

  const ky = useOkapiKy();

  const useMutationRequest = (method, { withoutId = false, kyOptions, ...options } = {}) => {
    return useMutation({
      ...(mutationKey && { mutationKey: Array.isArray(mutationKey) ? mutationKey : [mutationKey] }),
      mutationFn: async (payload) => {
        const requestOptions = resolveKyOptions(kyOptions, payload);

        switch (method) {
          case 'post': {
            const response = await ky.post(api, withPayload(id ? { ...payload, id } : payload, requestOptions));
            const text = await response.text();

            return text ? JSON.parse(text) : null;
          }

          case 'put':
            if (!id) throw new Error('PUT requires an "id"');
            await ky.put(`${api}/${id}`, withPayload(payload, requestOptions));

            return null;

          case 'delete':
            // without an id the resource at api itself is deleted, but only if explicitly requested
            if (!id && !withoutId) throw new Error('DELETE requires an "id"');

            await ky.delete(id ? `${api}/${id}` : api, requestOptions);

            return null;

          default:
            throw new Error(`Unsupported HTTP method: ${method}`);
        }
      },
      ...options,
    });
  };

  return {
    useCreate: (options) => useMutationRequest('post', options),
    useUpdate: (options) => useMutationRequest('put', options),
    useDelete: (options) => useMutationRequest('delete', { ...options }),
  };
};
