import getKeyInfo from '../getKeyInfo';

describe('getKeyInfo', () => {
    it('should return correct object', () => {
        const response = {
            url: '/users',
            prefix: 'users',
            reducer: 'users'
        };

        expect(getKeyInfo('users')).toEqual(response);
    });
});