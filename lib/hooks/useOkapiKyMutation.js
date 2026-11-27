import { useIntl } from 'react-intl';
import {
  useMutation,
  useQueryClient,
} from 'react-query';

import {
  useCallout,
  useModuleInfo,
  useOkapiKy,
} from '@folio/stripes/core';

import showErrorInfo from './showErrorInfo';

// kyOptions can be an object or a function
const resolveKyOptions = (kyOptions, variables) => (
  (typeof kyOptions === 'function' ? kyOptions(variables) : kyOptions) ?? {}
);

// send the payload as JSON, unless kyOptions has a body (e.g. a file)
const withPayload = (payload, kyOptions) => (
  'body' in kyOptions ? kyOptions : { json: payload, ...kyOptions }
);

export const useOkapiKyMutation = ({
  mutationKey,
  invalidateQueryKey,
  id,
  api,
  errorHandling = true,
} = {}) => {
  if (!api) throw new Error('useOkapiKyMutation requires an "api" parameter');

  const ky = useOkapiKy();
  const queryClient = useQueryClient();
  const { formatMessage } = useIntl();
  const callout = useCallout();
  const moduleInfo = useModuleInfo(api);

  const useMutationRequest = (method, { withoutId = false, kyOptions, onSuccess, ...options } = {}) => {
    return useMutation({
      ...(mutationKey && {
        mutationKey: [
          moduleInfo?.name,
          ...(Array.isArray(mutationKey) ? mutationKey : [mutationKey]),
        ],
      }),
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
            if (!id && !withoutId) throw new Error('DELETE requires an "id"');

            await ky.delete(id ? `${api}/${id}` : api, requestOptions);

            return null;

          default:
            throw new Error(`Unsupported HTTP method: ${method}`);
        }
      },
      ...options,
      onSuccess: async (data, variables, context) => {
        if (invalidateQueryKey) {
          await queryClient.invalidateQueries(invalidateQueryKey);
        }

        return onSuccess?.(data, variables, context);
      },
      onError: async (error, variables, context) => {
        if (errorHandling) {
          await showErrorInfo(error, { callout, formatMessage });
        }

        options.onError?.(error, variables, context);
      },
    });
  };

  return {
    useCreate: (options) => useMutationRequest('post', options),
    useUpdate: (options) => useMutationRequest('put', options),
    useDelete: (options) => useMutationRequest('delete', options),
  };
};
