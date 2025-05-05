import { createAction, props } from "@ngrx/store";


export const addData = createAction('[NewData] AddData', props<{ csvData: any }>());
export const addFirebaseData = createAction('[NewFirebaseData] AddFirebaseData', props<{ csvData: any }>());
export const addChart = createAction('[NewChart] AddChart', props<{ id: any, property: any }>());
export const deleteData = createAction('[DeleteData] DeleteData', props<{ id: any }>());
export const deleteChart = createAction('[DeleteChart] DeleteChart');