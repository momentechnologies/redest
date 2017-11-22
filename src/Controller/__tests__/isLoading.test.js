import isLoading from '../isLoading';
import { selectMetaKey } from '../../selectors';

describe('isLoading', () => {
    const cases = [
        {
            dataToRetrieve: () => ({
                reducer1: 'all',
            }),
            props: {
                reducer1: {
                    meta: {
                        isLoading: false,
                        loadedAt: 92834759,
                    },
                },
            },
            result: false,
        },
        {
            dataToRetrieve: () => ({
                reducer1: 'all',
            }),
            props: {
                reducer1: {
                    meta: {
                        isLoading: false,
                        loadedAt: null,
                    },
                },
            },
            result: true,
        },
        {
            dataToRetrieve: () => ({
                reducer1: 'all',
            }),
            props: {
                reducer1: {
                    meta: {
                        isLoading: true,
                        loadedAt: null,
                    },
                },
            },
            result: true,
        },
        {
            dataToRetrieve: () => ({
                reducer1: 'all',
            }),
            props: {
                reducer1: {
                    meta: {
                        isLoading: null,
                        loadedAt: null,
                    },
                },
            },
            result: true,
        },
    ];

    cases.forEach(test => {
        it('should return is component is loading', () => {
            expect(isLoading(test.dataToRetrieve, test.props)).toEqual(
                test.result
            );
        });
    });
});
