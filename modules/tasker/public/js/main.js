/*jslint indent: 2 browser: true devel: true */
/*global $, Tasker */


(function () {
  "use strict";

  $.fn.toJSON = function () {
    var form_json = {},
      key_name = "",
      form_data = $(this).serializeArray();

    $.each(form_data, function () {
      if (this.name.indexOf("[]", this.name.length - 2) !== -1) {
        key_name = this.name.substring(0, this.name.length - 2);

        if (!form_json.hasOwnProperty(key_name)) {
          form_json[key_name] = [];
        }

        form_json[key_name].push(this.value || "");
      } else {
        form_json[this.name] = this.value || "";
      }
    });

    return form_json;
  };

  function getTasksCallback(response) {
    var i,
      current_task;

    $(".current-tasks").empty();
    for (i = 0; i < response.length; i += 1) {
      current_task = $.parseJSON(response[i]);
      $(".current-tasks").append($("<li>").html(current_task.name));
    }
  }

  $(document).ready(function () {

    // Initialization
    Tasker.getTasks(getTasksCallback);

    $("#add_task_button").on("click", function () {
      $(".add-task").removeClass("hide");
      $(this).addClass("hide");
    });
    $("#task_cancel_button").on("click", function () {
      $(".add-task").addClass("hide");
      $("#add_task_button").removeClass("hide");
    });
    $("#task_add_button").on("click", function () {
      var form_data = $("form[name='add_task']").toJSON();
      Tasker.addTask(form_data);
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
