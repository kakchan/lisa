define( [ "lib/polyfills", "lib/jquery", "lib/jquery-nohtml", "ui/stack/stack", "ui/card/card", "ui/button/button" ], function( p, $, nohtml, Stack, Card, Button ) {
		
	loadCss("src/app.css");
	
	var app = new Stack({ parent: "body"	});

	var transitions = [ "slide", "fade", "flip", "zoom" ];

	var ids = "a,b,c,d,e,f,g".split(",");
	var pages = ids.map( function( id, index ) {
		return new Card({
			id: id,
			title: "Page " + id.toUpperCase(),
			children: [
				{ tag: "H1", text: "Page " + id.toUpperCase() },
				new Button({
					label: "<- Prev",
					onclick: function() {
						app.pop();
					}
				}),
				new Button({
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