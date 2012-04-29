define( [ "data/collection" ], function( Collection ) {
	return Collection.extend({
		defaults: {
			key: "name"
		},
		validate: function() {
			return this.reduce( function( r, field ) {
				return r && field.validate();
			}, true);
		},
		getData: function() {
			return this.reduce( function( r, field ) {
				r[ field.name ] = field.val(); return r;
			}, {});
		}
		
	});
});