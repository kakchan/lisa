define( [ "ui/field/AbstractField" ], function( AbstractField ){
	return AbstractField.extend({
		_fieldTemplate: function() { return (
			{ tag: "INPUT", id: this.id("field"), type: "text" }
		); }	
	});
});