import { createAction } from 'redux-actions'

export const widgetFetch = createAction('WIDGET_FETCH')
export const widgetFetched = createAction('WIDGET_FETCHED')
export const widgetFailed = createAction('WIDGET_FAILED')

export const removeWidget = createAction('REMOVE_WIDGET')
export const addWidget = createAction('ADD_WIDGET')
