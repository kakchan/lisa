(function() {
	var name = "ui",
			mods = [ "Observable", "AbstractWidget", "Button", "Card", "Stack" ];
	
	define( mods.map( function( mod ) { return name + "/" + mod.toLowerCase(); }), function() {
		var lib = {}, args = arguments;
		mods.forEach( function( mod, i ) {
			lib[mod] = args[i];
		});
		return lib;
	});
})();
