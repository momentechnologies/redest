export default meta =>
    Object.keys(meta).reduce(
        (acc, getKey) => ({
            ...acc,
            [getKey]: {
                ...meta[getKey],
                loadedAt: false,
            },
        }),
        {}
    );
