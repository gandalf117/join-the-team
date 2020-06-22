import { MultipleItems } from './MultipleItems'
import moment from 'moment'
import { getRandom } from '@/utils'
import { PX_PER_MIN, START_TIME, USE_RAND_WAIT_TIME } from '@/config.js'

class Station extends MultipleItems {
    constructor (data) {
		super()
		this.date = data.time ? moment(data.time).utc() : null
		this.name = data.station || ''
		this.waitTime = USE_RAND_WAIT_TIME ? getRandom(3, 10) : 0
		this.busy = false
		this.isFinalStation = false
	}
	
	get time () {
		return this.date.format('HH:mm')
	}

    get position () {
		let firstDate = moment(this.time, 'HH:mm')
        let lastDate = moment(START_TIME, 'HH:mm')
        let ms = firstDate.diff(lastDate)
        return moment.duration(ms).asMinutes() * PX_PER_MIN
    }
}

export {
	Station
}
