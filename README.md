# decorators
[![Build Status](https://travis-ci.org/elsevier-io/decorators.svg?branch=master)](https://travis-ci.org/elsevier-io/decorators)

A collection of TypeScript decorators

## Enabling support in tsconfig.json

To enable support for decorators you will need to add `"experimentalDecorators": true` to your `tsconfig.json` file.

## Available decorators

### enumerable

Example:

```typescript
import { enumerable } from '@elsevier/decorators';

class Example {
    private isValid: boolean = true;

    @enumerable
    get validity(): boolean {
        return this.isValid;
    }
}
```
