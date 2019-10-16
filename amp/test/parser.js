const Parser = require('../lib/Parser');
const expect = require('chai').expect;

describe('parser', () => {
    it('encode & decode, json mode', () => {
        let parser = new Parser({
            mode: 'json'
        });
        let msg = {
            json: true
        };

        let encode = parser.encode(msg);
        expect(encode).to.be.an.instanceof(Buffer);
        expect(encode.length).to.not.be.equal(0);

        let [decode] = parser.decode(encode);
        expect(decode).to.deep.equal(msg);
    });

    it('encode & decode, string mode', () => {
        let parser = new Parser({
            mode: 'string'
        });
        let msg = 'string';

        let encode = parser.encode(msg);
        expect(encode).to.be.an.instanceof(Buffer);
        expect(encode.length).to.not.be.equal(0);

        let [decode] = parser.decode(encode);
        expect(decode).to.deep.equal(msg);
    });

    it('encode & decode, buffer mode', () => {
        let parser = new Parser({
            mode: 'buffer'
        });
        let msg = Buffer.from('buffer');

        let encode = parser.encode(msg);
        expect(encode).to.be.an.instanceof(Buffer);
        expect(encode.length).to.not.be.equal(0);

        let [decode] = parser.decode(encode);
        expect(decode).to.be.an.instanceof(Buffer);
        expect(decode.toString()).to.deep.equal(msg.toString());
    });

    it('encode & decode, multi msg', () => {
        let parser = new Parser({
            mode: 'json'
        });

        let msg = ['string', ['array'], {
            json: true
        }];

        let encode = parser.encode(...msg);
        expect(encode).to.be.an.instanceof(Buffer);
        expect(encode.length).to.not.be.equal(0);

        let [msg1, msg2, msg3] = parser.decode(encode);
        expect(msg1).to.be.equal(msg[0]);
        expect(msg2).to.deep.equal(msg[1]);
        expect(msg3).to.deep.equal(msg[2]);
    });
});