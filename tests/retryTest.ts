import test from 'ava';
import { retryPromise } from '../';

test('retry - retries until limit for an always failing call', async t => {
    class Example {
        public count: number = 0;

        @retryPromise({ attempts: 3, timeout: 1000, exponentialBackoff: true })
        public async test() {
            this.count++;
            throw new Error();
        }
    }

    const example = new Example();
    try {
        await example.test();
        t.fail();
    } catch {
        t.is(example.count, 3);
    }
});

test('retry - retries until success', async t => {
    class Example {
        public count: number = 0;

        @retryPromise({ attempts: 5, timeout: 1000, exponentialBackoff: true })
        public async test() {
            this.count++;
            if (this.count < 2) {
                throw new Error();
            }
        }
    }

    const example = new Example();
    try {
        await example.test();
        t.is(example.count, 2);
    } catch {
        t.fail();
    }
});

test('retry - success on first try', async t => {
    class Example {
        public count: number = 0;

        @retryPromise({ attempts: 5, timeout: 1000, exponentialBackoff: true })
        public async test() {
            this.count++;
        }
    }

    const example = new Example();
    try {
        await example.test();
        t.is(example.count, 1);
    } catch {
        t.fail();
    }
});
