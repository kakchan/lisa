// simple view for containing pages
define( [ "lib/jquery", "ui/abstractwidget" ], function( $, AbstractWidget ) {
	return AbstractWidget.extend({
		defaults : {
			show: null
		},
		_initModelView: function() {
			this._super();
			this._stack = [];
			this._animCounter = 0;
		},
		_initSetup: function() {
			this._super();
			this.config.show && this.push( this.config.show );
		},
		push: function( card, options ) {
			options = options || {};
			card.attach( this.$el );
			this._navigate( card, this._topCard(), options );
			this._stack.push({ card: card, options: options });
		},
		pop: function() {
			var out = this._stack.pop();
			this._navigate( this._topCard(), out.card, out.options, true );
		},
		_navigate: function( cardIn, cardOut, options, reverse ) {
			options = $.extend( { method: "fade" }, options, { zIndex: ++this._animCounter } );
			options.reverse = !reverse != !options.reverse; // XOR
			cardOut && cardOut.hide( options );
			cardIn && cardIn.show( options );
		},
		_topCard: function() {
			return this._stack.length ? this._stack[ this._stack.length - 1 ].card : null;
		},
		_mainTemplate: function() { return (
			{ tag: 'DIV', id: this.id(), cls: "uiStack", children: this.config.children }
		); }
	});
});