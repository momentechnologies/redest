import deepmerge from 'deepmerge';

let settings = {
    internalPropPrefix: '__redest__',
    components: {
        loading: null,
        error: null,
    },
    requests: {
        prefix: '',
    },
};

export const setSettings = (updatedSettings = {}) => {
    settings = deepmerge(settings, updatedSettings, {
        arrayMerge: (destination, source) => source,
    });
};

export const getSettings = () => {
    return settings;
};
