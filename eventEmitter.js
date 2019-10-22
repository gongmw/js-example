
class EventEmitter {
    constructor() {
        this.handlers = {};
    }

    on(evtName, handler) {
        if (!(evtName in this.handlers)) {
            this.handlers[evtName] = [];
        }

        this.handlers[evtName].push(handler);
    }

    emit(evtName, data) {
        if (Array.isArray(this.handlers[evtName])) {
            this.handlers[evtName].forEach(handler => handler.apply(this, [data]));
        } else {
            console.warn(`trying to emit an event ${evtName}, but no handler found!`);
        }
    }

    off(evtName, handler) {
        if (Array.isArray(this.handlers[evtName])) {
            this.handlers[evtName] = this.handlers[evtName].filter(h => {
                h !== handler;
            });
        } else {
            console.warn(`trying to off an event ${evtName}, but no handler found!`);
        }
    }
}
