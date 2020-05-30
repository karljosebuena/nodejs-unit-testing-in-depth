const chai = require('chai')
const expect = chai.expect

describe('chai test', () => {
    it('should compare some values', () => {
        expect(1).to.equal(1)
    })
    it('should test some other stuff', () => {
        expect({name: 'karl'}).to.deep.equal({name: 'karl'})
        expect({name: 'karl'}).to.have.property('name').to.equal('karl')
        expect(1 > 2).to.be.false;
        expect({}).to.be.a('object')
        expect('karl').to.be.a('string')
        expect(3).to.be.a('number')
        expect('karl').to.be.a('string').with.lengthOf(4)
        expect([1,2,3].length).to.equal(3)
        expect(null).to.be.null
        expect(undefined).to.not.exist
        expect(1).to.exist
    })
})
