export type Milliseconds = number;

export interface RetryOptions {
    attempts: number;
    timeout: Milliseconds;
    exponentialBackoff: boolean;
}

const sleep = (timeout: number) => new Promise(resolve => setTimeout(resolve, timeout));

const retryPromise = (options: RetryOptions) => (_target: any, _key: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
    const fn = descriptor.value;
    const { attempts, timeout, exponentialBackoff } = options;
    let iteration = 0;
    descriptor.value = async function() {
        while (attempts > 0) {
            try {
                let result = fn.apply(this, arguments);
                if (result instanceof Promise) {
                    result = await result;
                }
                return result;
            } catch (err) {
                iteration++;
                if (iteration === attempts) {
                    throw err;
                }
                const waitTime = exponentialBackoff ? timeout * iteration : timeout;
                await sleep(waitTime);
            }
        }
    };
    return descriptor;
};

export default retryPromise;
