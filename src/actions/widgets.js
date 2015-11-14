import { createAction } from 'redux-actions'

export const widgetFetch = createAction('WIDGET_FETCH')
export const widgetFetched = createAction('WIDGET_FETCHED')
export const widgetFailed = createAction('WIDGET_FAILED')
