import React from 'react';
import useWindowDimensions from "./useWindowDimensions";
import {DeviceSizes} from "../styles/theme";

function useIsMobile() {
    const {width} = useWindowDimensions()
    return width <= DeviceSizes.mobile
}

export default useIsMobile;