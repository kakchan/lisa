// simple view for containing other controls
define( [ "lib/jquery", "ui/abstractwidget" ], function( $, AbstractWidget ) {
	return AbstractWidget.extend({
		defaults : {
			title: null,               // name of the card (optional)
			children: [],              // contents of the card
			show: false               // show the contents of the card immediately
		},
		_initModelView: function() {
			this._super();
			this._animation = null;
			this._current = false;
		},
		_initHandlers: function() {
			this.$el.bind("webkitAnimationEnd", this._animEndHandler );
		},
		_initSetup: function() {
			this._super();
			this.config.show && this.show();
		},
		show: function( options ) {
			this._current = true;
			this.$el.addClass("current");
			if( options.zIndex && !options.reverse ) {
				this.$el.css("zIndex", options.zIndex );
			}
			this._anim( options, "in" );
		},
		hide: function( options ) {
			this._current = false;
			this.$el.removeClass( "current" );
			this._anim( options, "out" );
		},
		_anim: function( options, dir ) {
			this._animation && this.$el.removeClass( this._animation ); // can only run one animation at a time
			this._animation = options.method + "-" + ( options.reverse ? "reverse-" : "" ) + dir;
			this.$el
				.removeClass( "none" ).addClass( this._animation );
		},
		_animEndHandler: function( jEv ) {
			this.$el.removeClass( this._animation );
			this._animation = null;
			if(! this._current ) {
				this.$el.addClass( "none" );
			}
		},
		_mainTemplate: function() { return (
			{ tag: 'SECTION', id: this.id(), cls: "uiCard", children: this.config.children }
		); }
	});
});