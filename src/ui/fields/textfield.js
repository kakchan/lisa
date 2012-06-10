define( [ "ui/field/abstractfield/abstractfield" ], function( AbstractField ){
	return AbstractField.extend({
		_fieldTemplate: function() { return (
			{ tag: "INPUT", id: this.id("field"), type: "text" }
		); }
	});
});