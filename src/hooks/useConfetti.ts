import {useEffect} from 'react'

import confetti from 'canvas-confetti'

export const useConfetti = (trigger: boolean) => {
    useEffect(() => {
        if (trigger) {
            const duration = 3000
            const end = Date.now() + duration

            const colors = ['#26ccff', '#a25afd', '#ff5e7e', '#88ff5a', '#fcff42', '#ffa62d', '#ff36ff']

            ;(function frame() {
                confetti({
                    particleCount: 7,
                    angle: 60,
                    spread: 55,
                    origin: {x: 0},
                    colors: colors
                })
                confetti({
                    particleCount: 7,
                    angle: 120,
                    spread: 55,
                    origin: {x: 1},
                    colors: colors
                })

                if (Date.now() < end) {
                    requestAnimationFrame(frame)
                }
            })()
        }
    }, [trigger])
}