import settings from './settings';

export const errorComponent = (component) => {
    settings.components.error = component;
};

export const loadingComponent = (component) => {
    settings.components.loading = component;
};