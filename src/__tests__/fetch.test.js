import axios from 'axios';

describe('fetch', () => {
    test('should return is component has errors', () => {
        jest.mock('axios', () => {
            return jest.fn(setup => {
                return Promise.resolve({ data: 'test', status: 200 });
            });
        });

        const fetch = require('../fetch').default;

        return Promise.all([fetch('/api/status')]).then(success => {
            expect(success).toEqual(['test']);
            expect(require('axios').mock.calls.length).toEqual(1);
        });
    });
});
