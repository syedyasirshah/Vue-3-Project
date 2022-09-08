<template>
	<div class="post-list">
		<div class="post" v-for="post in posts" :key="post.id">
			<div v-if="userById(post.userId)" class="user-info">
				<a href="#" class="user-name">{{ userById(post.userId).name }}</a>

				<a href="#">
					<Img class="avatar-large" :src="userById(post.userId).avatar" />
				</a>

				<p class="desktop-only text-small">
					{{ userById(post.userId).postsCount }} posts
				</p>
				<p class="desktop-only text-small">
					{{ (userById(post.userId).threadsCount = 1 ? "thread" : "threads") }}
				</p>
				<!-- <p :title="HumanFriendlyDates(post.publishedAt)">
					{{ dateFunction(post.publishedAt) }}
				</p> -->
				<AppDate :timestamp="post.publishedAt" />
				<div class="post-content">
					{{ post.text }}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import sourceData from "../data.json";

import { ref } from "@vue/reactivity";
import AppDate from "../components/AppDate.vue";
import store from "@/store";
export default {
	name: "PostList",
	components: { AppDate },
	props: ["posts"],
	setup() {
		const users = ref(sourceData.users);
		const forums = ref(sourceData.forums);
		// console.log(forums);
		const userById = (userId) => {
			return store.getters.user(userId);
			//return users.value.find((user) => user.id === userId);
			//return users.value.find((user) => user.id ===)
		};

		return { users, userById };
	},
};
</script>

<style></style>
