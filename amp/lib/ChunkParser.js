const EventEmit = require('events');

module.exports = class ChunkParser extends EventEmit {
    constructor(parser) {
        super();

        this.parser = parser;
        this.version = this.parser.version;
        this.offset = this.parser.offset;

        this._buffers = [];
        this._remaining = 0;
    }

    write(chunk) { // chunk complete will emit msg 
        for (let i = 0; i < chunk.length; i++) {
            let buffers = this._buffers;

            if (buffers.length < this.offset) {
                buffers.push(chunk.slice(i, i + 1)); // header frame, [version:1, ctl:3, len:4]
                continue;
            }

            if (buffers.length === this.offset) {
                let buffer = Buffer.concat(this._buffers);

                let version = buffer.readUInt8(0);
                if (version !== this.version) {
                    this._buffers = [];
                    this._remaining = 0;
                    throw new Error(`unsupport version:${version}, expect:${this.version}`);
                }

                this._remaining = buffer.readUInt32BE(this.offset - 4); // remaining bytes to copy from chunk
            }

            let pos = Math.min(this._remaining + i, chunk.length);
            let part = chunk.slice(i, pos);

            buffers.push(part);
            this._remaining -= part.length;
            if (this._remaining === 0) {
                this._buffers = [];
                this.emit('msg', ...(this.parser.decode(Buffer.concat(buffers))));
            }

            i += part.length - 1;
        }
    }
};