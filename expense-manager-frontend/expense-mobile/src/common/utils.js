export const validate_email = (email) => {
    const re = /\S+@\S+\.\S+/;
    if (!email || email.length <= 0)
      return 'Email address cannot be empty.';
    if (!re.test(email))
      return 'Invalid email address.';
    return '';
}

export const validate_password = (password) => {
  if (!password || password.length <= 0)
    return 'Password cannot be empty.';
  return '';
};
