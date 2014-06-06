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
    var current_task;

    $(".current-tasks").empty();

    _.each(response, function (task) {
      current_task = $.parseJSON(task);
      $(".current-tasks").append($("<li>")
                           .append($("<div>")
                             .addClass("task")
                             .attr("data-id", current_task.id)
                             .append(current_task.name)));
    });

    $(".current-tasks").append($("<li>")
                         .append($("<div>")
                           .addClass("add-task")
                           .attr("data-toggle", "modal")
                           .attr("data-target", "#add_task_modal")
                           .html("+")));
  }

  function addTaskSuccessCallback(response) {
    getTasksCallback(response);
    $("#add_task_modal").modal("hide");
    $("form[name='add_task']").trigger("reset");
  }

  function addTaskErrorCallback(validation) {
    $("form[name=add_task] .form-group").removeClass("has-error");
    _.each(validation.errors, function (error) {
      $("form[name=add_task] input[name=" + error.field + "]").closest(".form-group").addClass("has-error");
    });
  }

  $(document).ready(function () {

    // Initialization
    Tasker.getTasks(getTasksCallback);
    $(".datepicker").pickadate({
      "format": "dd/mm/yyyy"
    });
    $(".timepicker").pickatime();

    $(".current-tasks").on("mouseover", ".task", function () {
      $(".task-controls").removeClass("hide");
    });
    $(".add-task-modal-btn").on("click", function () {
      var form_data = $("form[name='add_task']").toJSON();
      Tasker.addTask(form_data, addTaskSuccessCallback, addTaskErrorCallback);
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
