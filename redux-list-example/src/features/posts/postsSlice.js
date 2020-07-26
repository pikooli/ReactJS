import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../../api/client'


// const initialState = {
//     posts: [],
//     status: 'idle',
//     error : null
// }

const initialState = [
    { id: '1', title: 'First Post!', date: new Date().toISOString(), content: 'Hello!',
    reactions:{
        thumbsUp: 0,
        hooray: 0,
        heart: 0,
        rocket: 0,
        eyes: 0 
    }
},
    { id: '2', title: 'Second Post', date: new Date().toISOString(), content: 'More text',
    reactions:{
        thumbsUp: 0,
        hooray: 0,
        heart: 0,
        rocket: 0,
        eyes: 0 
    } 
}
  ]
  

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await client.get('/fakeApi/posts')
    return response.posts
})

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers : {
        postAdded:{
            reducer(state, action){
                state.posts.push(action.payload)
            }
        },
        prepare(title, content, userId){
            return {
                payload: {
                    id: nanoid(),
                    date: new Date().toISOString(),
                    title,
                    content,
                    user: userId
                }
            }
        },
        postUpdated(state, action){
            const {id, title, content} = action.payload
            const existingPost = state.posts.find(post => post.id === id)
            if (existingPost){
                existingPost.title = title
                existingPost.content = content
            }
        },
        reactionAdded(state, action){
            const {postId, reaction} = action.payload
            const existingPost = state.posts.find(post => post.id === postId)
            if (existingPost){
                existingPost.reactions[reaction]++
            }
        }
    }
})



export const {postAdded, postUpdated, reactionAdded} = postsSlice.actions

export default postsSlice.reducer

export const selectAllPosts = state => state.posts

export const selectPostById = (state, postId) =>
  state.posts.find(post => post.id === postId)


// export const selectAllPosts = state => state.posts.posts

// export const selectPostById = (state, postId) =>
//   state.posts.posts.find(post => post.id === postId)
