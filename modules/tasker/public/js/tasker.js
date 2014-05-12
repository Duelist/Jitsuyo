/*jslint indent: 2 */

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
      tasks.push(validateTask(task));
      return tasks;
    },
    removeTask: function (id) {
      tasks.splice(id, 1);
      return tasks;
    }
  };
}());
