import buildActions from '../buildActions';
import settings from '../../settings';

describe('buildActions', () => {
    it('should return correct props', () => {
        const dataToRetrieve = props => ({
            users: 'all',
        });
        const props = {
            [settings.internalPropPrefix + 'users']: {
                prefix: 'users',
                baseUrl: '/users',
            },
            dispatch: () => {},
        };

        const response = [
            'users_create',
            'users_get',
            'users_getIfNeeded',
            'users_invalidate',
            'users_remove',
            'users_update',
        ].sort();

        expect(Object.keys(buildActions(dataToRetrieve, props)).sort()).toEqual(
            response
        );
    });
});
