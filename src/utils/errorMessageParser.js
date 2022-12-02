export default function errorMessageParser(
  error,
  error400text = 'Something went wrong'
) {
  const messages = {
    400: error400text,
    401: 'Unauthorized',
  };

  return messages[error.response.status] || error.response.data.message;
}
