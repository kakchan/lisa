define( [ "lib/jquery", "lib/observable" ], function( $, Observable ){
	return Observable.extend({
		defaults : {
			id: null,     // the id of the widget
			parent: null  // parent to attach the widget to
		},

		init: function() {
			this._super();
			this._initModelView();
			this.$el = $( this._mainTemplate() );
			this._initHandlers();
			this.attach( this.config.parent );
			this._initSetup();
		},
		_initModelView: $.noop,
		_initHandlers: function() {
			this.$el.bind( "remove", this._destroyHandler );
		},
		_initSetup: $.noop,
		id: function( suffix ) {
			return this.config.id ? (this.config.id + (suffix ? "-" + suffix : "")) : undefined;
		},
		attach: function( target, method ) {
			target && this.$el && this.$el[ method || "appendTo" ]( target );
			return this;
		},
		remove: function() {
			this.$el.remove();
			return this;
		},
		_destroyHandler: function() {
			this.fire("destroy", this);
			this.removeAllObservers();
			this.$el.remove();
			delete this.$el;
		}
	});
});