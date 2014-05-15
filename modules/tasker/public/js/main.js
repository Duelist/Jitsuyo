/*jslint indent: 2 browser: true devel: true */
/*global $, Tasker */


(function () {
  "use strict";

  $.fn.toJSON = function () {
    var form_json = {},
      form_data = $(this).serializeArray();

    $.each(form_data, function (i, obj) {
      form_json[obj.name] = obj.value;
    });

    return form_json;
  };

  $(document).ready(function () {
    $("#add_task_button").on("click", function (e) {
      $(".add-task").removeClass("hide");
      $(this).addClass("hide");
      e.preventDefault();
    });
    $("#task_cancel_button").on("click", function (e) {
      $(".add-task").addClass("hide");
      $("#add_task_button").removeClass("hide");
      e.preventDefault();
    });
    $("#task_add_button").on("click", function (e) {
      // Validate fields
      // Submit field data to Tasker
      var form_data = $("form[name='add_task']").toJSON();

      console.log(form_data);

      /*
      Tasker.addTask({
        name: $("#task_name_input").val(),
        desc: $("#task_desc_textarea").val(),
        schedule: {
          "date": $("#task_date_input").val(),
          "time": $("#task_time_input").val()
        }
      });
      */
      e.preventDefault();
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
