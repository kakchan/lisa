(function() {
	var name = "fields",
			mods = [ "AbstractField", "TextField" ];
	
	define( mods.map( function( mod ) { return name + "/" + mod.toLowerCase(); }), function() {
		var lib = {}, args = arguments;
		mods.forEach( function( mod, i ) {
			lib[mod] = args[i];
		});
		return lib;
	});
})();
