import dayjs from "dayjs";

const formatDate = (date) => {
    return dayjs(date).format('YYYY-MM-DD')
}

const formatTime = (date) => {
    return dayjs(date).format('HH:mm')
}

const formatHalfTime = (date) => {
    return dayjs(date).format('A hh시 mm분')
}

export {formatDate, formatTime, formatHalfTime}
