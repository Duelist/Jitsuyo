/*jslint indent: 2 browser: true devel: true */
/*global $ */

var Tasker = (function () {
  "use strict";

  var tasks, validateTask;

  tasks = [
    {
      name: "Example task",
      desc: "",
      schedule: {
        "date": "2014-05-20",
        "time": "0900"
      }
    }
  ];

  /**
   * TODO
   */
  validateTask = function (task) {
    return task;
  };

  return {
    getTasks: function () {
      return tasks;
    },
    addTask: function (task) {
      var validated_task = validateTask(task);
      tasks.push(validated_task);
      $.ajax({
        url: "/tasker",
        type: "POST",
        data: validated_task,
        success: function (data) {
          console.log(data);
        },
        error: function (data) {
          console.log(data);
        }
      });
      return tasks;
    },
    removeTask: function (id) {
      tasks.splice(id, 1);
      return tasks;
    }
  };
}());
