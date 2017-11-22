import loopDataToRetrieve from '../loopDataToRetrive';
import { selectMetaKey } from '../../selectors';

const setInfo = info => {
    return {
        endpoint: '/' + info.reducer,
        reducer: info.reducer,
        raw: false,
        filter: null,
        onlyActions: false,
        onlyPagination: false,
        pagination: null,
        selector: null,
        ...info,
    };
};

describe('loopDataToRetrieve', () => {
    const cases = [
        {
            dataToRetrieve: () => ({
                reducer1: 'all',
            }),
            props: {},
            result: [
                setInfo({
                    reducer: 'reducer1',
                    filter: 'all',
                }),
            ],
        },
        {
            dataToRetrieve: () => ({
                reducer2: {
                    onlyActions: true,
                },
            }),
            props: {},
            result: [
                setInfo({
                    reducer: 'reducer2',
                    onlyActions: true,
                }),
            ],
        },
    ];

    cases.forEach(test => {
        it('should return the correct info structure', () => {
            let result = [];
            loopDataToRetrieve(test.dataToRetrieve, {}, info =>
                result.push(info)
            );
            expect(result).toEqual(test.result);
        });
    });
});
