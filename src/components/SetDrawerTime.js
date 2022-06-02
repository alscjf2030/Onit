import React, {useState} from 'react';
import styled from "styled-components";
import DropdownList from "react-widgets/DropdownList";
import {hourModel, minuteModel} from "../statics/time";
import theme from "../styles/theme";
import Swal from "sweetalert2";
import "react-widgets/styles.css";

const SetDrawerTime = ({open, onClose, hour, minute, setHour, setMinute, amPmType, setAmPmType}) => {

    const [_hour, _setHour] = useState(hour);
    const [_minute, _setMinute] = useState(minute);
    const [_amPmType, _setAmPmType] = useState(amPmType)

    const handleHour = (value) => {
        _setHour(value.id)
    }
    const handleMinute = (value) => {
        _setMinute(value.id)
    }

    const selected = (type) => {
        _setAmPmType(type === _amPmType ? '' : type)
    }

    const handleConfirm = () => {
        if (!_amPmType || !_hour || !_minute || _hour === '시' || _minute === '분') {
            Swal.fire({
                // title: 'Error!',
                text: '시간을 선택해 주세요',
                icon: 'error',
            })
            return
        }
        setHour(_hour)
        setMinute(_minute)
        setAmPmType(_amPmType)
        onClose()
    }

    return (
        <DrawerContainer open={open} onClick={(event) => event.stopPropagation()}>
            <Container>
                <ButtonBox>
                    <button
                        style={{
                            backgroundColor: `${_amPmType === 'am' ? "#A1ED00" : "#ddd"}`,
                            width: '25%',
                            height: '100%',
                            padding: '12px',
                            marginRight: '12px',
                            color: 'black',
                            border: 'none',
                            borderRadius: '10px',
                        }}
                        onClick={() => selected('am')}
                    >오전
                    </button>
                    <button
                        style={{
                            backgroundColor: `${_amPmType === 'pm' ? "#A1ED00" : "#ddd"}`,
                            width: '25%',
                            height: '100%',
                            padding: '12px',
                            color: 'black',
                            border: 'none',
                            borderRadius: '10px',
                        }}
                        onClick={() => selected('pm')}
                    >오후
                    </button>
                </ButtonBox>
                <DropBox>
                    <DropdownList
                        style={{
                            flex: 1,
                            marginRight: '12px'
                        }}
                        dataKey="id"
                        textField="value"
                        value={_hour}
                        onChange={handleHour}
                        data={hourModel}
                    />
                    <DropdownList
                        style={{flex: 1}}
                        dataKey="id"
                        textField="value"
                        value={_minute}
                        onChange={handleMinute}
                        data={minuteModel}
                    />
                </DropBox>
            </Container>
            <button
                style={{
                    backgroundColor: `${_amPmType === '' || _hour === '시' || _minute === '분' ? '#DDD' : '#A1ED00'}`
                }}
                className='confirm' onClick={handleConfirm}>확인
            </button>
        </DrawerContainer>
    );
}

export default SetDrawerTime;

const DrawerContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  position: relative;
  padding: 16px;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  background-color: ${theme.color.white};
  box-shadow: 0 0 20px 0 rgba(132, 132, 132, 0.4);
  transform: ${({open}) => `translateY(${open ? 0 : '100%'})`};
  transition: transform 0.2s ease-in-out;
  height: 55%;

  .confirm {
    position: absolute;
    bottom: 0;
    margin-bottom: 10px;
    width: 90%;
    padding: 12px;
    color: ${theme.color.black};
    border: none;
    border-radius: 10px;
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const ButtonBox = styled.div`
  display: flex;
  width: 100%;
  padding: 12px;
`

const DropBox = styled.div`
  display: flex;
  width: 100%;
  padding: 12px;
`