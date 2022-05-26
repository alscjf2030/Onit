import { createPortal } from "react-dom";

const MobilePortal = ({ children }) => {
    const el = document.getElementById("mobile-portal");
    if (el) {
        return createPortal(children, el);
    }
};

export default MobilePortal;