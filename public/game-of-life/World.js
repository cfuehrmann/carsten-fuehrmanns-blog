define([
  "require",
  "exports",
  "./Imports/Core/Arrays",
  "./StandardRenderer",
  "./CanvasPointMap",
  "./StandardTransformer",
], function (
  require,
  exports,
  Arrays,
  StandardRenderer,
  CanvasPointMap,
  StandardTransformer
) {
  var Array2D = Arrays.Array2D;
  /* tslint:enable no-unused-variable*/
  var Main;
  (function (Main) {
    "use strict";
    function getParts(parameters, parameterName) {
      return parameters
        .filter(function (p) {
          return p.name === parameterName;
        })[0]
        .value.split(",")
        .slice(0, -1)
        .map(function (v) {
          return parseInt(v, 10);
        });
    }
    function getParameter(s) {
      var nv = s.split("=");
      return { name: nv[0], value: nv[1] };
    }
    function getParameters(queryString) {
      return queryString.substr(1).split("&").map(getParameter);
    }
    function exec() {
      var parameters = getParameters(location.search);
      var survival = getParts(parameters, "survival");
      var birth = getParts(parameters, "birth");
      var width = Math.floor(window.innerWidth / 2) - 12;
      var height = Math.floor(window.innerHeight / 2) - 12;
      var pointMap = CanvasPointMap.create(height, width, 2);
      document.getElementById("content").appendChild(pointMap.node);
      var renderer = StandardRenderer.create(pointMap);
      var currentWorld = new Array2D(height, width, false);
      var nextWorld = new Array2D(height, width, false);
      for (var row = 0; row < height; row++) {
        for (var column = 0; column < width; column++) {
          currentWorld.set(row, column, Math.random() < 0.5001);
        }
      }
      var transformer = StandardTransformer.create(survival, birth);
      var i = 0;
      setInterval(function () {
        renderer.render(currentWorld);
        transformer.transform(currentWorld, nextWorld);
        var h = currentWorld;
        currentWorld = nextWorld;
        nextWorld = h;
        i++;
      }, 50);
    }
    Main.exec = exec;
  })(Main || (Main = {}));
  Main.exec();
});
