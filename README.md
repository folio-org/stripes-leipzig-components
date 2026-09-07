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

Types for the Stripes framework itself are not defined here. They are imported from
`@folio/stripes/*`, the same metapackage the components import at runtime -- it re-exports the
declarations of [stripes-types](https://github.com/folio-org/stripes-types), so modules never
need to depend on that package directly.

Consuming modules need **TypeScript 5.4 or newer**: the filter accordions use `NoInfer` to keep
the value type of a filter from being narrowed to a string literal by its `dataOptions`.

Run `yarn typecheck` to check the declarations. The compile-time tests under `test/types/`
are never executed; `tsc` is the assertion.

Those tests are what actually catches a wrong declaration. `skipLibCheck` is on, so `tsc` does
not verify `.d.ts` files themselves -- neither the ones of the dependencies nor ours. It is on
because the alternative type checks every `.d.ts` of every dependency, which makes the result
depend on how the module was installed: it fails in a standalone checkout while passing in the
Yarn workspace.

Errors therefore have to surface where the components are *used*, and `test/types/` covers both
directions. The positive cases catch a declaration that no longer describes the component. The
negative cases -- the `@ts-expect-error` lines -- catch a declaration that silently degrades to
`any`, which is what a broken import inside a `.d.ts` does while `skipLibCheck` is on: the
expected error disappears and TypeScript reports the unused directive instead. Note that
`@ts-expect-error` only applies to the line directly below it, so for multi-line JSX the comment
has to sit right above the opening tag.

## Additional information

Read the [Stripes Module Developer's Guide](https://github.com/folio-org/stripes/blob/master/doc/dev-guide.md).

Other [modules](https://dev.folio.org/source-code/#client-side).

Other FOLIO Developer documentation is at [dev.folio.org](dev.folio.org)
