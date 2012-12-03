define( [ "ui/abstractwidget/abstractwidget" ], function( AbstractWidget ) {

    return AbstractWidget.extend({
            defaults: {
            model: null,     // the instance of the acx.models.Model controlling the widget's value
            modelField: null // the key of the field within the model that the widget is to update
        },

        init: function() {
            this._super();

            if (this.config.model) {
                this.model = this.config.model;
                if (this.config.modelField) {
                    this.modelField = this.config.modelField;
                    this.model.on("change." + this.modelField, this._updateView.bind(this));
                    this.on("change", this._updateModel.bind(this) );
                    this._updateView();
                }
            }
        },

        val: function() {},

        _updateModel: function() {
            this.model.set(this.modelField, this.val());
        },

        _updateView: function() {
            this.val(this.model.get(this.modelField));
        }
    });

});