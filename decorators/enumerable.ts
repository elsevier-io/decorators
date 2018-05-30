const enumerable = (_target: any, _key: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
    descriptor.enumerable = true;
    return descriptor;
};

export default enumerable;
