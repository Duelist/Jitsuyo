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

  $.fn.populateForm = function (task) {
    var form_field,
      form_obj = $(this);

    _.each(task, function (field, key) {
      if (_.isArray(field)) {
        _.each(field, function(val) {
          form_field = $("[name='" + key + "[]'][value='" + val + "']", form_obj);
          form_field.prop("checked", true).trigger("change");
        });
      } else {
        form_field = $("[name='" + key + "']", form_obj);
        if (form_field.is(":checkbox")) {
          form_field.prop("checked", true).trigger("change");
        } else {
          form_field.val(task[key]);
        }
      }
    });
  };

  $.fn.clearForm = function () {
    $("form[name='add_task']").trigger("reset");
    $(".task-recurring-details").addClass("hide");
  };

  function getTasksCallback(response) {
    var current_task;

    $(".current-tasks").empty();

    _.each(response, function (task) {
      current_task = $.parseJSON(task);
      $(".current-tasks")
        .append($("<li>")
          .append($("<div>")
            .addClass("task")
            .attr("data-id", current_task.id)
            .attr("data-toggle", "modal")
            .attr("data-target", "#add_task_modal")
            .append(current_task.name)));
    });

    $(".current-tasks")
      .append($("<li>")
        .append($("<div>")
          .addClass("add-task")
          .attr("data-toggle", "modal")
          .attr("data-target", "#add_task_modal")
          .html("+")));
  }

  function refreshTasks(response) {
    getTasksCallback(response);
    $("#add_task_modal").modal("hide");
  }

  function addTaskErrorCallback(validation) {
    $("form[name=add_task] .form-group").removeClass("has-error");
    _.each(validation.errors, function (error) {
      $("form[name=add_task] input[name=" + error.field + "]")
        .closest(".form-group")
        .addClass("has-error");
    });
  }

  function getTaskSuccessCallback(response) {
    $("form[name='add_task']").populateForm($.parseJSON(response));
    $(".delete-task-modal-btn").removeClass("hide");
    $(".save-task-modal-btn").removeClass("hide");
    $(".add-task-modal-btn").addClass("hide");
  }

  $(document).ready(function () {

    // Initialization
    $(".datepicker").pickadate({
      "format": "dd/mm/yyyy"
    });
    $(".timepicker").pickatime();
    Tasker.getTasks(getTasksCallback);

    $(".current-tasks").on("click", "div.task", function () {
      Tasker.getTask($(this).data("id"), getTaskSuccessCallback);
      if ($("#task_recurring_checkbox").is(":checked")) {
        $(".task-recurring-details").removeClass("hide");
      } else {
        $(".task-recurring-details").addClass("hide");
      }
    });
    $(".current-tasks").on("mouseover", ".task", function () {
      $(".task-controls").removeClass("hide");
    });
    $(".add-task-modal-btn").on("click", function () {
      var form_data = $("form[name='add_task']").toJSON();
      Tasker.addTask(form_data, refreshTasks, addTaskErrorCallback);
    });
    $(".save-task-modal-btn").on("click", function () {
      var form_data = $("form[name='add_task']").toJSON();
      form_data.id = $("#task_id_input").val();
      Tasker.editTask(form_data, refreshTasks);
    });
    $(".delete-task-modal-btn").on("click", function () {
      var id = $("#task_id_input").val();
      Tasker.removeTask(id, refreshTasks)
    });
    $("#task_recurring_checkbox").on("change", function () {
      if ($("#task_recurring_checkbox").is(":checked")) {
        $(".task-recurring-details").removeClass("hide");
      } else {
        $(".task-recurring-details").addClass("hide");
      }
    });
    $('#add_task_modal').on('hidden.bs.modal', function () {
      $(".delete-task-modal-btn").addClass("hide");
      $(".edit-task-modal-btn").addClass("hide");
      $("form[name='add_task']").clearForm();
    });
  });
}());
