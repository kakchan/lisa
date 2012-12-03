/**
 * base class for all form fields
 * provides validation and returns data for api calls
 * @constructor
 */
define( [ "lib/view" ], function( View ) {
	return View.extend({
		defaults: {
			name : "", 			// (required) - name of the field
			require: false,	// validation requirements (false, true, regexp, function)
			value: "",			// default value
			label: ""				// human readable label of this field
		},
		_initModelView: function() {
			this._super();
			this.label = this.config.label;
			this.require = this.config.require;
			this.name = this.config.name;
			this.$field = $( this._fieldTemplate() );
		},
		_initSetup: function() {
			this._super();
			this.config.value && this._setVal( this.config.value );
		},
		
		val: function( val ) {
			if( val === undefined ) {
				return this._getVal();
			} else {
				return this._setVal( val );
			}
		},
		validate: function() {
			var val = this._getVal(), req = this.require;
			if(req === false) {
				return true;
			} else if(req === true) {
				return val.length > 0;
			} else if(req.test && $.isFunction(req.test)) {
				return req.test(val);
			} else if($.isFunction(req)) {
				return req(val, this);
			}
		},

		_getVal: function() {
			return this.$field.val();
		},
		_setVal: function( val ) {
			return this.$field.val( val );
		},
		_mainTemplate: function() { return (
			{ tag: "DIV", id: this.id(), cls: "uiField", children: [
				{ tag: "LABEL", "for": this.id( "field" ), cls: "uiField-label", children: [
					this.label,
					this._requireTemplate()
				] },
				this.$field
			] }
		); },
		_requireTemplate: function() { return (
			this.require ? { tag: "SPAN", cls: "require", text: "*" } : null
		); }
	});
});
