<template>
	<span :title="humanFriendlyDate">
		{{ dateFunction }}
	</span>
</template>

<script>
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { computed } from "@vue/runtime-core";

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
export default {
	name: "AppDate",
	props: {
		timestamp: {
			required: true,
			type: Number,
		},
	},
	setup(props) {
		const dateFunction = computed(() => {
			return dayjs.unix(props.timestamp).fromNow();
		});
		const humanFriendlyDate = computed(() => {
			return dayjs.unix(props.timestamp).format("L LT");
		});
		return { dateFunction, humanFriendlyDate };
	},
};
</script>

<style></style>
