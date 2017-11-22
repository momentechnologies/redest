import buildReducerActions from '../buildReducerActions';

describe('buildReducerActions', () => {
    it('should return correct object', () => {
        const response = {
            url: '/users',
            prefix: 'users',
            reducer: 'users',
        };

        expect(
            Object.keys(
                buildReducerActions({
                    reducer: 'test',
                })
            )
        ).toEqual([
            'getIfNeeded',
            'get',
            'create',
            'update',
            'remove',
            'invalidate',
        ]);
    });
});
