const modeMap = {
    buffer: 0,
    json: 1,
    string: 2
};

module.exports = class Parser {
    constructor(options = {}) {
        this.version = 1;
        this.offset = 4 + 4;

        this.mode = options.mode || 'json'; // json, string, buffer
    }

    encode(...args) {
        if (this.mode === 'json') {
            args = args.map(item => Buffer.from(JSON.stringify(item)));
        }
        if (this.mode === 'string') {
            args = args.map(item => Buffer.from(item));
        }

        let msgLen = 0;
        for (let i = 0; i < args.length; i++) {
            msgLen += 2 + args[i].length; // each data len used 2-bytes record
        }

        let buf = Buffer.allocUnsafe(this.offset + msgLen);
        buf[0] = this.version;
        buf[1] = modeMap[this.mode];

        buf.writeUInt32BE(msgLen, this.offset - 4);

        let offset = this.offset;
        args.forEach(item => {
            buf.writeUInt16BE(item.length, offset);
            offset += 2;

            item.copy(buf, offset);
            offset += item.length;
        });

        return buf;
    }

    decode(buf) {
        let version = buf.readUInt8(0);
        if (version !== this.version) {
            throw new Error(`version not match, expect, ${this.version} receive ${version}`);
        }

        let expectLength = buf.readUInt32BE(this.offset - 4);
        if ((buf.length - this.offset) !== expectLength) {
            throw new Error(`length mot match, expect ${expectLength} receive ${buf.length - this.offset}`);
        }

        let offset = this.offset;
        let args = [];
        while (offset < buf.length) {
            let len = buf.readUInt16BE(offset);
            offset += 2;

            args.push(buf.slice(offset, offset += len));
        }

        let mode = buf.readUInt8(1);
        if (mode === modeMap['json']) {
            return args.map(item => JSON.parse(item.toString()));
        }

        if (mode === modeMap['string']) {
            return args.map(item => item.toString());
        }

        return args;
    }
};