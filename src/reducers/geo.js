import { handleActions } from 'redux-actions'

const initialState = { lat: null, lng: null, gotAt: null }

export default handleActions(
  {
    SET_GEO: (state, { payload }) => ({
      ...payload,
      gotAt: Date.now(),
    }),
  },
  initialState,
)
