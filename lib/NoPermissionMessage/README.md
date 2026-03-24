# NoPermissionMessage

Displays a `MessageBanner` when the user is missing required permissions to access a page or feature.
It is showing the translations of `stripes-smart-components` "Permission error" as a headline and "Sorry - your permissions do not allow access to this page." as a paragraph.

![NoPermissionMessage Screenshot](images/noPermissionMessage.png)

## Usage

```js
import { NoPermissionMessage } from '@folio/stripes-leipzig-components';

if (!hasPerms) return <NoPermissionMessage />;
```

## Props

Name | type | description | default | options | required
--- | --- | --- | --- | --- | ---
`message` | string | The text shown in the paragraph | stripes-smart-components.permissionsDoNotAllowAccess (translated) | - | false
`type` | string | Sets the style of the `MessageBanner` | `warning` | `default`, `error`, `success`, `warning` | false

## Example

```js
if (!hasPerms) return (
  <NoPermissionMessage
    message="You do not have the necessary permissions to use number generator sequences. Please contact your system administrator."
    type="default"
  />
);
```
