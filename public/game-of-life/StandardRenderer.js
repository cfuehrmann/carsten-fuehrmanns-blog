define(["require", "exports", "Imports/Core/TypeChecking"], function (
  require,
  exports,
  TypeChecking
) {
  var assertDefinedAndNotNull = TypeChecking.assertDefinedAndNotNull;
  /* tslint:enable no-unused-variable*/
  function create(pointMap) {
    return new StandardRenderer(pointMap);
  }
  exports.create = create;
  var StandardRenderer = (function () {
    function StandardRenderer(pointMap) {
      this.pointMap = pointMap;
      assertDefinedAndNotNull("pointMap", pointMap);
    }
    StandardRenderer.prototype.render = function (world) {
      assertDefinedAndNotNull("world", world);
      this.pointMap.clear();
      for (var row = 0; row < world.height; row++) {
        for (var column = 0; column < world.width; column++) {
          this.pointMap.drawPoint(row, column, world.get(row, column));
        }
      }
    };
    return StandardRenderer;
  })();
});
