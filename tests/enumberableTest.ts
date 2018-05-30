import test from 'ava';
import { enumerable } from '../';

test('enumerable - is enumerable with decorator', async t => {
    class Example {
        private isValid: boolean = true;

        @enumerable
        get validity(): boolean {
            return this.isValid;
        }
    }

    const example = new Example();
    for (const key in example) {
        if (key === 'validity') {
            t.pass();
        }
    }
});

test('enumerable - is not enumerable without decorator', async t => {
    class Example {
        private isValid: boolean = true;

        get validity(): boolean {
            return this.isValid;
        }
    }

    const example = new Example();
    for (const key in example) {
        if (key === 'validity') {
            return t.fail();
        }
    }
    t.pass();

});
