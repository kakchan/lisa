// simple view for containing other controls
define( [ "lib/jquery", "ui/abstractwidget" ], function( $, AbstractWidget ) {
	return AbstractWidget.extend({
		defaults : {
			title: null,               // name of the card (optional)
			children: [],              // contents of the card
			show: false,               // show the contents of the card immediately
		},
		_initModelView: function() {
			this._super();
			this._animCallbacks = [];
		},
		_initHandlers: function() {
			this._super();
			this.$el.bind("webkitAnimationEnd", this._animEndHandler );
		},
		_initSetup: function() {
			this._super();
			this.config.show && this.show();
		},
		show: function( options ) {
			this.$el.addClass("current");
			if( options.zIndex && !options.reverse ) {
				this.$el.css("zIndex", options.zIndex );
			}
			this._anim( options, "in" );
		},
		hide: function( options ) {
			this.$el.removeClass("current");
			this._anim( options, "out" );
		},
		_anim: function( options, dir ) {
			this.$el
				.removeClass( "none in out reverse" )
				.addClass( [ dir, options.method, options.reverse ? "reverse" : "", dir === "in" ? "current" : "" ].join(" ") );
			this._animCallbacks.push( this._animEndCallback.bind( this, this.$el, options ));
		},
		_animEndCallback: function( el, options, jEv ) {
			this.$el.removeClass( options.method ).removeClass( "in out reverse" );
			if(! el.hasClass("current") && this._animCallbacks.length === 0 ) {
				this.$el.addClass( "none" );
			}
		},
		_animEndHandler: function( jEv ) {
			this._animCallbacks.pop()( jEv );
		},
		_mainTemplate: function() { return (
			{ tag: 'SECTION', id: this.id(), cls: "uiCard", children: this.config.children }
		); }
	});
});