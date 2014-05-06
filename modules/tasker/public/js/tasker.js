/*jslint indent: 2 */

(function () {
  "use strict";

  var tasks, validateTask;

  tasks = [];

  validateTask = function (task) {
    return true;
  };

  return {
    addTask: function (task) {
      task.push(task);
    },
    removeTask: function () {
      return false;
    }
  };
}());
