import selectMetaKey, { isAll, isMultiple, isSingle } from '../selectMetaKey';

describe('selectMetaKey', () => {
    it('should create the right key', () => {
        const info = {
            filter: {
                active: true,
                published: true,
            },
            endpoint: '/test',
        };
        const response = '/test_active_true_published_true_';

        expect(selectMetaKey(info)).toEqual(response);
    });

    it('should create all key', () => {
        expect(selectMetaKey({ filter: null })).toEqual('_all_');
    });

    it('should create all key', () => {
        expect(selectMetaKey('all')).toEqual('_all_');
    });

    it('should create single key', () => {
        expect(
            selectMetaKey({
                filter: 1,
            })
        ).toEqual('_1_');
    });
});

describe('isAll', () => {
    it('should return if a filter is all', () => {
        const tests = [
            {
                filter: 'all',
                response: true,
            },
            {
                filter: null,
                response: true,
            },
            {
                filter: {
                    see: true,
                },
                response: false,
            },
            {
                filter: 1,
                response: false,
            },
        ];

        tests.forEach(test => {
            expect(isAll(test.filter)).toEqual(test.response);
        });
    });
});

describe('isMultiple', () => {
    it('should return if a filter is multiple', () => {
        const tests = [
            {
                filter: 'all',
                response: true,
            },
            {
                filter: null,
                response: true,
            },
            {
                filter: {
                    see: true,
                },
                response: true,
            },
            {
                filter: 1,
                response: false,
            },
        ];

        tests.forEach(test => {
            expect(isMultiple(test.filter)).toEqual(test.response);
        });
    });
});

describe('isSingle', () => {
    it('should return if a filter is single', () => {
        const tests = [
            {
                filter: 'all',
                response: false,
            },
            {
                filter: null,
                response: false,
            },
            {
                filter: {
                    see: true,
                },
                response: false,
            },
            {
                filter: 1,
                response: true,
            },
        ];

        tests.forEach(test => {
            expect(isSingle(test.filter)).toEqual(test.response);
        });
    });
});
