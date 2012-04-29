define( [ "lib/polyfills", "lib/jquery", "lib/jquery-nohtml", "ui" ], function( p, $, nohtml, ui ) {
	var app = new ui.Stack({ parent: "body"	});

	var transitions = [ "slide", "fade", "flip", "zoom" ];

	var ids = "a,b,c,d,e,f,g".split(",");
	var pages = ids.map( function( id, index ) {
		return new ui.Card({
			id: id,
			title: "Page " + id.toUpperCase(),
			children: [
				{ tag: "H1", text: "Page " + id.toUpperCase() },
				new ui.Button({
					label: "<- Prev",
					onclick: function() {
						app.pop();
					}
				}),
				new ui.Button({
					label: "Next ->",
					onclick: function() {
						app.push( pages[ (index + 1) % ids.length ], { method: transitions[ index % transitions.length ] } );
					}
				})
			]
		});
	});

	app.push( pages[0] );
});