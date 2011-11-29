define( [ "lib/jquery", "lib/class" ], function( $, Class ) {
	return Class.extend( (function() {
		var handlersRe = /handler$/i;
		function getObs( type ) {
			return ( this._observers[ type ] || ( this._observers[ type ] = [] ) );
		}
		return {
			init: function() {
				this._observers = {};
				for( var opt in this.config ) { // automatically install observers that are defined in the configuration
					if( opt.indexOf('on') === 0 && $.type( this.config[ opt ] ) === "function" ) {
						this.on( opt.substring( 2 ).toLowerCase(), this.config[ opt ] );
					}
				}
				for( var prop in this ) {       // automatically bind all the event handlers
					if( handlersRe.test( prop ) ) {
						this[ prop ] = this[ prop ].bind( this );
					}
				}
			},
			on: function( type, fn, params, thisp ) { // on: synonymous with addEvent, addObserver, subscribe
				getObs.call( this, type.toLowerCase() ).push( { cb : fn, args : params || [] , cx : thisp || this } );
				return this; // make observable functions chainable
			},
			fire: function( type ) { // fire: synonymous with fireEvent, observe, publish
				var params = Array.prototype.slice.call( arguments, 1 );
				getObs.call( this, type.toLowerCase() ).slice().forEach( function( ob ) {
					ob.cb.apply( ob.cx, ob.args.concat( params ) );
				});
				return this; // make observable functions chainable
			},
			removeAllObservers: function() {
				this.observers = {};
			},
			removeObserver: function( type, fn ) {
				var obs = getObs.call( this, type.toLowerCase() ), index = obs.reduce( function(p, t, i) { return (t.cb === fn) ? i : p }, -1 );
				if( index !== -1 ) {
					obs.splice( index, 1 );
				}
				return this; // make observable functions chainable
			}
		};
	})() );
});