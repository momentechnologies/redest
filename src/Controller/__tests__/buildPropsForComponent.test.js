import buildPropsForComponent from '../buildPropsForComponent';
import { getSettings } from '../../settings';

describe('buildPropsForComponent', () => {
    it('should return correct props', () => {
        const dataToRetrieve = props => ({
            users: 'all',
        });
        const response = {
            test: 'hello',
            test2311: {
                aa: [],
            },
            dispatch: () => {},
        };

        const props = {
            [getSettings().internalPropPrefix + 'users']: 'shouldBeGone',
            [getSettings().internalPropPrefix]: 'shouldBeGone',
            ...response,
        };

        const responseKeys = Object.keys(response).sort();

        expect(
            Object.keys(buildPropsForComponent(dataToRetrieve, props)).sort()
        ).toEqual(responseKeys);
    });
});
