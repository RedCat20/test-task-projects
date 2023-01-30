const createMonth = (month: number) => {
    const realMonth = month + 1;
    return realMonth > 9 ? realMonth : `0${realMonth}`;
}

export const convertDateToString = (date: Date) => {
    const day = date.getDate();
    const month = createMonth(date.getMonth());
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}

export const getCurrentDate = () => {
    return convertDateToString(
        new Date(Date.now())
    );
}

export const getYesterdayDate = () => {
    return convertDateToString(
        new Date((new Date()).valueOf() - 1000*60*60*24)
    );
}