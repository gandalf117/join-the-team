<template>
    <table class="table">
        <thead>
            <tr>
                <th class="name">Name</th>
                <th class="name-route">Name / Route</th>
                <th class="route">Route</th>
                <th class="timetable">Timetable</th>
                <th class="timetable-concise">Timetable</th>
                <th class="next-station">Next Station</th>
                <th>Train</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(journey, index) in journeys"
                :key="journey.name + index">
                <td class="name">{{ journey.name }}</td>
                <td class="name-route">{{ journey.name }} / {{ journey.route }}</td>
                <td class="route">{{ journey.route }}</td>
                <td class="timetable">
                    <railroad-component
                        :journey="journey">
                    </railroad-component>
                </td>
                <td class="timetable-concise">
                    <div v-for="(station, index) in journey.stations"
                         :key="station.name + index">
                        {{ station.time }} {{ station.name }}
                    </div>
                </td>
                <td class="next-station">{{ journey.nextStation.name }}</td>
                <td>{{ journey.train.name }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import RailroadComponent from '@/components/RailroadComponent'

export default {
  name: 'timetable-component',
  components: {
    RailroadComponent
  },
  props: {
    journeys: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang='scss'>
	.table {
		th {
            background: #FC2B82;
            color: white;
        }
	}

    .name-route,
    .timetable-concise {
        display: none;
    }

    .timetable {
        min-width: 620px;
        padding: 0px 10px;
    }

    .next-station {
        width: 150px;
    }

    @media (min-width: 1024px) and (max-width: 1299px) {
        .name, .route {
            display: none;
        }
        .name-route {
            display: block;
        }
    }

    @media (max-width: 1024px) {
        .timetable, .next-station {
            display: none;
        }
        .timetable-concise {
            display: block;
        }
    }
</style>
