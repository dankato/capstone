
// | GET_POSTS   | Retrieves all entries in the databases             |
// | SELECT_POST | Selects a single POST by its id from the database  |
// | ADD_POST    | Adds an POST to the database                       |
// | REMOVE_POST | Removes a single POST in the database using its id |
// | ADD_REPLY   | Adds a single reply to the database                |
// | REMOVE_REPLY| Removes a single reply to the database             |
// | ADD_REPLY   | Adds a single reply to the database                |

const localUrl = 'http://localhost:3001';
const herokuUrl = '';

let baseUrl;

console.log(process.env.NODE_ENV)

if (process.env.NODE_ENV === 'development') {
    baseUrl = localUrl
} else {
    baseUrl = herokuUrl;
}


export const GET_POSTS_REQUEST = 'GET_POSTS_REQUEST';
export const getPostsRequest = text => ({
    type: GET_POSTS_REQUEST,
    text
})

export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
export const getPostsSuccess = posts => ({
    type: GET_POSTS_SUCCESS,
    posts
})

export const GET_POSTS_ERROR = 'GET_POSTS_ERROR';
export const getPostsError = text => ({
    type: GET_POSTS_ERROR,
    text
})

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const addPostRequest = text => ({
    type: ADD_POST_REQUEST,
    text
})

export const ADD_POST_ERROR = 'ADD_POST_ERROR';
export const addPostError = text => ({
    type: ADD_POST_ERROR,
    text
})

// Delete
export const DELETE_POSTS_REQUEST = 'DELETE_POSTS_REQUEST';
export const deletePostRequest = text => ({
    type: DELETE_POSTS_REQUEST,
    text
})

export const DELETE_POSTS_SUCCESS = 'DELETE_POSTS_SUCCESS';
export const deletePostSuccess = id => ({
    type: DELETE_POSTS_SUCCESS,
    id
})

export const DELETE_POSTS_ERROR = 'DELETE_POSTS_ERROR';
export const deletePostError = text => ({
    type: DELETE_POSTS_ERROR,
    text
})

export const GET_COUNT_REQUEST = 'GET_COUNT_REQUEST';
export const getCountRequest = count => ({
    type: GET_COUNT_REQUEST,
    count
})

export const GET_COUNT_SUCCESS = 'GET_COUNT_SUCCESS';
export const getCountSuccess = count => ({
    type: GET_COUNT_SUCCESS,
    count
})

export const GET_COUNT_ERROR = 'GET_COUNT_ERROR';
export const getCountError = count => ({
    type: GET_COUNT_ERROR,
    count
})




export const getPosts = () => dispatch => {
    dispatch(getPostsRequest());
    fetch(`${baseUrl}/api/post`)
        .then(res => {
            
            if (!res.ok) {
                return Promise.reject(res.statusText)
            }
            //(res.json())
            return res.json()
        })
        .then((posts) => {
            // console.log('hey im here')
            //console.log(text);
            dispatch(getPostsSuccess(posts))
        })
        .catch((err) => {
            dispatch(getPostsError(err))
        })
}

export const addPost = (data) => dispatch => {
   // console.log('data', data);
    const opts = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
    },
    }
    dispatch(addPostRequest());
    fetch(`${baseUrl}/api/post`, opts)
        .then(res => {
            // if(!res.ok) {
            //     return Promise.reject(res.statusText)
            // }
            return res.json()
        })
        .then((posts) => {
            console.log('in then')
            console.log('posts', posts);
            dispatch(getPostsSuccess(posts))
        })
        .catch((err) => {
            dispatch(addPostError(err))
        })
}


export const deletePost = (id) => dispatch => {
    console.log('what is my id? --->', id);    
    const opts = {
        method: 'DELETE',
        headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
    },    
    }
    dispatch(deletePostRequest());
    fetch(`${baseUrl}/api/post/${id}`, opts)
        .then(() => dispatch(deletePostSuccess(id)))
        .catch((err) => {
            console.log(err)
            dispatch(deletePostError(err))
        })
}

export const voteCount = (id) => dispatch => {
    const opts = {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
    },
}
    dispatch(getCountRequest());
    fetch(`${baseUrl}/api/vote/${id}`)
        .then(res => {
            if(!res.ok) {
                return Promise.reject(res.statusText)
            }
            return res.json()
        })
        .then(count => {
            dispatch(getCountSuccess(count))
        })  
        .catch(err => {
            dispatch(getCountError(err))
        })  
}


// export const getPosts = () => dispatch => {
//     dispatch(getPostsRequest());
//     fetch(`${baseUrl}/api/post`)
//         .then(res => {
            
//             if (!res.ok) {
//                 return Promise.reject(res.statusText)
//             }
//             //(res.json())
//             return res.json()
//         })
//         .then((posts) => {
//             // console.log('hey im here')
//             //console.log(text);
//             dispatch(getPostsSuccess(posts))
//         })
//         .catch((err) => {
//             dispatch(getPostsError(err))
//         })
// }