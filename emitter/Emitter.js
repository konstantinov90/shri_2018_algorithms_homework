class Emitter {
    constructor() {
        this.eventHandlersMap = new Map();
    }

    on(event, handler) {
        let handlers = this.eventHandlersMap.get(event);
        if (!handlers) {
            handlers = [];
            this.eventHandlersMap.set(event, handlers);
        }
        handlers.push(handler);
    }
    
    off(event, handler) {
        const handlers = this.eventHandlersMap.get(event);
        if (!handlers) {
            return;
        }
        const idx = handlers.indexOf(handler);
        if (idx === -1) {
            return;
        }
        const newHandlers = [...handlers.slice(0, idx), ...handlers.slice(idx + 1, handlers.length), ];
        this.eventHandlersMap.set(event, newHandlers);
    }
    
    emit(event) {
        const handlers = this.eventHandlersMap.get(event);
        if (!handlers) {
            return;
        }

        let promise = Promise.resolve();
        for (const handler of handlers) {
            promise = promise.then(() => handler());
        }

        return promise;
    }
 }
 
module.exports = Emitter;
 