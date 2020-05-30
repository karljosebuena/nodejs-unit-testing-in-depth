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
            console.log('END:', process.env.NODE_ENV)

            if(process.env.NODE_ENV === 'development') {
                console.log('DEVELOPMENT MODE')
            }
        });
        it('should do something else ', () => {
            assert.deepEqual({name: 'karl'}, {name: 'karl'})
        });
        it('this is a pending test');
    });

    context('another function to be tested', () => {
        it('another pending test');
    });
});