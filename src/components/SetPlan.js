import React, {useMemo, useState} from 'react';
import { Input, Grid } from '../elements';
import theme from "../styles/theme";
import Swal from "sweetalert2";
import styled from "styled-components";
import SetDrawerTime from "./SetDrawerTime";
import SetDrawerCalendar from "./SetDrawerCalendar";
import {hourModel, minuteModel} from "../statics/time";
import {formatDate} from "../shared/utils/common";
import MobilePortal from "./MobilePortal";
import PlanSelectMap from './PlanSelectMap';

const SetPlan = ({clickHandler, name, setName, setPlace, place, setDate, setTime}) => {
    const [planName, setPlanName] = useState(name)
    const [showMap, setShowMap] = useState(false);

    const [placeName, setPlaceName] = useState(place?.name || '');
    const [address, setAddress] = useState(place?.address || '')
    const [lat, setLat] = useState(place?.lat || '');
    const [lng, setLng] = useState(place?.lng || '');

    let today = new Date();
    const [_date, _setDate] = useState(today)
    const [hour, setHour] = useState('시')
    const [minute, setMinute] = useState('분')
    const [amPmType, setAmPmType] = useState('')
    const [open, setOpen] = useState(false)
    const [calendarOpen, setCalendarOpen] = useState(false)

    // 1
    const _time = useMemo(() => {
        if (!hour || !minute || hour === '시' || hour === '분' || !amPmType) {
            return ''
        }
        const _hour = hourModel.find((model) => model.id === hour)
        const _minute = minuteModel.find((model) => model.id === minute)
        return `${amPmType === 'pm' ? parseInt(_hour.value) + 12 : _hour.value}:${_minute.value}`
        // return `${amPmType === 'pm' ? '오후' +' '+ _hour.value : amPmType === 'am' ? '오전'+' '+ _hour.value : _hour.value}:${_minute.value}`
    }, [amPmType, hour, minute])


    const handleName = (e) => {
        setPlanName(e.target.value)
    }

    const handleNext = () => {
        if ( !planName ) {
            Swal.fire({
                text: '약속 이름을 입력해 주세요',
                icon: 'error'
            })
            return
        }
        if (planName.length < 2 || planName.length > 10){
            Swal.fire({
                text: '약속 이름은 2~10자로 정해주세요',
                icon: 'error'
            })
            return
        }
        setName(planName)
        setPlace({placeName, address, lat, lng})
        setDate(formatDate(_date))
        setTime(_time)
        clickHandler()
    }

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

    return(
        <Container>
            <Grid padding="16px">
                <Input
                    islabel
                    labelBold
                    labelColor={theme.color.gray1}
                    labelText="먼저 약속 이름을 정해 주세요"
                    _onChange={handleName}
                    value={planName}
                    placeholder='약속 이름은 2~10자로 정해 주세요'/>
            </Grid>
            <Grid padding="16px">
                <Input
                    islabel
                    readonly
                    labelBold
                    labelColor={theme.color.gray1}
                    labelText="먼저 장소를 정해주세요"
                    placeholder="장소를 입력해주세요."
                    _onClick={() => {
                        setShowMap(true);
                    }}
                    value={placeName}
                />
            </Grid>
            {showMap && (
                <PlanSelectMap
                    setShowMap={setShowMap}
                    setName={setPlaceName}
                    setAddress={setAddress}
                    setLat={setLat}
                    setLng={setLng}
                />
            )}
            <Grid padding="16px">
                <Input
                    islabel
                    labelBold
                    readonly
                    labelColor={theme.color.gray1}
                    labelText="언제 모일지 정해주세요"
                    placeholder={'누르고 날짜 선택하기'}
                    value={formatDate(_date)}
                    _onClick={toggleCalendar}
                />
                <Input
                    readonly
                    labelColor={theme.color.gray1}
                    value={_time}
                    placeholder={'누르고 시간 선택하기'}
                    _onClick={toggleMenu}
                />
            </Grid>
            <MobilePortal>
                <ShowMenu open={open} onClick={closeMenu}>
                    <SetDrawerTime open={open} onClose={toggleMenu} hour={hour} setHour={setHour} minute={minute}
                                   setMinute={setMinute} amPmType={amPmType} setAmPmType={setAmPmType}/>
                </ShowMenu>
            </MobilePortal>
            <MobilePortal>
                <ShowCalendar calendarOpen={calendarOpen} onClick={closeCalendar}>
                    <SetDrawerCalendar calendarOpen={calendarOpen} onClose={toggleCalendar} date={_date}
                                       setDate={_setDate}/>
                </ShowCalendar>
            </MobilePortal>
            <Grid bottom="0" padding="16px">
                <button
                    style={{
                        backgroundColor:'#A1ED00',
                        width: '100%',
                        height: '100%',
                        padding: '12px',
                        color: 'black',
                        border: 'none',
                        borderRadius: '10px',
                        opacity: !planName ? 0.3 : 1,
                    }}
                    onClick={handleNext}>다음으로
                </button>
            </Grid>
        </Container>
    )
}

const Container = styled.div`
  display: block;
`
const ShowMenu = styled.div`
  background-color: rgba(255, 255, 255, 0);
  display: flex;
  visibility: ${({open}) => open ? 'visible' : 'hidden'};
  top: 0;
  left: 0;
  align-items: flex-end;
  width: 100%;
  height: 100%;
  position: absolute;
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
  position: absolute;
  z-index: 1;
  transition: visibility 0.2s;
`

export default SetPlan;