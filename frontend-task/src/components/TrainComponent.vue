<template>
	<div class="train" :style="`left: ${position}px`"></div>
</template>

<script>
	import { mapState } from 'vuex'
	import { Journey } from '@/classes/Journey'

	export default {
		name: 'train-component',
		props: {
			journey: {
				type: Journey,
				required: true
			}
		},
		computed: {
			...mapState({
				minutes: state => state.clockModule.minutes
			}),
			train () {
				return this.journey.train
			},
			position () {
				return this.train.position
			}
		},
		watch: {
			minutes (newVal, oldVal) {
				let timePassed = newVal - oldVal
				this.train.moveTrain(timePassed)
			}
		}
	}
</script>

<style lang='scss'>
	.train {
		position: absolute;
		height: 16px;
		width: 16px;
		padding: 1px;
		margin-left: -7px;
		background: url('../../assets/train.svg');
		background-size: 100%;
		background-color: white;
		border-radius: 25px;
	}
</style>
