import buildPropsForComponent from '../buildPropsForComponent';
import buildActions from '../buildActions';
import settings from '../../settings';

describe('buildPropsForComponent', () => {
    it('should return correct props', () => {
        const dataToRetrieve = (props) => ({
            users: 'all'
        });
        const response = {
            test: 'hello',
            test2311: {
                'aa': []
            },
            dispatch: () => {},
            ...buildActions(dataToRetrieve, { dispatch: () => {}})
        };

        const props = {
            [settings.internalPropPrefix + 'users']: 'shouldBeGone',
            [settings.internalPropPrefix]: 'shouldBeGone',
            ...response
        };

        const responseKeys = Object.keys(response).sort();

        expect(Object.keys(buildPropsForComponent(dataToRetrieve, props)).sort()).toEqual(responseKeys);
    });
});
