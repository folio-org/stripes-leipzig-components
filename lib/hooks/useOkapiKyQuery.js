import { useIntl } from 'react-intl';
import { useQuery } from 'react-query';

import {
  useCallout,
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

  return useQuery(
    key,
    () => {
      return ky.get(url, { searchParams: params }).json();
    },
    {
      ...options,
      onError: (error) => {
        if (errorHandling) {
          showErrorInfo(error, { callout, formatMessage });
        }

        options.onError?.(error);
      },
    }
  );
};
