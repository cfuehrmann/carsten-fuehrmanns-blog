define(["require", "exports", "./Exceptions", "./TypeChecking"], function (
  require,
  exports,
  Exceptions,
  TypeChecking
) {
  var ArgumentException = Exceptions.ArgumentException;
  var assertInt = TypeChecking.assertInt;
  /* tslint:enable no-unused-variable*/
  var Array2D = (function () {
    function Array2D(height, width, initialValue) {
      this.height = height;
      this.width = width;
      assertInt("height", height);
      assertInt("width", width);
      if (width <= 0) {
        throw new ArgumentException("width");
      }
      if (height <= 0) {
        throw new ArgumentException("height");
      }
      this.matrix = [];
      for (var row = 0; row < height; row++) {
        this.matrix[row] = [];
        for (var column = 0; column < width; column++) {
          this.matrix[row][column] = initialValue;
        }
      }
    }
    Array2D.prototype.set = function (row, column, value) {
      assertInt("row", row);
      assertInt("column", column);
      if (row < 0 || row >= this.height) {
        throw new ArgumentException("row");
      }
      if (column < 0 || column >= this.width) {
        throw new ArgumentException("column");
      }
      this.matrix[row][column] = value;
    };
    Array2D.prototype.get = function (row, column) {
      assertInt("row", row);
      assertInt("column", column);
      if (row < 0 || row >= this.height) {
        throw new ArgumentException("row");
      }
      if (column < 0 || column >= this.width) {
        throw new ArgumentException("column");
      }
      return this.matrix[row][column];
    };
    return Array2D;
  })();
  exports.Array2D = Array2D;
});
