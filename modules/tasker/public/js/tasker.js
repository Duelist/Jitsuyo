/*jslint indent: 2 browser: true devel: true */
/*global $, moment */

var Tasker = (function () {
  "use strict";

  /*
   * TODO
   */
  var validateTask = function (task) {
    var errors = [],
      status = 0;

    if (task.name === "") {
      errors.push({"field": "name", "messsage": "Name required."});
    }

    if (!moment(task.date, "DD/MM/YYYY", true).isValid()) {
      errors.push({"field": "date", "message": "Invalid date format."});
    }

    if (task.time.length !== 4) {
      errors.push({"field": "time", "message": "Invalid time format."});
    }

    if (isNaN(task.time)) {
      errors.push({"field": "time", "message": "Time must be a number in 24h format."});
    }

    if (parseInt(task.time, 10) > 2400 || parseInt(task.time, 10) < 0) {
      errors.push({"field": "time", "message": "Invalid time."});
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
          data: JSON.stringify(task),
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
