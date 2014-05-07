/*jslint indent: 2 browser: true devel: true*/
/*global $ */


(function () {
  "use strict";

  $(document).ready(function () {
    $(".btn.add-current-task").on("click", function () {
      console.log("Add task");
    });
  });
}());
