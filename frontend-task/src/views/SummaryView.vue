<template>
    <div class="text-center">
        <h3 class="py-2 border-top border-bottom">Train summary</h3>
        <table v-if="journeys.length" class="table">
            <thead>
                <tr>
                    <th>Position</th>
                    <th>Train</th>
                    <th>Stops</th>
                    <th>Time Travelled</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(journey, index) in sortedJourneys"
                    :key="journey.name + index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ journey.name }}</td>
                    <td>{{ journey.stops }}</td>
                    <td v-if="journey.finished">
                        {{ journey.time }} minutes
                    </td>
                    <td v-else-if="!journey.time">
                        Not started.
                    </td>
                    <td v-else>{{ journey.time }} minutes</td>
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
                sortedJourneys: []
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
                    this.sortedJourneys = this.journeys.map(journey => {
                        return {
                            name: journey.train.name,
                            stops: journey.stations.length,
                            finished: journey.train.finalStationReached,
                            time: journey.train.totalTimeTravelled
                        }
                    })
                    this.sortedJourneys.sort((a, b) => a.time - b.time)
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