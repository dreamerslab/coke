var e = require( 'events' ).EventEmitter;

global.HOOK = new e;

HOOK.setMaxListeners( 51200 );