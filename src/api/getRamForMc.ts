import { totalmem } from 'os'

export const getRamForMc = () => {
    const b = totalmem()
    const GB = b / (1024 * 1024 * 1024)

    switch (true) {
        case GB <= 4:
            return 2
        case GB <= 8:
            return 6
        case GB <= 12:
            return 8
        case GB <= 16:
            return 12
        default:
            return 16
    }
}
