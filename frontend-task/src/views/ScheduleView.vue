<template>
	<div>
		<div class="d-flex flex-column flex-md-row align-items-center mb-3">
			<h3 class="mr-md-auto">
				Jiminny Trainspotting
				<span class="control-btns">
					<button
						v-if="!isClockRunning"
						type="button"
						class="ml-3 btn btn-outline-primary"
						@click="startClock()">
						<span v-if="!isStarted">Start</span>
						<span v-else>Continue</span>
					</button>
					<button
						v-if="isClockRunning"
						type="button"
						class="ml-3 btn btn-outline-primary"
						@click="pauseClock()">
						Pause
					</button>
					<button
						type="button"
						class="ml-3 btn btn-outline-primary"
						@click="resetClock(); resetTrainPosition()">
						Reset
					</button>
				</span>
			</h3>
			<div class="my-2 my-md-0 control-info">
				<span class="p-2">
					<span class="font-weight-bold">Trains in transit: </span>
					<span v-if="trainsInTransit">
						{{ trainsInTransit }}
					</span>
					<span v-else>None</span>
				</span>
				<span class="p-2">
					<span class="font-weight-bold">Current Time: </span>
					<span>{{ currentTime }}</span>
				</span>
			</div>
		</div>

		<div class="schedule">
			<timetable-component
				:journeys="journeys">
			</timetable-component>
		</div>
  	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import TimetableComponent from '@/components/TimetableComponent'

export default {
  name: 'schedule-view',
  data () {
    return {
      tableLoaded: false
    }
  },
  components: {
    TimetableComponent
  },
  computed: {
    ...mapState({
      currentTime: state => state.clockModule.currentTime,
      isClockRunning: state => state.clockModule.isClockRunning,
      minutes: state => state.clockModule.minutes,
      journeys: state => state.timetableModule.journeys
    }),
    isStarted () {
      return this.minutes > 0
    },
    isFinished () {
      return this.minutes >= 120
    },
    trainsInTransit () {
      const trains = this.journeys.filter(journey => {
        return journey.train.isInTransit
      }).map(journey => journey.train.name)
      return trains.join(',')
    }
  },
  methods: {
    ...mapActions([
      'startClock',
      'pauseClock',
      'resetClock',
      'getJourneys'
    ]),
    resetTrainPosition () {
      for (const journey of this.journeys) {
        journey.train.reset()
      }
    }
  },
  created () {
    this.getJourneys().then(() => {
      this.tableLoaded = true
    })
  }
}
</script>

<style lang='scss'>
	#app {
		font-family: sans-serif;
		width: 90%;
		margin: 30px auto;
	}

	.schedule {
        overflow: auto;
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
	}

    @media (max-width: 1024px) {
        .control-btns,
		.control-info {
            display: none;
        }
    }
</style>
