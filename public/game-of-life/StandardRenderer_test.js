/// <reference path="Imports/QUnit/qunit.d.ts" />
define([
  "require",
  "exports",
  "Imports/Core/Arrays",
  "StandardRenderer",
  "Imports/Core/TypeChecking",
], function (require, exports, Arrays, StandardRenderer, TypeChecking) {
  var Array2D = Arrays.Array2D;
  var checkDefinedAndNotNullAssert = TypeChecking.checkDefinedAndNotNullAssert;
  /* tslint:enable no-unused-variable*/
  var testClass;
  var method;
  function check(testCase, testBody) {
    test(testClass + "_" + method + "_" + testCase, testBody);
  }
  testClass = "StandardRenderer";
  method = "create";
  check(
    "pointMap when undefined or null",
    checkDefinedAndNotNullAssert("pointMap", function (pointMap) {
      return StandardRenderer.create(pointMap);
    })
  );
  method = "render";
  check("world when undefined or null", function () {
    var r = StandardRenderer.create(new TestPointMap());
    checkDefinedAndNotNullAssert("world", function (world) {
      return r.render(world);
    })();
  });
  check("PointMapCallSequence", function () {
    var pointMap = new TestPointMap();
    var renderer = StandardRenderer.create(pointMap);
    var width = 5;
    var height = 7;
    var scene = new Array2D(height, width, 0);
    for (var row = 0; row < height; row++) {
      for (var column = 0; column < width; column++) {
        scene.set(row, column, row * width + column);
      }
    }
    var drawnPoints = new Array2D(height, width, false);
    renderer.render(scene);
    strictEqual(pointMap.calls.length, 1 + width * height);
    ok(
      pointMap.calls[0].match({
        clear: function () {
          return true;
        },
        drawPoint: function (row, column, value) {
          return false;
        },
      })
    );
    for (var i = 1; i < 1 + width * height; i++) {
      pointMap.calls[i].match({
        clear: function () {
          return ok(false);
        },
        drawPoint: function (row, column, value) {
          strictEqual(value, scene.get(row, column));
          if (drawnPoints.get(row, column)) {
            ok(false);
          } else {
            drawnPoints.set(row, column, true);
          }
        },
      });
    }
  });
  // We refrain from testing that exceptions in the PointMap methods are propagated,
  // since it would take criminal energy to keep them from propagating
  var TestPointMap = (function () {
    function TestPointMap() {
      this.calls = new Array(); // <PointMapCall<number>[]>
    }
    TestPointMap.prototype.clear = function () {
      this.calls.push(new Clear());
    };
    TestPointMap.prototype.drawPoint = function (row, column, value) {
      this.calls.push(new DrawPoint(row, column, value));
    };
    return TestPointMap;
  })();
  var Clear = (function () {
    function Clear() {}
    Clear.prototype.match = function (cases) {
      return cases.clear();
    };
    return Clear;
  })();
  var DrawPoint = (function () {
    function DrawPoint(row, column, value) {
      this.row = row;
      this.column = column;
      this.value = value;
    }
    DrawPoint.prototype.match = function (cases) {
      return cases.drawPoint(this.row, this.column, this.value);
    };
    return DrawPoint;
  })();
});
