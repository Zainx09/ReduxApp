export const getNews = () => ({
    type: 'GET_NEWS',
});

export const updateNews = () => ({
    type: 'UPDATE_NEWS',
});

export const setUser = (user) => ({
    type: 'SET_USER',
    user
});

export const delUser = () => ({
    type: 'DEL_USER'
});