import { useIntl } from 'react-intl';
import { useQuery } from 'react-query';

import {
  useCallout,
  useModuleInfo,
  useOkapiKy,
} from '@folio/stripes/core';

import showErrorInfo from './showErrorInfo';

export const useOkapiKyQuery = ({
  queryKey,
  id,
  api,
  params = {},
  options = {},
  errorHandling = true,
}) => {
  if (!api) throw new Error('useOkapiKyQuery requires an "api" parameter');

  const ky = useOkapiKy();
  const { formatMessage } = useIntl();
  const callout = useCallout();
  const url = id ? `${api}/${id}` : api;
  const key = Array.isArray(queryKey) ? queryKey : [queryKey ?? url, params];
  const moduleInfo = useModuleInfo(api);

  return useQuery(
    [moduleInfo?.name, ...key],
    () => ky.get(url, { searchParams: params }).json(),
    {
      ...options,
      onError: async (error) => {
        if (errorHandling) {
          await showErrorInfo(error, { callout, formatMessage });
        }

        options.onError?.(error);
      },
    }
  );
};
