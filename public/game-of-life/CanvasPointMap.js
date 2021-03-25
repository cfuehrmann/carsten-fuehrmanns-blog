define(["require", "exports"], function (require, exports) {
  /* tslint:enable no-unused-variable*/
  function create(height, width, pointSize) {
    return new CanvasPointMap(height, width, pointSize);
  }
  exports.create = create;
  var CanvasPointMap = (function () {
    function CanvasPointMap(height, width, pointSize) {
      this.height = height;
      this.width = width;
      this.pointSize = pointSize;
      this.canvasElement = document.createElement("canvas");
      this.canvasElement.width = width * pointSize;
      this.canvasElement.height = height * pointSize;
      this.ctx = this.canvasElement.getContext("2d");
      this.ctx.fillStyle =
        "rgb(" + String(0) + ", " + String(0) + ", " + String(0) + ")";
      this.node = this.canvasElement;
    }
    CanvasPointMap.prototype.clear = function () {
      this.ctx.clearRect(
        0,
        0,
        this.width * this.pointSize,
        this.height * this.pointSize
      );
    };
    CanvasPointMap.prototype.drawPoint = function (row, column, value) {
      if (value) {
        this.ctx.fillRect(
          column * this.pointSize,
          row * this.pointSize,
          this.pointSize,
          this.pointSize
        );
      }
    };
    return CanvasPointMap;
  })();
});
