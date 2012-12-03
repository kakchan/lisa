define( [ "../fields/abstractfield" ], function( AbstractField ){
	return AbstractField.extend({
		init: function() {
			this._super();

			this.lastChange = "";
			this.lastEdit = "";
		},
		_initHandlers: function() {
			this._super();

			this.$field.on("blur", this._blur_handler);
		},
		_blur_handler: function(jEv) {
			if(this.lastChange !== this.$field.val()) {
				this.fire("change", this, { lastVal: this.lastChange, jEv: jEv });
				this.lastChange = this.$field.val();
			}
		},
		_fieldTemplate: function() { return (
			{ tag: "INPUT", id: this.id("field"), type: "text" }
		); }
	});
});