	
import { getRandom } from '@/utils'
import { PX_PER_MIN, USE_RAND_WAIT_TIME, USE_RAND_TRAIN_SPEED } from '@/config.js'

class Train {
	constructor (data) {
		this.id = data.id || ''
		this.name = data.name || ''
		this.journey = data.journey
		this.position = 0
		this.speed = USE_RAND_TRAIN_SPEED ? getRandom(1, 10) : PX_PER_MIN
		this.station = data.journey.stations[0]
		this.timeAtStation = 0
		this.finalStationReached = false
		this.totalTimeTravelled = 0
	}

	updatePosition (timePassed) {
		let distance = timePassed * this.speed
		this.position += distance
	}

	moveTrain (timePassed) {
		if (timePassed <= 0) return
		// leave the first station
		if (!this.position) { this.leaveStation() }
		// exit if the final station
		if (this.finalStationReached) return
		// update total time travelled
		this.totalTimeTravelled += timePassed
		// if train is at the station leave the station
		if (!USE_RAND_WAIT_TIME && this.station) {
			this.leaveStation()
		}
		// get the next station
		let nextStation = this.journey.nextStation
		// update the train position
		this.updatePosition(timePassed)
		// train reaches the next station
		if (this.position >= nextStation.position) {
			this.finalStationReached = nextStation.isFinalStation
			if (USE_RAND_WAIT_TIME) {
				this.handleArrivalStayAndLeave(timePassed, nextStation)
			} else {
				this.handleStayAndLeave(nextStation)
			}
		}
	}

	handleArrivalStayAndLeave (timePassed, nextStation) {
		// train arrives at the station
		this.position = nextStation.position
		if (this.isInTransit) {
			this.station = nextStation
			this.station.busy = true
		} else {
			// train stays at the station
			this.timeAtStation += timePassed
			// train prepares to leave the station
			if (this.timeAtStation === this.station.waitTime && !this.station.isFinalStation) {
				this.journey.setNextStation()
				this.leaveStation()
			}
		}
	}

	handleStayAndLeave (nextStation) {
		if (this.position === nextStation.position) {
			this.station = nextStation
			this.station.busy = true
		} else {
			this.leaveStation()
		}
		this.journey.setNextStation()
	}

	// reset all station params
	leaveStation () {
		this.timeAtStation = 0
		if (this.station) { this.station.busy = false }
		this.station = null
	}

	// reset the train journey
	reset () {
		this.leaveStation()
		this.position = 0
		this.finalStationReached = false
		this.totalTimeTravelled = 0
		this.station = this.journey.stations[0]
		this.journey.reset()
	}

	get isInTransit () {
		return !this.station
	}
}

export {
	Train
}
