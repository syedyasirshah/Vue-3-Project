<template>
	<div class="col-full">
		<div class="thread-list">
			<h2 class="list-title">Threads</h2>

			<div v-if="threads.length">
				<div v-for="thread in threads" :key="thread.id" class="thread">
					<div>
						<p>
							<router-link
								:to="{ name: 'SingleThread', params: { id: thread.id } }"
							>
								{{ thread.title }}</router-link
							>
						</p>
						<p class="text-faded text-xsmall">
							By <a href="#">{{ userById(thread.userId).name }}</a
							>, <AppDate :timestamp="thread.publishedAt" />.
						</p>
					</div>

					<div class="activity">
						<p class="replies-count">{{ thread.repliesCount }} replies</p>

						<img class="avatar-medium" :src="userById(thread.userId).avatar" />

						<div>
							<p class="text-xsmall">
								<a href="#">{{ userById(thread.userId).name }}</a>
							</p>
							<p class="text-xsmall text-faded">
								{{ thread.publishedAt }}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div v-if="!threads.length" style="padding: 10px; text-align: center">
			<em>No Threads Available</em>
		</div>
	</div>
</template>

<script>
import { ref } from "@vue/reactivity";
import sourceData from "../data.json";
import { useStore } from "vuex";

export default {
	name: "ThreadList",
	props: ["threads"],
	components: {},
	setup() {
		//const threads = ref(sourceData.threads);
		const store = useStore();
		const posts = ref(store.state.posts);

		const users = ref(store.state.users);

		const postById = (postId) => {
			return posts.value.find((post) => post.id === postId);
		};
		const userById = (userId) => {
			return users.value.find((user) => user.id === userId);
		};
		return { posts, users, postById, userById };
	},
};
</script>

<style></style>
