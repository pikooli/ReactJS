import { configureStore } from '@reduxjs/toolkit'

import postsReducer from "../features/posts/postsSlice"
import UsersReducer from "../features/users/usersSlice"

export default configureStore({
  reducer: {
      posts : postsReducer,
      users : UsersReducer
  },
})
