export const getNews = () => ({
    type: 'GET_NEWS',
});

export const updateNews = () => ({
    type: 'UPDATE_NEWS',
});

export const loginRequest = (email, password) => ({
    type: 'LOGIN_REQUEST',
    email,
    password
});

export const setUser = (user) => ({
    type: 'SET_USER',
    user
});

export const delUser = () => ({
    type: 'DEL_USER'
});