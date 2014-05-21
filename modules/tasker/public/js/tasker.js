/*jslint indent: 2 browser: true devel: true */
/*global $ */

var Tasker = (function () {
  "use strict";

  /*
   * TODO
   */
  var validateTask = function (task) {
    return task;
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
        success: success_callback,
        error: function (response) {
          console.err(response);
        }
      });
    },
    addTask: function (task) {
      $.ajax({
        url: "/tasker/tasks",
        type: "POST",
        data: JSON.stringify(validateTask(task)),
        contentType: "application/json",
        success: function (response) {
          console.log(response);
          return response;
        },
        error: function (response) {
          console.err(response);
        }
      });
    },
    removeTask: function () {
      return false;
    }
  };
}());
