/*jslint indent: 2 */

var Tasker = (function () {
  "use strict";

  var tasks, validateTask;

  tasks = {
    current: [],
    recurring: []
  };

  /**
   * TODO
   * Task: id, name, schedule
   * Schedule: due date, due time
   */
  validateTask = function (task) {
    return task;
  };

  return {
    getCurrentTasks: function () {
      return tasks.current;
    },
    getRecurringTasks: function () {
      return tasks.recurring;
    },
    addTask: function (task) {
      tasks.current.push(validateTask(task));
    },
    removeTask: function () {
      return false;
    }
  };
}());
