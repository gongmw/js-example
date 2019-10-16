AMP
===

AMP is for encode message to buffer and decode buffer to message.

Examples
--------

### json mode

``` {.javascript}
const amp = require('amp');

let parser = new amp.Parser({
    mode: 'json'
});
let bufferMsgs = parser.encode({
    msg: 'msgA'
}, {
    msg: 'msgB' 
});
let msgs = parser.decode(bufferMsgs);

console.log(msgs); // [{msg:'msgA'}, {msg: 'msgB'}]
```

### string mode

``` {.javascript}
const amp = require('amp');

let parser = new amp.Parser({
    mode: 'string'
});
let bufferMsgs = parser.encode('msgA', 'msgB');
let msgs = parser.decode(bufferMsgs);

console.log(msgs); // ['msgA', 'msgB']
```

### buffer mode

``` {.javascript}
const amp = require('amp');

let parser = new amp.Parser({
    mode: 'buffer'
});
let bufferMsgs = parser.encode(Buffer.from('msgA'), Buffer('msgB'));
let msgs = parser.decode(bufferMsgs);

console.log(msgs); // [<Buffer...>, <Buffer...>]
```

### stream with parser

``` {.javascript}
const amp = require('amp');

let inner = new amp.Parser({
    mode: 'json'
});
let parser = new amp.ChunkParser(inner);

let msgs = ['string', ['array'], {
    json: true
}];

parser.on('msg', msg => {
    console.log(msg); // 'string' ['array'] {json: true}
});
msgs.forEach(item => {
    parser.write(inner.encode(item));
});
```
