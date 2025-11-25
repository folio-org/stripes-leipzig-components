# useOkapiKyQuery

## Usage

A hook for fetching data using `useMutation` from `react-query`.


## Props

Name | type | description | default | required
--- | --- | --- | --- | ---
`queryKey` | string or array | Unique key for the query. If not provided, [`${api}/${id}`, params] is used. | - | false
`id` | string | Resource ID. Will be appended to the base API (${api}/${id}). | - | false
`api` | string | Base API endpoint. | - | true
`params` | object | URL search parameters (query string parameters). | - | false
`options` | object | Additional useQuery options. | - | false


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
