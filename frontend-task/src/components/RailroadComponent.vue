<template>
	<div>
		<div class="track" :style="`width: ${getRailroadLength()}px`">
			<station-component
				v-for="(station, index) in journey.stations"
				:key="station.name + index"
				:station="station">
			</station-component>
			<train-component :journey="journey"></train-component>
  		</div>
  	</div>
</template>

<script>
	import { Journey } from '@/classes/Journey'
	import StationComponent from '@/components/StationComponent'
	import TrainComponent from '@/components/TrainComponent'
	import { PX_PER_MIN } from '@/config.js'

	export default {
		name: 'railroad-component',
		components: {
			StationComponent,
			TrainComponent
		},
		data () {
			return {
			}
		},
		props: {
			journey: {
				type: Journey,
				required: true
			}
		},
		methods: {
			getRailroadLength () {
				return this.journey.totalTime * PX_PER_MIN
			}
		}
	}
</script>

<style lang='scss'>
	.track {
		position: relative;
		height: 16px;
		margin-top: 30px;
		margin-bottom: 50px;
		background: url('../../assets/road-texture.jpg');
	}
</style>
