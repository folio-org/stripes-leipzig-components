# useOkapiKyQuery

## Usage

A hook for fetching data from Okapi using `useOkapiKy` and `useQuery` from `react-query`.


## Props

Name | type | description | default | required
--- | --- | --- | --- | ---
`queryKey` | string or array | Unique key for the query. If not provided, [`${api}/${id}`, params] is used. | - | false
`id` | string | Resource ID. Will be appended to the base API (${api}/${id}). | - | false
`api` | string | Base API endpoint. | - | true
`params` | object | URL search parameters (query string parameters). | - | false
`options` | object | Additional useQuery options. | - | false

## Return Value

Returns a react-query `useQuery` result object with the following properties:

Property | Type | Description
--- | --- | ---
`data` | any | The fetched data from the API
`isLoading` | boolean | True if the query is currently fetching
`isError` | boolean | True if the query encountered an error
`error` | Error | The error object if `isError` is true
`refetch` | function | Manually trigger a refetch

For more see [useQuery documentation](https://tanstack.com/query/v3/docs/react/reference/useQuery).

## useOkapiKyQuery example

```
  import { useOkapiKyQuery } from '@folio/stripes-leipzig-components';

  const { data: book, isLoading: isLoadingBook, isError } = useOkapiKyQuery({
    queryKey: ['books', bookId],
    id: bookId,
    api: 'books',
  });

  if (isLoadingBook) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>{book.title}</h2>
      <p>{book.author}</p>
    </div>
  );

```
