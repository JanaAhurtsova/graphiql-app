export function startSession(email: string, token: string, id: string) {
  const dateToday = new Date();
  dateToday.setHours(dateToday.getHours() + 24);
  document.cookie = `email=${email}; expires=${dateToday.toUTCString()};`;
  document.cookie = `token=${token}; expires=${dateToday.toUTCString()}; secure;`;
  document.cookie = `id=${id}; expires=${dateToday.toUTCString()};`;
}

export function getSession() {
  return {
    email: getCookie('email'),
    token: getCookie('token'),
    id: getCookie('id'),
  };
}

function getCookie(cookieName: string) {
  const results = document.cookie.match('(^|;) ?' + cookieName + '=([^;]*)(;|$)');
  if (results) {
    return results[2];
  }
  return null;
}

export function endSession() {
  document.cookie = `email=; expires=${new Date(0)};`;
  document.cookie = `token=; expires=${new Date(0)};`;
  document.cookie = `id=; expires=${new Date(0)};`;
}
