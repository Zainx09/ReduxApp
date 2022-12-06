import { put, takeLatest, all } from 'redux-saga/effects';

function* fetchNews() {
    // const json = yield fetch('https://newsapi.org/v1/articles?source= cnn&apiKey=c39a26d9c12f48dba2a5c00e35684ecc')
    // .then(response => response.json(), ); 

    // yield put({ type: "NEWS_RECEIVED", json: json.articles, });  
    yield put({ type: "NEWS_RECEIVED"});
}

function* updateNews() {
    // const json = yield fetch('https://newsapi.org/v1/articles?source= cnn&apiKey=c39a26d9c12f48dba2a5c00e35684ecc')
    // .then(response => response.json(), ); 

    // yield put({ type: "NEWS_RECEIVED", json: json.articles, });  
    yield put({ type: "UPDATE_RECEIVED"});
}

function* actionWatcher() {
    yield takeLatest('GET_NEWS', fetchNews)
    yield takeLatest('UPDATE_NEWS', updateNews)
}

export default function* rootSaga() {
   yield all([
   actionWatcher(),
   ]);
}