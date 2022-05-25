import React, {useState} from 'react';
import { Input, Grid } from '../elements';
import theme from "../styles/theme";
import Swal from "sweetalert2";
import styled from "styled-components";

const PlanName = ({clickHandler, name, setName}) => {
    const [_name, _setName] = useState(name)

    const handleName = (e) => {
        _setName(e.target.value)
    }

    const handleNext = () => {
        if ( !_name ) {
            Swal.fire({
                text: '약속 이름을 입력해 주세요',
                icon: 'error'
            })
            return
        }
        setName(_name)
        clickHandler()
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
                    value={_name}
                    placeholder='약속 이름을 입력해 주세요'/>
            </Grid>
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
                        opacity: !_name ? 0.3 : 1,
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

export default PlanName;