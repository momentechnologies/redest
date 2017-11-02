import resetMeta from '../resetMeta';

describe('resetMeta', () => {
    it('should return correct object', () => {
        const param = {
            test: {
                loadedAt: 12352341234,
                someParam: 'test',
            },
        };
        const response = {
            test: {
                loadedAt: false,
                someParam: 'test',
            },
        };

        expect(resetMeta(param)).toEqual(response);
    });
});
