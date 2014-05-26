/*jslint indent: 2 browser: true devel: true */
/*global $, moment */

var Tasker = (function () {
  "use strict";

  /*
   * TODO
   */
  var validateTask = function (task) {
    var current_error = {},
      errors = [],
      status = 0;

    if (task.name === "") {
      current_error.field = "name";
      current_error.message = "Name required.";
      errors.push(current_error);
    }

    if (!moment(task.date, "DD/MM/YYYY", true).isValid()) {
      current_error.field = "date";
      current_error.message = "Invalid date format.";
      errors.push(current_error);
    }

    if (task.time.length !== 4) {
      current_error.field = "time";
      current_error.message = "Invalid time format.";
      errors.push(current_error);
    }

    if (isNaN(task.time)) {
      current_error.field = "time";
      current_error.message = "Time must be a number in 24h format.";
      errors.push(current_error);
    }

    if (parseInt(task.time, 10) > 2400 || parseInt(task.time, 10) < 0) {
      current_error.field = "time";
      current_error.message = "Invalid time.";
      errors.push(current_error);
    }

    if (errors.length === 0) {
      status = 1;
    } else {
      status = 0;
    }

    return {"status": status, "errors": errors, "task": task};
  };

  /*
    Task Format
    {
      name: "Example task",
      desc: "",
      date: "2014-05-20",
      time: "0900",
      recurring: "on",
      recurring_days: [
        "Monday",
        "Tuesday"
      ]
    }
  */

  return {
    getTasks: function (success_callback) {
      $.ajax({
        url: "/tasker/tasks",
        type: "GET",
        success: success_callback
      });
    },
    addTask: function (task, success_callback, error_callback) {
      var validation = validateTask(task);

      if (validation.status) {
        $.ajax({
          url: "/tasker/tasks",
          type: "POST",
          data: JSON.stringify(validateTask(task)),
          contentType: "application/json",
          success: success_callback
        });
      } else {
        error_callback(validation);
      }
    },
    removeTask: function () {
      return false;
    }
  };
}());
