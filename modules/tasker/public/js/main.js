/*jslint indent: 2 browser: true devel: true*/
/*global $ */


(function () {
  "use strict";

  $(document).ready(function () {
    $(".btn.add-task-btn").on("click", function () {
      console.log("Add task");
      $(".add-task").toggleClass("hide");
      return false;
    });
  });
}());
