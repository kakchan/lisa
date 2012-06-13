define( function() {
	if( !Function.prototype.bind ) {
		Function.prototype.bind = function bind( obj ) {
		var slice = [].slice,
			args = slice.call(arguments, 1), 
			self = this, 
			nop = function () {}, 
			bound = function () {
				return self.apply( this instanceof nop ? this : ( obj || {} ), args.concat( slice.call(arguments) ) );
			};

			nop.prototype = self.prototype;
			bound.prototype = new nop();
			return bound;
		};
	}

	if( !Array.prototype.remove ) {
		Array.prototype.remove = function remove(value) {
			var i = this.indexOf( value );
			if( i !== -1 ) {
				this.splice( i, 1 );
			}
		};
	}
	
	return true;
});
