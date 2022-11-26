const EventEmitter = require('events');

class Emitter extends EventEmitter {

    static #emitter = null;

    static get() {
        if(!this.#emitter) this.#emitter = new EventEmitter()
        return this.#emitter
    }
}

module.exports = { Emitter }