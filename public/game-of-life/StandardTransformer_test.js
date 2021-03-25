/// <reference path="Imports/QUnit/qunit.d.ts" />
define([
  "require",
  "exports",
  "StandardTransformer",
  "Imports/Core/TypeChecking",
], function (require, exports, StandardTransformer, TypeChecking) {
  var checkDefinedAndNotNullAssert = TypeChecking.checkDefinedAndNotNullAssert;
  /* tslint:enable no-unused-variable*/
  var testClass;
  var method;
  function check(testCase, testBody) {
    test(testClass + "_" + method + "_" + testCase, testBody);
  }
  testClass = "StandardTransformer";
  method = "create";
  check(
    "survivalCondition when undefined or null",
    checkDefinedAndNotNullAssert(
      "survivalCondition",
      function (survivalCondition) {
        return StandardTransformer.create(survivalCondition, [0]);
      }
    )
  );
  check(
    "birthCondition when undefined or null",
    checkDefinedAndNotNullAssert("birthCondition", function (birthCondition) {
      return StandardTransformer.create([0], birthCondition);
    })
  );
});
// in principle, there should be more tests here
