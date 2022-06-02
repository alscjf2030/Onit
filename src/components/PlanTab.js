import * as React from 'react';
import {styled} from '@mui/material/styles';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PlanList from './PlanList';
import {getInvitePlan, getMyPlan, getTotalPlan, resetPlan} from "../redux/modules/plan";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

const StyledTabs = styled((props) => (
    <Tabs
        {...props}
        TabIndicatorProps={{children: <span className="MuiTabs-indicatorSpan"/>}}
    />
))({
    '& .MuiTabs-indicator': {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        marginBottom: "15px"
    },
    '& .MuiTabs-indicatorSpan': {
        maxWidth: 30,
        width: '100%',
        backgroundColor: '#181818',
    },
    '& .MuiTabs-flexContainer': {
        marginBottom: "15px"
    },
    '& .MuiButtonBase-root': {
        justifyContent: 'flex-end',
        minWidth: '70px',
        marginBottom: '3px',
    },

});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
    ({theme}) => ({
        zIndex: "0",
        textTransform: 'none',
        fontFamily: 'Pretendard',
        fontWeight: theme.typography.fontWeightRegular,
        fontSize: theme.typography.pxToRem(18),
        padding: "0",
        color: '#878787',
        '&.Mui-selected': {
            fontWeight: 600,
            color: '#131313',
        },
    }),
);

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const EmptyComponent = ({type}) => {
    const navigate = useNavigate();
    if (type === 'invited') {
        return (
            <div className='no-list'>
                <p>
                    아직 참여한 약속이 없습니다!
                </p>
            </div>
        )
    }
    return (
        <div className='no-list'>
            <p>
                아직 약속이 없습니다!
            </p>
            <p>
                즐거운 모임 온잇에서 어떠신가요?
            </p>
            <button
                className='create-on-it'
                onClick={() => {
                    navigate('/add')
                }}
            >온잇으로 모임 만들기
            </button>
        </div>
    )
}

const PlanTab = () => {
    const dispatch = useDispatch()
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        dispatch(resetPlan())
        setValue(newValue);
    };

    const getAllPlan = (page) => {
        dispatch(getTotalPlan(page))
    }

    const getCreatedPlan = (page) => {
        dispatch(getMyPlan(page))
    }

    const getInvitedPlan = (page) => {
        dispatch(getInvitePlan(page))
    }

    return (
        <Box style={{width: '100%'}}>
            <Box sx={{}}>
                <StyledTabs
                    value={value}
                    onChange={handleChange}
                    aria-label="styled tabs example"
                >
                    <StyledTab label="전체" {...a11yProps(0)}/>
                    <StyledTab label="만든 약속" style={{marginRight: "15px"}} {...a11yProps(1)}/>
                    <StyledTab label="받은 약속" {...a11yProps(2)}/>
                </StyledTabs>
            </Box>
            <TabPanel value={value} index={0}>
                <PlanList type='all' getPlan={getAllPlan}>
                    <EmptyComponent/>
                </PlanList>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <PlanList type='created' getPlan={getCreatedPlan}>
                    <EmptyComponent/>
                </PlanList>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <PlanList type='invited' getPlan={getInvitedPlan}>
                    <EmptyComponent type={'invited'}/>
                </PlanList>
            </TabPanel>
        </Box>
    );
}

export default PlanTab