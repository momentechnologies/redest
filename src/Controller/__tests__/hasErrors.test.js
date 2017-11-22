import hasErrors from '../hasErrors';
import { selectMetaKey } from '../../selectors';

describe('hasErrors', () => {
    const cases = [
        {
            dataToRetrieve: () => ({
                reducer1: 'all',
            }),
            props: {
                reducer1: {
                    meta: {
                        error: 'smth',
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
                        error: null,
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
                        error: false,
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
                        error: 0,
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
                        error: {},
                    },
                },
            },
            result: true,
        },
    ];

    cases.forEach(test => {
        it('should return is component has errors', () => {
            expect(hasErrors(test.dataToRetrieve, test.props)).toEqual(
                test.result
            );
        });
    });
});
