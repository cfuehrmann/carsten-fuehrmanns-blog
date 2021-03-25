define(["require", "exports", "./Exceptions", "./TypeChecking"], function (
  require,
  exports,
  Exceptions,
  TypeChecking
) {
  var ArgumentException = Exceptions.ArgumentException;
  var assertReal = TypeChecking.assertReal;
  /* tslint:enable no-unused-variable*/
  function mod(numerator, denominator) {
    assertReal("numerator", numerator);
    assertReal("denominator", denominator);
    if (denominator === 0) {
      throw new ArgumentException("denominator");
    }
    var ad = Math.abs(denominator);
    return ((numerator % ad) + ad) % ad;
  }
  exports.mod = mod;
});
