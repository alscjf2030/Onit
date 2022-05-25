import React, {useEffect, useMemo, useState} from 'react';
import {Grid, Input} from '../elements';
import theme from "../styles/theme";

import {hourModel, minuteModel} from "../statics/time";
import {formatDate} from "../shared/utils/common";
import styled from "styled-components";
import SetDrawerTime from "./SetDrawerTime";
import SetDrawerCalendar from "./SetDrawerCalendar";
import Swal from "sweetalert2";

const SetTime = ({setDate, setTime, clickHandler}) => {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();
    const timePlaceholder = `${today.getHours()}:${today.getMinutes()}`
    const [_date, _setDate] = useState(today)
    const [hour, setHour] = useState('시')
    const [minute, setMinute] = useState('분')
    const [amPmType, setAmPmType] = useState('')

    // 1
    const _time = useMemo(() => {
        if (!hour || !minute || hour === '시' || hour === '분' || !amPmType) {
            return ''
        }
        const _hour = hourModel.find((model) => model.id === hour)
        const _minute = minuteModel.find((model) => model.id === minute)
        return `${amPmType === 'pm' ? parseInt(_hour.value) + 12 : _hour.value}:${_minute.value}`
    }, [amPmType, hour, minute])

    // 2
    // const [time, setTime] = useState('');
    // useEffect(() => {
    //     if (hour && minute && hour !== '시' && hour !== '분') {
    //         const _hour = hourModel.find((model) => model.id === hour)
    //         const _minute = minuteModel.find((model) => model.id === minute)
    //         setTime(`${amPmType === 'pm' ? parseInt(_hour.value) + 12 : _hour.value}:${_minute.value}`)
    //     }
    // }, [amPmType, hour, minute])

    const handleNext = () => {
        if (!_date || !_time) {
            Swal.fire({
                text: '날짜를 정해 주세요',
                icon: 'error'
            })
            return
        }
        setDate(formatDate(_date))
        setTime(_time)
        clickHandler()
    }

    const [open, setOpen] = useState(false)
    const [calendarOpen, setCalendarOpen] = useState(false)

    const toggleMenu = () => {
        setOpen(open => !open);
    }

    const closeMenu = () => {
        setOpen(false)
    }

    const toggleCalendar = () => {
        setCalendarOpen(calendarOpen => !calendarOpen);
    }

    const closeCalendar = () => {
        setCalendarOpen(false)
    }


    return (
        <React.Fragment>
            <Grid padding="16px">
                <Input
                    islabel
                    labelBold
                    readonly
                    labelColor={theme.color.gray1}
                    labelText="먼저 날짜를 알려주세요"
                    placeholder={today = yyyy + '년 ' + mm + '월 ' + dd + '일 '}
                    value={formatDate(_date)}
                    _onClick={toggleCalendar}
                />
                <Input
                    islabel
                    labelBold
                    readonly
                    labelColor={theme.color.gray1}
                    labelText="시간은 몇시가 좋을까요?"
                    value={_time}
                    placeholder={timePlaceholder}
                    _onClick={toggleMenu}
                />
            </Grid>

            <ShowMenu open={open} onClick={closeMenu}>
                    <SetDrawerTime open={open} onClose={toggleMenu} hour={hour} setHour={setHour} minute={minute}
                                   setMinute={setMinute} amPmType={amPmType} setAmPmType={setAmPmType}/>
            </ShowMenu>

            <ShowCalendar calendarOpen={calendarOpen} onClick={closeCalendar}>
                <SetDrawerCalendar calendarOpen={calendarOpen} onClose={toggleCalendar} date={_date} setDate={_setDate}/>
            </ShowCalendar>

            <Grid bottom="0" padding="16px">
                <button
                    style={{
                        backgroundColor: '#A1ED00',
                        width: '100%',
                        height: '100%',
                        padding: '12px',
                        color: 'black',
                        border: 'none',
                        borderRadius: '10px',
                        opacity: !_date || !_time ? 0.3 : 1
                    }}
                    onClick={handleNext}>다음으로
                </button>
            </Grid>
        </React.Fragment>
    )
}

export default SetTime;

const ShowMenu = styled.div`
  background-color: rgba(255, 255, 255, 0);
  display: flex;
  visibility: ${({open}) => open ? 'visible' : 'hidden'};
  top: 0;
  left: 0;
  align-items: flex-end;
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 1;
  transition: visibility 0.2s;
`

const ShowCalendar = styled.div`
  background-color: rgba(255, 255, 255, 0);
  display: flex;
  visibility: ${({calendarOpen}) => calendarOpen ? 'visible' : 'hidden'};
  top: 0;
  left: 0;
  align-items: flex-end;
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 1;
  transition: visibility 0.2s;
`