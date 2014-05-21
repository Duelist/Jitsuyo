/*jslint indent: 2 browser: true devel: true */
/*global $ */

var Tasker = (function () {
  "use strict";

  var validateTask;

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

  /*
   * TODO
   */
  validateTask = function (task) {
    return task;
  };

  return {
    getTasks: function () {
      $.ajax({
        url: "/tasker/tasks",
        type: "GET",
        contentType: "application/json",
        beforeSend: function () {
          // Disable buttons
          // Indicate loading
        },
        success: function (response) {
          console.log(response);
        },
        error: function (response) {
          return response;
        }
      });
    },
    addTask: function (task) {
      $.ajax({
        url: "/tasker/tasks",
        type: "POST",
        data: JSON.stringify(validateTask(task)),
        contentType: "application/json",
        beforeSend: function () {
          // Disable buttons
          // Indicate loading
        },
        success: function (response) {
          console.log(response);
        },
        error: function (response) {
          return response;
        }
      });
    },
    removeTask: function () {
      return false;
    }
  };
}());
