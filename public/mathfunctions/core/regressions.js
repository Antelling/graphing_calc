function lin_reg(data) {
  return helper('lin_reg', arguments, 1, function (data) {
    return regression('linear', data)
  }, true);
}

function lin_reg_through_origin(data) {
  return helper('lin_reg_through_origin', arguments, 1, function (data) {
    return regression('linearThroughOrigin', data)
  }, true);
}

function log_reg(data) {
  return helper('log_reg', arguments, 1, function () {
    return regression('logarithmic', data)
  }, true);
}

function exp_reg(data) {
  return helper('exp_reg', arguments, 1, function (data) {
    return regression('exponential', data)
  }, true);
}

function pow_reg(degree, data) {
  return helper('pow_reg', arguments, 2, function (degree, data) {
    return regression('power', data, degree)
  }, true);
}
