define(["require", "exports"], function (require, exports) {
  var ArgumentException = (function () {
    function ArgumentException(argumentName) {
      this.argumentName = argumentName;
      this.argumentName = argumentName;
    }
    ArgumentException.prototype.getArgumentName = function () {
      return this.argumentName;
    };
    ArgumentException.prototype.toString = function () {
      return "The argument '" + this.argumentName + "' is invalid!";
    };
    return ArgumentException;
  })();
  exports.ArgumentException = ArgumentException;
});
