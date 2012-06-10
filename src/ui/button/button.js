define( [ "ui/abstractwidget/abstractwidget" ], function( AbstractWidget ) {
	return AbstractWidget.extend({
		defaults : {
			label: "",                // text of the button
			disabled: false           // create a disabled button
		},

		_initModelView: function() {
			this._super();
			this.disabled = this.config.disabled;
		},
		_initSetup: function() {
			this._super();
			this.disabled && this.disable();
		},
		disable: function( disable ) {
			disable = disable !== false;
			if( this.disabled !== disable ) {
				this.disabled = disable;
				this.$el.toggleClass( "disabled", this.disabled );
				this.fire( this.disabled ? "disable" : "enable", this );
			}
		},
		enable: function() {
			this.disable( false );
		},
		_clickHandler: function( jEv ) {
			if( ! this.disabled ) {
				this.fire( "click", this, { jEv: jEv } );
			}
		},
		_mainTemplate: function() { return (
			{ tag: 'BUTTON', type: 'button', id: this.id(), cls: "uiButton uxBorder-all", onclick: this._clickHandler, children: [
				{ tag: 'SPAN', cls: "label", text: this.config.label }
			] }
		); }
	});
});