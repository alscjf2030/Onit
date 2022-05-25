import React from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css'
import styled from "styled-components";
import theme from "../styles/theme";

const SetDrawerCalendar = ({calendarOpen ,onClose, date = new Date(), setDate}) => {

    const handleDay = (value) => {
        setDate(value)
        onClose()
    }

    return (
        <DrawerContainer calendarOpen={calendarOpen} onClick={(event) => event.stopPropagation()}>
            <CalendarDiv>
                <Calendar onChange={handleDay} value={date}/>
            </CalendarDiv>
        </DrawerContainer>
    )
}

export default SetDrawerCalendar

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
  transform: ${({calendarOpen}) => `translateY(${calendarOpen ? 0 : '100%'})`};
  transition: transform 0.2s ease-in-out;
  height: 55%;
  width: 100%;
`

const CalendarDiv = styled.div`
  display: flex;
  justify-content: center;

  .react-calendar {
    color: ${theme.color.black};
    border-radius: 10px;
    font-family: Arial, Helvetica, sans-serif;
  }

  .react-calendar_navigation button {
    color: #A1ED00;
  }

  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: #f8f8fa;
  }

  .react-calendar__navigation button[disabled] {
    background-color: #f0f0f0;
  }

  abbr[title] {
    text-decoration: none;
  }

  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background: #f8f8fa;
    color: #A1ED00;
    border-radius: 6px;
  }

  .react-calendar__tile--now {
    background: #A1ED00;
    border-radius: 6px;
    font-weight: bold;
    color: #111;
  }

  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: #A1ED00;
    border-radius: 6px;
    font-weight: bold;
    color: #A1ED00;
  }

  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    background: #f8f8fa;
  }

  .react-calendar__tile--active {
    background: #A1ED00;
    border-radius: 6px;
    font-weight: bold;
    color: white;
  }

  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: #A1ED00;
    color: white;
  }

  .react-calendar--selectRange .react-calendar__tile--hover {
    background-color: #f8f8fa;
  }

  .react-calendar__tile--range {
    background: #f8f8fa;
    color: #A1ED00;
    border-radius: 0;
  }

  .react-calendar__tile--rangeStart {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
    background: #A1ED00;
    color: white;
  }

  .react-calendar__tile--rangeEnd {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    background: #A1ED00;
    color: white;
  }

  .react-calendar__navigation__label__labelText {
    font-weight: bold;
    font-size: 16px;
  }
`


