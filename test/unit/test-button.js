suite( "TopNavTest", function() {
	setup( function() {
		this.button1 = new Button( {
			label: "Button 1"
		} );

		this.button2 = new Button( {
			label: "Button 2",
			disabled: true
		} );
	} );

	teardown( function() {
		delete this.button1;
	} );

	suite( '#instantiation', function() {
		test( "Button existence", function() {
			expect( Button ).to.be.an( Object );
		} );

		test( "disabled is 'false' by default", function() {
			expect( this.button1.disabled ).to.be( false );
		} );

		test( "disabled is 'true' when the disabled option is set to true", function() {
			expect( this.button2.disabled ).to.be( true );
		} );
	} );

	suite( "#methods", function() {
		test( "Button.disable()", function() {
			var eventFired = false;
			this.button1.on( "disable", function() { eventFired = true; });
			expect( eventFired ).to.be( false );
			this.button1.disable();
			expect( eventFired ).to.be( true );
			expect( this.button1.disabled ).to.be( true );
		});

		test("Button.enable()", function() {
			var eventFired = false;
			this.button2.on( "enable", function() { eventFired = true; });
			this.button2.enable();
			expect( eventFired ).to.be( true );
			expect( this.button2.disabled ).to.be( false );
		});
	} );

	suite( '#events', function() {
		test( "Button click event", function() {
			var eventFired = false;
			this.button1.on( "click", function() { eventFired = true; } );
			expect( eventFired ).to.be( false );
			this.button1.$el.trigger( "click" );
			expect( eventFired ).to.be( true );
		} )
	} );
} );