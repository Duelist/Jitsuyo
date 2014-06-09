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

    if (!moment(task.time, "h:m a", true).isValid()) {
      errors.push({"field": "time", "message": "Invalid time format."});
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
      id: 0,
      name: "Example task",
      desc: "Example description",
      date: "2014-05-20",
      time: "9:00 AM",
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
    editTask: function (id, task, success_callback) {
      $.ajax({
        url: "/tasker/tasks/" + id,
        type: "POST",
        data: JSON.stringify(task),
        contentType: "application/json",
        success: success_callback
      });
    },
    getTask: function (id, success_callback) {
      $.ajax({
        url: "/tasker/tasks/" + id,
        type: "GET",
        success: success_callback
      });
    },
    removeTask: function (id, success_callback) {
      $.ajax({
        url: "/tasker/tasks/" + id,
        type: "DELETE",
        data: id,
        success: success_callback
      });
    }
  };
}());
