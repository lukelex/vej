window.vej.member = function member( path, engine ){
  var member = {};

  member.detail = window.vej.route({
    path: path,
    action: "get"
  }, engine );

  member.delete = window.vej.route({
    path: path,
    action: "delete"
  }, engine );

  member.update = window.vej.route({
    path: path,
    action: "patch"
  }, engine );

  return member;
}
