import moment from 'moment'
import 'moment/locale/fr';

export const momentGreenit = (date: string) => {
    return moment(date).locale('fr').format('l')
}

export const momentGreenitUs = (date: string) => {
    return moment(date).locale('fr').format('YYYY-MM-DD')
}


export const momentGreenitNow = (date: string) => {
    return moment().locale('fr').format('llll')
}