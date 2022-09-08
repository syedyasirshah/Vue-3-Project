<template>
	<div>
		<div class="forum-header">
			<div class="forum-details">
				<h1>{{ forum.name }}</h1>
				<p class="text-lead">{{ forum.description }}</p>
			</div>
		</div>
		<router-link
			:to="{ name: 'CreateThread', params: { forumId: forum.id } }"
			class="btn-green btn-small"
		>
			Start a thread
		</router-link>
		<div class="col-full push-top">
			<ThreadList :threads="forumThreads" class="col-full push-top" />
		</div>
	</div>
</template>

<script>
import { useStore } from "vuex";

import { ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import ThreadList from "@/components/ThreadList.vue";
//import { threadId } from "worker_threads";
export default {
	name: "SingleForumShow",
	components: { ThreadList },
	props: ["id"],
	setup(props) {
		const store = useStore();
		//console.log("forumId: ", props.id);
		//const forumId = props.id;
		//const forums = ref(sourceData.forums);
		const forums = ref(store.state.forums);

		const forum = computed(() => {
			return forums.value.find((forum) => forum.id === props.id);
		});

		const forumThreads = computed(() => {
			return forum.value.threads.map((threadId) =>
				store.getters.thread(threadId)
			);
			// return store.state.threads.filter(
			// 	(thread) => thread.forumId === props.id
			// );
		});
		return { forum, forumThreads };
	},
};
</script>

<style></style>
