export const container = {
    hidden: {
        opacity: 0
    },
    show: {
        opacity: 1,
        transition: {
            ease: 'easeOut',
            delayChildren: 0.5,
            staggerChildren: 0.2,
        }
    }
}

export const item = {
    hidden: { y: '125%' },
    show: {
        y: '0%',
        transition: {
            duration: 0.5
        }
    }
}