# useOkapiKyMutation

## Usage

A hook for Create, Update, and Delete operations on Okapi resources using `useOkapiKy` and `useMutation` from `react-query`.
Returns an object with three hooks: useCreate(), useUpdate(), useDelete().


## Props

Name | type | description | default | required
--- | --- | --- | --- | ---
`mutationKey` | string, array | Unique key for the mutation. | - | false
`id` | string | Resource ID. Required for PUT and DELETE. | - | conditional
`api` | string | Base API endpoint.  | - | true
`options` | object | Additional useMutation options. | - | false

## Return Value

`useOkapiKyMutation` returns an object containing three hooks: `useCreate()`, `useUpdate()`, and `useDelete()`.

Each returned hook accepts an optional `options` object:

Name | Type | Description | Required
--- | --- | --- | ---
`onSuccess` | function | Callback fired on successful mutation. Receives `(data, variables, context)` | false
`onError` | function | Callback fired on mutation error. Receives `(error, variables, context)` | false
`onSettled` | function | Callback fired on completion (success or error) | false
`onMutate` | function | Callback fired before mutation | false
`retry` | boolean/number | Retry failed mutations (default: `false`) | false

For more see [useMutation documentation](https://tanstack.com/query/v3/docs/react/reference/useMutation).

Each returned hook returns a react-query `useMutation` result object with the following properties:

Property | Type | Description
--- | --- | ---
`mutate` | function | Triggers the mutation
`mutateAsync` | function | Triggers the mutation and returns a Promise
`data` | any | `useCreate`: parsed JSON response; `useUpdate`/`useDelete`: null
`isLoading` | boolean | True while the mutation is running
`isError` | boolean | True when the mutation has failed
`error` | Error | Error object when `isError` is true
`reset` | function | Resets the mutation state

For more see [useMutation documentation](https://tanstack.com/query/v3/docs/react/reference/useMutation).

## useOkapiKyMutation example Creating a resource (POST)

```
  import { useOkapiKyMutation } from '@folio/stripes-leipzig-components';

  const { useCreate } = useOkapiKyMutation({
    mutationKey: 'books',
    api: '/books',
  });

  const { mutateAsync: createBook } = useCreate({
    onSuccess: () => {
      history.push(`/book/${bookId}${location.search}`);
    },
  });

  return (
    <BookForm
      handlers={{ onClose: handleClose }}
      onSubmit={createBook}
    />
  );

```


## useOkapiKyMutation example Updating a resource (PUT)

```
  import { useOkapiKyMutation } from '@folio/stripes-leipzig-components';

  const { useUpdate } = useOkapiKyMutation({
    mutationKey: ['books', bookId],
    api: '/books',
    id: bookId,
  });

  const { mutateAsync: putBook } = useUpdate({
    onSuccess: () => {
      handleClose();
    },
  });

  return (
    <BookForm
      handlers={{ onClose: handleClose }}
      onSubmit={putBook}
    />
  );

```


## useOkapiKyMutation example Deleting

```
  import { useOkapiKyMutation } from '@folio/stripes-leipzig-components';

  const { useDelete } = useOkapiKyMutation({
    mutationKey: ['books', bookId],
    api: '/books',
    id: bookId,
  });

  const { mutateAsync: deleteBook } = useDelete({
    onSuccess: () => {
      history.push(`/books/${location.search}`);
    },
  });

  return (
    <BookForm
      handlers={{ onClose: handleClose }}
      onSubmit={deleteBook}
    />
  );

```