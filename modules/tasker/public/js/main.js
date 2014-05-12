/*jslint indent: 2 browser: true devel: true*/
/*global $ */


(function () {
  "use strict";

  $(document).ready(function () {
    $("#add_task_button").on("click", function () {
      $(".add-task").removeClass("hide");
      $(this).addClass("hide");
      return false;
    });
    $("#task_cancel_button").on("click", function () {
      $(".add-task").addClass("hide");
      $("#add_task_button").removeClass("hide");
      return false;
    });
    $("#task_add_button").on("click", function () {
      // Validate fields
      // Submit field data to Tasker
      return false;
    });
    $("#task_recurring_checkbox").on("change", function () {
      if ($("#task_recurring_checkbox:checked").length === 0) {
        $(".task-recurring-details").addClass("hide");
      } else {
        $(".task-recurring-details").removeClass("hide");
      }
    });
  });
}());
