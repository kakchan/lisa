define( [ "lib/observable" ], function( Observable ) {
 	return Observable.extend({
		defaults: {
			key: null,     // either the name of a field, or a function which generates the unique key
			items: null,   // array of all items
			keys: null     // map keys -> array index
		},

		init: function() {
			this._super();
			if( typeof this.config.key === 'string' ) {
				this._keyFn = ( function( kf ) { return function( v ) { return v[ kf ]; }; })( this.config.key );
			} else {
				this._keyFn = this.config.key;
			}
			this._initItems( this.config );
		},
		length: function() {
			return this._items.length;
		},
		get: function( k ) {
			return this._items[ this._keys[ k ] ];
		},
		getAll: function() {
			return this.slice();
		},
		eq: function( i ) {
			return this._items[ i || 0 ]
		},
		filter: function( iterator ) {
			return this._items.filter( iterator );
		},
		put: function( v ) {
			var key = this._keyFn( v );
			if( key in this._keys ) {
				this._items[ this._keys [ key ] ] = v;
			} else {
				this._keys[ key ] = ( this._items.push( v ) - 1 );
			}
			return this;
		},
		putAll: function( list ) {
			list.forEach( this.put,  this );
			return this;
		},
		remove: function( v ) {
			var key = this._keyFn( v );
			var index = this._keys[ key ];
			this._items.splice( index, 1 );
			delete this._keys[ key ];
			for( var key in this._keys ) {
				if( this._keys[key] > index ) {
					this._keys[key] -= 1;
				}
			}
			return this;
		},
		_initItems: function( obj ) {
			this._items = obj.items || [];
			// all non-mutating iterators from Array.prototype
			["contains", "filter", "forEach", "indexOf", "map", "reduce", "slice"].forEach(function(name) {
				this[ name ] = Array.prototype[ name ].bind( this._items );
			}, this);
			this._keys = obj.keys || this._genKeys();
		},
		_genKeys: function() {
			var keys = {}, key = this._keyFn;
			this.forEach( function( item, index ) {	keys[ key( item ) ] = index; });
			return keys;
	  }	});
});
