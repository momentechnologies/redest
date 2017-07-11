import selectMetaKey from '../selectMetaKey';

test('"selectMetaKey" creates the right key', () => {
    const filters = {
        active: true,
        published: true
    };

    const response = 'active_true_published_true';

    expect(selectMetaKey(filters)).toEqual(response);
});

test('"selectMetaKey" creates all key', () => {
    const filters = null;

    const response = 'all';

    expect(selectMetaKey(filters)).toEqual(response);
});