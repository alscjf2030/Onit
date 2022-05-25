import { css } from 'styled-components'

const calRem = size => `${size / 16}rem`;

const fontSize = {
  12: calRem(12),
  14: calRem(14),
  18: calRem(18),
  20: calRem(20),
  30: calRem(30),
  40: calRem(40),

  //모바일 폰트
  11: calRem(11),
  16: calRem(16),
  22: calRem(22),
  28: calRem(28),
};

const fontWeight = {
  extraBold: 800,
  semiBold: 600,
  regular: 400,
};

const color = {
  // 가장 진한 색이 1이며, 숫자가 커질수록 점점 옅은 색으로 셋팅해두었습니다.
  gray1: '#5A5A5A',
  gray2: '#8C8C8C',
  gray3: '#C4C4C4',
  gray4: '#9E9E9E',
  gray5: '#F8F8F8',
  green: '#A1ED00',
  black: '#292929',
  white: '#fff',
  BackGround: '#363F4E',
};

const deviceSizes = {
  mobile: '375px',
  laptop: '768px',
};

const device = {
  mobile: `screen and (min-width: ${deviceSizes.mobile})`,
  laptop: `screen and (min-width: ${deviceSizes.laptop})`,
};

const theme = {
  fontSize,
  fontWeight,
  color,
  calRem,
  device,
};

export default theme;