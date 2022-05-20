import dayjs from "dayjs";

const formatDate2 = (date) => {
    return dayjs(date).format('YYYY-MM-DD')
}

const formatTime2 = (date) => {
    return dayjs(date).format('HH:mm')
}

export {formatDate2, formatTime2}
