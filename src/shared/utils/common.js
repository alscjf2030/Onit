import dayjs from "dayjs";

const formatDate = (date) => {
    return dayjs(date).format('YYYY-MM-DD')
}

const formatTime = (date) => {
    return dayjs(date).format('HH:mm')
}

export {formatDate, formatTime}
