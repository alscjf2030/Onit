import Coffee from '../img/icon/coffee.svg'
import Beer from '../img/icon/beer.svg'
import Ouch from '../img/icon/ouch.svg'
import Money from '../img/icon/money.svg'
import Payment from '../img/icon/payment.svg'

const penaltyModel = [
    { id: 0, value: '벌칙은 없어도 돼요'},
    { id: 1, value: '지각생이 커피 쏘기!', image: <img alt='coffee' src={Coffee}/>},
    { id: 2, value: '입장주 들이키기', image: <img alt='beer' src={Beer}/>},
    { id: 3, value: '코끼리코 10바퀴', image: <img alt='ouch' src={Ouch}/>},
    { id: 4, value: '시간이 돈! 벌금내기', image: <img alt='money' src={Money}/>},
    { id: 5, value: '통 크게 1차 쏘기!', image: <img alt='payment' src={Payment}/>},
]

export {penaltyModel}