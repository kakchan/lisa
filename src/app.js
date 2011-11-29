define( "app", [ "lib/polyfills", "lib/jquery", "lib/jquery-nohtml", "ui" ], function( p, $, nohtml, ui ) {
	var app = new ui.Stack({ parent: "body"	});

	var transitions = [ "slide", "fade", "flip" ];

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

/*
	var splash = new ui.Card({
		id: "splash",
		title: "Splash",
		children: [
			{ tag: "H1", text: "Application Splash Page" },
			new ui.Button({
				label: "Login",
				onclick: function() {
					app.push( hp, { method: "cube" } );
				}
			})
		]
	});

	var hp = new ui.Card({
		id: "hp",
		title: "HomePage",
		children: [
			{ tag: "H1", text: "HomePage" },
			new ui.Button({
				label: "Logout",
				onclick: function() {
					app.pop();
				}
			})
		]
	});
*/
	app.push( pages[0] );
});