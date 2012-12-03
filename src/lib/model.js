define( [ "lib/jquery", "lib/observable" ], function( $, Observable ) {

    return Observable.extend({
        defaults: {
            data: null
        },

        init: function() {
            this._super();
            this._values = $.extend({}, this.config.data);
        },

        set: function(key, value) {
            if (this._values[key] === value) {
                return;
            }
            this._values[key] = value;
            this.fire("change." + key);
        },

        get: function(key) {
            return this._values[key];
        },

        val: function() {
            return $.extend({}, this._values);
        }

    });

});