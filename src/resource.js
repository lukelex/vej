(function( vej ){
  vej.resource = function resource( name, engine, config, context ){
    context = is( config, "Function" ) ? config : context;
    config = is( config, "Object" ) ? config : {};

    config.allow = function allow( action ){
      if ( !this.only && !this.except ) { return true };

      return (
        ( this.only && this.only.indexOf( action ) !== -1 ) ||
        ( this.except && this.except.indexOf( action ) < 0 )
      );
    };

    var rsc = vej.collection( name, engine, config );

    if ( is( context, "Function" ) ){
      context.call({}, {
        collection: vej.actionBuilder( rsc, engine ),
        member: vej.actionBuilder( rsc(":id"), engine )
      });
    }

    return rsc;
  };

  function is( obj, type ){
    return obj && {}.toString.call(obj) === "[object " + type + "]";
  }
})( window.vej );
