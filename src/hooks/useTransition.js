import { useState } from 'react';


export default function useTransition() {
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isOpen, setOpenning] = useState(false);

    function toggle() {
        setIsTransitioning(!isTransitioning);
    }

    return {
        isTransitioning,
        toggle,
    }
};