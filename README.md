# stripes-leipzig-components

Copyright (C) 2025 The Open Library Foundation

This software is distributed under the terms of the Apache License, Version 2.0. See the file "[LICENSE](LICENSE)" for more information.

![Development funded by European Regional Development Fund (EFRE)](EFRE_2015_quer_RGB_klein.jpg)


## Introduction

This is a library of React components and utility functions for use with the [Stripes UI toolkit](https://github.com/folio-org/stripes-core/), part of the [FOLIO project](https://www.folio.org/).

The components and utility functions can be integrated into all FOLIO UI apps.
The library was developed by team Leipzig, and the components are therefore mainly used in UI apps maintained by team Leipzig ([ui-erm-usage](https://github.com/folio-org/ui-erm-usage), [ui-finc-config](https://github.com/folio-org/ui-finc-config), [ui-finc-select](https://github.com/folio-org/ui-finc-select), [ui-idm-connect](https://github.com/folio-org/ui-idm-connect)).

## TypeScript

The components are written in JavaScript, but ship hand-written type declarations so that they
can be consumed from TypeScript modules. The declarations live next to the components they
describe (e.g. `lib/CheckboxFilterAccordion/CheckboxFilterAccordion.d.ts`) and are re-exported
from the root `index.d.ts`, which `package.json` points at via its `types` field.

So far only `CheckboxFilterAccordion` and `DynamicSelectionFilterAccordion` are typed. Note that
the root `index.d.ts` replaces TypeScript's inference for the *whole* package, so the remaining
exports are invisible to TypeScript: importing one of them from a `.ts`/`.tsx` file fails with
`TS2305: ... has no exported member`.

Consuming modules need **TypeScript 5.4 or newer**: the filter accordions use `NoInfer` to keep
the value type of a filter from being narrowed to a string literal by its `dataOptions`.

Run `yarn typecheck`. Because `skipLibCheck` is on, a wrong declaration only shows up where the
components are used -- which is what the compile-time tests under `test/types/` are for. They
are never executed; `tsc` is the assertion, and their comments explain what each case covers.

## Additional information

Read the [Stripes Module Developer's Guide](https://github.com/folio-org/stripes/blob/master/doc/dev-guide.md).

Other [modules](https://dev.folio.org/source-code/#client-side).

Other FOLIO Developer documentation is at [dev.folio.org](dev.folio.org)
