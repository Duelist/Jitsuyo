let _theme_manager = null;

export default {
  set: function (theme_manager) {
    _theme_manager = theme_manager;
  },
  get: function () {
    return _theme_manager;
  }
}
