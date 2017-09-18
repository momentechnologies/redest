import selectMetaKey from '../selectMetaKey';

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