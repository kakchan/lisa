define( [ "ui/stack/stack", "ui/card/card", "ui/button/button", "ui/abstractwidget/abstractwidget", "link!app.css" ], function( Stack, Card, Button, AbstractWidget ) {
	
	return AbstractWidget.extend({
		init: function() {
			var stack = new Stack({ parent: "body"	});

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
								stack.pop();
							}
						}),
						new Button({
							label: "Next ->",
							onclick: function() {
								stack.push( pages[ (index + 1) % ids.length ], { method: transitions[ index % transitions.length ] } );
							}
						})
					]
				});
			});
			
			stack.push( pages[0] );
		}
	});
});