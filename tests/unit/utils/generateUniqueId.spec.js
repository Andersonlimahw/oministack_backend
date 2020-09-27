// References: https://jestjs.io

const generateUniqueId = require('../../../src/utils/generateUniqueId');
describe('Generate Unique id', () => {
    it('Should generate an unique id', () => {
        const id = generateUniqueId();
        expect(id).toHaveLength(8);
    });
});