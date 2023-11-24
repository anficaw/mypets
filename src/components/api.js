const config = {
  baseUrl: "https://nomoreparties.co/v1/wbf-cohort-14",
  headers: {
    authorization: "5b991593-2d40-406d-bb45-a04e21468b74",
    "Content-Type": "application/json",
  },
};

function ChekResponse(res) {
  if (res.ok) {
    return res.json();
  }
  // если ошибка, отклоняем промис
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
    method: "GET",
  }).then(ChekResponse);
};

export const greatCards = (card) => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
    method: "POST",
    body: JSON.stringify(card),
  }).then(ChekResponse);
};

export const gelCards = (cardid) => {
  return fetch(`${config.baseUrl}/cards/${cardid}`, {
    headers: config.headers,
    method: "DELETE",
  }).then(ChekResponse);
};

export const getuser = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
    method: "GET",
  }).then(ChekResponse);
};

export const edituser = (user) => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
    method: "PATCH",
    body: JSON.stringify(user),
  }).then(ChekResponse);
};

export const editavatar = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    headers: config.headers,
    method: "PATCH",
    body: JSON.stringify(avatar),
  }).then(ChekResponse);
};

export const addlike = (cardid) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardid}`, {
    headers: config.headers,
    method: "PUT",
  }).then(ChekResponse);
};

export const removelike = (cardid) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardid}`, {
    headers: config.headers,
    method: "DELETE",
  }).then(ChekResponse);
};
