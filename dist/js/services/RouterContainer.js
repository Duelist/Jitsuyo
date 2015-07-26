let _router = null;

export default {
  set: function (router) {
    _router = router;
  },
  get: function () {
    return _router;
  }
}
