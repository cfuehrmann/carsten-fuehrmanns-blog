define(["require", "exports", "./Imports/Core/Sequences"], function (
  require,
  exports,
  Sequences
) {
  /* tslint:enable no-unused-variable*/
  var Start;
  (function (Start) {
    "use strict";
    function getChecked(elementName) {
      var nodeList = document.getElementsByName(elementName);
      return new Sequences.NodeSeq(nodeList)
        .filter(function (n) {
          return n.checked;
        })
        .map(function (n) {
          return n.value;
        })
        .reduceRight(function (previous, current) {
          return current + "," + previous;
        }, "");
    }
    function createWorld() {
      document.location.href =
        "world.html?survival=" +
        getChecked("survivalCondition") +
        "&birth=" +
        getChecked("birthCondition");
    }
    function exec() {
      document.getElementById("createWorld").onclick = createWorld;
    }
    Start.exec = exec;
  })(Start || (Start = {}));
  Start.exec();
});
