define(["require", "exports"], function (require, exports) {
  var ArraySeq = (function () {
    function ArraySeq(seq) {
      this.seq = seq;
    }
    ArraySeq.prototype.filter = function (condition) {
      return new ArraySeq(this.seq.filter(condition));
    };
    ArraySeq.prototype.map = function (transform) {
      return new ArraySeq(this.seq.map(transform));
    };
    ArraySeq.prototype.reduceRight = function (f, initialValue) {
      return this.seq.reduceRight(f, initialValue);
      // todo: deal properly with the case when there is no initial value
    };
    return ArraySeq;
  })();
  exports.ArraySeq = ArraySeq;
  var NodeSeq = (function () {
    function NodeSeq(seq) {
      this.seq = seq;
    }
    NodeSeq.prototype.filter = function (condition) {
      return new ArraySeq(Array.prototype.filter.call(this.seq, condition));
    };
    NodeSeq.prototype.map = function (transform) {
      return new ArraySeq(Array.prototype.map.call(this.seq, transform));
    };
    NodeSeq.prototype.reduceRight = function (f, initialValue) {
      return Array.prototype.reduceRight.call(this.seq, f, initialValue);
      // todo: deal properly with the case when there is no initial value
    };
    return NodeSeq;
  })();
  exports.NodeSeq = NodeSeq;
});
