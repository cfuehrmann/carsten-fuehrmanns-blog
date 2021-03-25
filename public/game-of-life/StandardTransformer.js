define([
  "require",
  "exports",
  "./Imports/Core/Numbers",
  "Imports/Core/TypeChecking",
], function (require, exports, Numbers, TypeChecking) {
  var assertDefinedAndNotNull = TypeChecking.assertDefinedAndNotNull;
  /* tslint:enable no-unused-variable*/
  function create(survivalCondition, birthCondition) {
    assertDefinedAndNotNull("survivalCondition", survivalCondition);
    assertDefinedAndNotNull("birthCondition", birthCondition);
    return new StandardTransformer(survivalCondition, birthCondition);
  }
  exports.create = create;
  var StandardTransformer = (function () {
    function StandardTransformer(survivalCondition, birthCondition) {
      this.survivalCondition = survivalCondition;
      this.birthCondition = birthCondition;
    }
    StandardTransformer.prototype.transform = function (
      currentWorld,
      nextWorld
    ) {
      var w = currentWorld.width;
      var h = currentWorld.height;
      for (var column = 0; column < w; column++) {
        for (var row = 0; row < h; row++) {
          nextWorld.set(row, column, this.nextValue(currentWorld, row, column));
        }
      }
    };
    StandardTransformer.prototype.nextValue = function (world, row, column) {
      var up = Numbers.mod(row - 1, world.height);
      var right = Numbers.mod(column + 1, world.width);
      var down = Numbers.mod(row + 1, world.height);
      var left = Numbers.mod(column - 1, world.width);
      var count =
        (world.get(up, column) ? 1 : 0) +
        (world.get(up, right) ? 1 : 0) +
        (world.get(row, right) ? 1 : 0) +
        (world.get(down, right) ? 1 : 0) +
        (world.get(down, column) ? 1 : 0) +
        (world.get(down, left) ? 1 : 0) +
        (world.get(row, left) ? 1 : 0) +
        (world.get(up, left) ? 1 : 0);
      return world.get(row, column)
        ? this.survivalCondition.indexOf(count) >= 0
        : this.birthCondition.indexOf(count) >= 0;
    };
    return StandardTransformer;
  })();
});
