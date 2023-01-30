import { ISelectOption } from "../types/form.select.types";
import { getCurrentDate, getYesterdayDate } from "../helpers/convert.date";

export const SORTS: ISelectOption[] = [
    { id: 1, value: 'title_asc', text: '<span>Title</span> <span>&#8593;</span>' },
    { id: 2, value: 'title_desc', text: '<span>Title</span> <span>&#8595;</span>' },
    { id: 3, value: 'date_asc', text: '<span>Date</span> <span>&#8593;</span>' },
    { id: 4, value: 'date_desc', text: '<span>Date</span> <span>&#8595;</span>' },
];

export const FILTERS: ISelectOption[] = [
    { id: 1, value: 'all', text: 'All' },
    { id: 2, value: getCurrentDate(), text:  getCurrentDate() },
    { id: 3, value: getYesterdayDate(), text: getYesterdayDate()},
    // { id: 2, value: '29/01/2023', text: '29/01/2023' },
];