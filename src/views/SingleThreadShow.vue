<template>
	<div>
		<h3>
			{{ thread.title }}

			<router-link
				:to="{ name: 'EditThread', params: { id: threadId } }"
				class="btn-green btn-small"
				tag="button"
			>
				Edit Thread
			</router-link>
		</h3>
		<p>
			By <a href="#" class="link-unstyled">{{ thread.author?.name }}</a
			>, <AppDate :timestamp="thread.publishedAt" />.
			<span
				style="float: right; margin-top: 2px"
				class="hide-mobile text-faded text-small"
			>
				{{ thread.repliesCount }}
				{{ thread.repliesCount === 1 ? "reply" : "replies" }}
				by {{ thread.contributorsCount }}
				{{ thread.contributorsCount === 1 ? "contributor" : "contributors" }}
			</span>
		</p>
		<PostList :posts="threadPosts" />
		<PostEditor @save="addPost" :id="id" />
	</div>
</template>

<script>
import { computed } from "@vue/runtime-core";
import { ref } from "@vue/reactivity";
import sourceData from "../data.json";
//import { useRoute } from "vue-router";
import PostList from "@/components/PostList.vue";
import PostEditor from "@/components/PostEditor.vue";
import { useStore } from "vuex";

export default {
	name: "SingleThreadShow",
	components: { PostList, PostEditor },
	props: ["id"],

	setup(props) {
		// console.log(props);
		//const route = useRoute();
		const threadId = props.id;
		console.log("thread show:", props.id);
		const store = useStore();

		const threads = ref(sourceData.threads);
		const posts = ref(sourceData.posts);
		//console.log("threads: ", threads);
		const postById = (postId) => {
			return posts.value.find((post) => post.id === postId);
		};
		const addPost = (postData) => {
			console.log(postData);
			const post = {
				...postData.post,
			};
			store.dispatch("creatPost", post);
			// posts.value.push(post);
			// thread.value.posts.push(post.id);

			postData.text = " ";
		};
		const thread = computed(() => {
			return store.getters.thread(threadId);
		});
		const threadPosts = computed(() => {
			return posts.value.filter((post) => post.threadId === props.id);
		});
		return { threads, posts, postById, thread, threadPosts, addPost, threadId };
	},
};
</script>

<style></style>
