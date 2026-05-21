export function isRequired(value) {
  return value != null && String(value).trim().length > 0;
}

export function isPositiveNumber(value) {
  const num = Number(value);
  return !Number.isNaN(num) && num > 0;
}

export function validateLogin({ username, password }) {
  const errors = {};
  if (!isRequired(username)) errors.username = 'Нэвтрэх нэр оруулна уу';
  if (!isRequired(password)) errors.password = 'Нууц үг оруулна уу';
  return errors;
}

export function validateMaterial(form) {
  const errors = {};
  if (!isRequired(form.code)) errors.code = 'Код оруулна уу';
  if (!isRequired(form.name)) errors.name = 'Нэр оруулна уу';
  if (!isRequired(form.unit)) errors.unit = 'Хэмжих нэгж оруулна уу';
  return errors;
}
