# useOkapiKyMutation

## Usage

A hook for Create, Update, and Delete operations using `useMutation` from `react-query`.
Returns an object with three methods: useCreate(), useUpdate(), useDelete().


## Props

Name | type | description | default | required
--- | --- | --- | --- | ---
`mutationKey` | string, array | Unique key for the mutation. | - | false
`id` | string | Resource ID. Required for PUT and DELETE. | - | conditional
`api` | string | Base API endpoint.  | - | true
`options` | object | Additional useMutation options. | - | false


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