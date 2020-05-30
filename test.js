const assert = require('assert');
const colors = require('colors');

describe('file to be tested', () => {
    context('function to be tested', () => {
        before(() => {
            console.log('=====before'.green)
        });
        after(() => {
            console.log('=====after'.green)
        });
        beforeEach(() => {
            console.log('=====beforeEach'.yellow)
        });
        afterEach(() => {
            console.log('=====afterEach'.yellow)
        });


        it('should do something', () => {
            assert.equal(1, 1);
        });
        it('should do something else ', () => {
            assert.deepEqual({name: 'karl'}, {name: 'karl'})
        });
        it('this is a pending test');
    })
});