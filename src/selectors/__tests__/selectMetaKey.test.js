import selectMetaKey, {
    isAll,
    isMultiple,
    isSingle
} from '../selectMetaKey';

describe('selectMetaKey', () => {
    it('should create the right key', () => {
        const filters = {
            active: true,
            published: true
        };
        const response = 'active_true_published_true';

        expect(selectMetaKey(filters)).toEqual(response);
    });

    it('should create all key', () => {
        expect(selectMetaKey(null)).toEqual('all');
    });

    it('should create all key', () => {
        expect(selectMetaKey('all')).toEqual('all');
    });

    it('should create single key', () => {
        expect(selectMetaKey(1)).toEqual(1);
    });
});

describe('isAll', () => {
    it('should return if a filter is all', () => {
        const tests = [
            {
                filter: 'all',
                response: true
            },
            {
                filter: null,
                response: true
            },
            {
                filter: {
                    'see': true
                },
                response: false
            },
            {
                filter: 1,
                response: false
            }
        ];

        tests.forEach((test) => {
            expect(isAll(test.filter)).toEqual(test.response);
        });
    });
});

describe('isMultiple', () => {
    it('should return if a filter is multiple', () => {
        const tests = [
            {
                filter: 'all',
                response: true
            },
            {
                filter: null,
                response: true
            },
            {
                filter: {
                    'see': true
                },
                response: true
            },
            {
                filter: 1,
                response: false
            }
        ];

        tests.forEach((test) => {
            expect(isMultiple(test.filter)).toEqual(test.response);
        });
    });
});

describe('isSingle', () => {
    it('should return if a filter is single', () => {
        const tests = [
            {
                filter: 'all',
                response: false
            },
            {
                filter: null,
                response: false
            },
            {
                filter: {
                    'see': true
                },
                response: false
            },
            {
                filter: 1,
                response: true
            }
        ];

        tests.forEach((test) => {
            expect(isSingle(test.filter)).toEqual(test.response);
        });
    });
});