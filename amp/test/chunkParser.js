const Parser = require('../lib/Parser');
const ChunkParser = require('../lib/ChunkParser');
const expect = require('chai').expect;

describe('chunk parser', () => {
    it('encode & decode', () => {
        let parser = new Parser({
            mode: 'json'
        });
        let chunkParser = new ChunkParser(parser);
        let msg = ['string', ['array'], {
            json: true
        }];

        let index = 0;
        chunkParser.on('msg', m => {
            expect(m).to.deep.equal(msg[index++]);
        });

        chunkParser.write(parser.encode(msg[0]));
        chunkParser.write(parser.encode(msg[1]));
        chunkParser.write(parser.encode(msg[2]));
    });

    it('encode & decode, stick msg', () => {
        let parser = new Parser({
            mode: 'json'
        });
        let chunkParser = new ChunkParser(parser);
        let msg = ['string', ['array'], {
            json: true
        }];

        let index = 0;
        chunkParser.on('msg', m => {
            expect(m).to.deep.equal(msg[index++]);
        });
        chunkParser.write(Buffer.concat(msg.map(item => parser.encode(item))));
    });

    it('encode & decode, multi msg', () => {
        let parser = new Parser({
            mode: 'json'
        });
        let chunkParser = new ChunkParser(parser);
        let msg = ['string', ['array'], {
            json: true
        }];

        chunkParser.on('msg', (...msgs) => {
            expect(msgs[0]).to.deep.equal(msg[0]);
            expect(msgs[1]).to.deep.equal(msg[1]);
            expect(msgs[2]).to.deep.equal(msg[2]);
        });
        chunkParser.write(parser.encode(...msg));
    });
});