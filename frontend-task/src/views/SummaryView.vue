<template>
    <div class="text-center">
        <h3 class="py-2 border-top border-bottom">Train summary</h3>
        <table v-if="journeys.length" class="table">
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Train</th>
                    <th>Speed</th>
                    <th>Stops</th>
                    <th>Time Travelled</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(train, index) in sortedTrains"
                    :key="train.name + index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ train.name }}</td>
                    <td>{{ train.speed }}</td>
                    <td>{{ train.stops }}</td>
                    <td v-if="train.finished">
                        {{ train.time }} minutes
                    </td>
                    <td v-else-if="!train.time">
                        Not started.
                    </td>
                    <td v-else>{{ train.time }} minutes</td>
                </tr>
            </tbody>
        </table>
        <div v-else class="alert alert-info" role="alert">
            Summary is not available yet.
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'summary-view',
  data () {
    return {
      sortedTrains: []
    }
  },
  computed: {
    ...mapState({
      journeys: state => state.timetableModule.journeys
    })
  },
  watch: {
    journeys: {
      deep: true,
      handler () {
        this.sortedTrains = this.journeys.map(journey => {
          return {
            name: journey.train.name,
            speed: journey.train.speed,
            stops: journey.stations.length,
            finished: journey.train.finalStationReached,
            time: journey.train.totalTimeTravelled
          }
        })
        this.sortedTrains.sort((a, b) => a.time - b.time)
      }
    }
  }
}
</script>

<style lang='scss'>
	.table {
        width: 500px;
		th {
            background: #FC2B82;
            color: white;
        }
	}
</style>
