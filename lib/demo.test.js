const chai = require('chai')
const expect = chai.expect

const demo  = require('./demo')

describe('demo', () => {
    context('add', () => {
        it('should add 2 numbers', () => {
            expect(demo.add(1, 2)).to.equal(4)
        });
    })
});