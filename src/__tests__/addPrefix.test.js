import addPrefix from '../addPrefix';

describe('addPrefix', () => {
    it('should return is component has errors', () => {
        expect(
            addPrefix('testPrefix', {
                key1: 'key1',
                key2: 'key2',
                key3: 'key3',
            })
        ).toEqual({
            key1: 'testPrefix/key1',
            key2: 'testPrefix/key2',
            key3: 'testPrefix/key3',
        });
    });
});
