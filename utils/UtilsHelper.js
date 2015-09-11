/* jshint bitwise: false, camelcase: true, curly: true, eqeqeq: true, globals: false, freeze: true, immed: true, nocomma: true, newcap: true, noempty: true, nonbsp: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, latedef: true */

/* globals module */

// Declare the module
var UtilsHelper = UtilsHelper || (function () {
    "use strict";

    // Create the main object that will be imported
    var trueUtilsHelper = trueUtilsHelper || {};

    trueUtilsHelper.validarUsuario = function (usuario) {
        var expregLetras = new RegExp("^[A-Z]{2}$");
        var expregNumeros = new RegExp("^[0-9]{8}$");
        var letras = usuario.substring(0, 2);
        var numeros = usuario.substring(2, 10);

        if ((!expregLetras.test(letras)) || (!expregNumeros.test(numeros))) {
            return false;
        }

        return true;
    };

    // Check if the object has a property, if so returns false
    trueUtilsHelper.isEmptyObject = function (object) {
        for (var property in object) {
            if (object.hasOwnProperty(property)) {
                return false;
            }
        }

        return true;
    };

    // Check if a variable is empty, null, undefined or blank .
    trueUtilsHelper.isEmpty = function (variable) {
        return (variable === null || typeof variable === "undefined" || variable === "" || variable === {} || trueUtilsHelper.isEmptyObject(variable));
    };

    // Check if the string has the same length passed as parameter
    trueUtilsHelper.hasLength = function (string, length) {
        return (string.length === length);
    };

    // Check if the string has a dash "-" occurrence
    trueUtilsHelper.hasDash = function (string) {
        return (string.indexOf("-") >= 0);
    };

    return trueUtilsHelper;

}());

module.exports = UtilsHelper;
