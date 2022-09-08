<template>
	<div class="container" style="width: 100%">
		<div class="flex-grid">
			<div class="profile-header">
				<div class="col-3 push-top">
					<UserProfileCard :user="user" v-if="!edit" />
					<UserProfileEditor v-else :user="user" />
				</div>
				<!-- <Img
					class="avatar-profile"
					:src="user.avatar"
					:alt="`${user.name} profile picture`"
				/>
			</div>
			<p class="text-name">{{ user.name }}</p> -->
				<div class="col-7 push-top">
					<div class="profile-header">
						<span class="text-lead"> {{ user.username }} recent activity </span>
					</div>

					<PostList :posts="user.userPosts" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { ref } from "@vue/reactivity";

import { computed } from "@vue/runtime-core";
import { mapGetters, useStore } from "vuex";

import PostList from "@/components/PostList.vue";
import UserProfileCard from "@/components/UserProfileCard.vue";
import UserProfileEditor from "@/components/UserProfileEditor.vue";
export default {
	name: "Profile",
	props: {
		edit: {
			type: Boolean,
			default: false,
		},
	},
	components: {
		PostList,
		UserProfileCard,
		UserProfileEditor,
	},
	setup() {
		const store = useStore();
		const user = store.getters.authUser;
		//console.log("posts", user.userPostsCounts);
		//return { authUser: store.getters.authUser };
		// const userPosts = computed(() => {
		// 	return store.state.posts.filter((post) => post.userId === user.id);
		// });
		// console.log("user posts: ", userPosts);
		// const userThreads = computed(() => {
		// 	return store.state.posts.filter((thread) => thread.userId === user.id);
		// });
		// const userPostsCounts = computed(() => {
		// 	return user.userPosts.length;
		// });

		// const userThreadsCounts = computed(() => {
		// 	return store.state.threads.filter((thread) => thread.userId === user.id);
		// });

		return { user };
	},
};
</script>

<style></style>
