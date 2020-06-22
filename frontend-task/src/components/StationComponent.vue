<template>
	<div class="station"
		 :class="{ 'selected': station.busy }"
		 :title="station.name"
		 :style="`left: ${station.position}px`">
		<div class="icon"></div>
		<div class="line"></div>
		<div class="time">{{ station.time }}</div>
	</div>
</template>

<script>
	import { Station } from '@/classes/Station'

	export default {
		name: 'station-component',
		props: {
			station: {
				type: Station,
				required: true
			}
		}
	}
</script>

<style lang='scss'>
	.station {
		position: absolute;
		height: 60px;
		width: 20px;
		margin-left: -10px;
		top: -25px;
		.icon {
			position: absolute;
			top: 0px;
			height: 16px;
			width: 20px;
			margin-left: 2px;
			background: url('../../assets/station.svg');
			background-size: 100%;
			border-radius: 25px;
		}
		.line {
			position: absolute;
			top: 20px;
			height: 28px;
			width: 3px;
			margin-left: 10px;
			background: black;
		}
		.time {
			position: absolute;
			top: 60px;
			left: -7px;
			transform: rotate(270deg);
		}
	}

	.station.selected {
		.icon, .line {
			background-color: yellow;
		}
	}
</style>
