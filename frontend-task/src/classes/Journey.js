import { Train } from './Train'
import { Station } from './Station'
import { MultipleItems } from './MultipleItems'
import moment from 'moment'

class Journey extends MultipleItems {
  constructor (data) {
    super()
    this.name = data.name || ''
    this.route = data.route || ''
    const train = data.train || {}
    this.stations = Station.asItems(data.timetable, Station)
    train.journey = this
    this.train = new Train(train)
    this.nextStation = this.stations[1]
  }

  get totalTime () {
    const firstDate = this.stations[0].date
    const lastDate = this.stations[this.stations.length - 1].date
    const ms = lastDate.diff(firstDate)
    return moment.duration(ms).asMinutes()
  }

  // sets the next station on the journey timetable
  setNextStation () {
    let nextIndex = this.stations.findIndex(station => {
      return station.name === this.nextStation.name
    }) + 1
    nextIndex = nextIndex === this.stations.length ? nextIndex - 1 : nextIndex
    this.nextStation = this.stations[nextIndex]
    this.nextStation.isFinalStation = nextIndex + 1 === this.stations.length
  }

  reset () {
    this.nextStation = this.stations[1]
  }
}

export {
  Journey
}
