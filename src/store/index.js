import { createStore } from "vuex";
import sourceData from "../data.json";
import { findById } from "@/helpers";
export default createStore({
	state: {
		categories: sourceData.categories,
		forums: sourceData.forums,
		threads: sourceData.threads,
		posts: sourceData.posts,
		users: sourceData.users,
		authId: "u4r8XCziZEWEXsj2UIKNHBoDh0n2",
	},

	getters: {
		authUser: (state, getters) => {
			return getters.user(state.authId);
			//const currentUser = state.users.find((user) => user.id === state.authId);
			// 			const currentUser = findById(state.users, state.authId);

			// 			if (!currentUser) return null;
			// 			return {
			// 				...currentUser,

			// 				//authUser.userPosts
			// 				get userPosts() {
			// 					return state.posts.filter((post) => post.userId === currentUser.id);
			// 				},

			// 				get userThreads() {
			// 					return state.threads.filter(
			// 						(thread) => thread.userId === currentUser.id
			// 					);
			// 				},
			// 				get userPostsCounts() {
			// 					//console.log(this);
			// 					return this.userPosts.length;
			// 				},

			// 				get userThreadsCounts() {
			// 					return this.userThreads.length;
			// 				},
			// 			};
		},
		user: (state) => {
			return (id) => {
				//const currentUser = state.users.find((user) => user.id === state.authId);
				const currentUser = findById(state.users, id);

				if (!currentUser) return null;
				return {
					...currentUser,

					//authUser.userPosts
					get userPosts() {
						return state.posts.filter((post) => post.userId === currentUser.id);
					},

					get userThreads() {
						return state.threads.filter(
							(thread) => thread.userId === currentUser.id
						);
					},
					get userPostsCounts() {
						//console.log(this);
						return this.userPosts.length;
					},

					get userThreadsCounts() {
						return this.userThreads.length;
					},
				};
			};
		},
		thread: (state) => {
			return (id) => {
				const thread = findById(state.threads, id);
				return {
					...thread,
					get author() {
						return findById(state.users, thread.userId);
					},
					get repliesCount() {
						return thread.posts.length - 1;
					},
					get contributorsCount() {
						return thread.contributors?.length;
					},
				};
			};
		},
	},

	actions: {
		creatPost({ commit, state, dispatch }, post) {
			//console.log("post", post);
			post.id = "swrfssf" + Math.random() * 4;
			post.userId = state.authId;
			post.publishedAt = Math.floor(Date.now() / 1000);
			commit("setPost", post);
			commit("addPostToThread", { postId: post.id, threadId: post.threadId });
		},
		async createThread({ commit, state, dispatch }, { title, text, forumId }) {
			//console.log("thread data: ", text, title, id);
			const id = "seftgrf" + Math.random();

			const userId = state.authId;
			const publishedAt = Math.floor(Date.now() / 1000);
			const thread = { text, title, forumId, userId, publishedAt, id };
			//console.log(thread);
			commit("setThread", { thread });
			commit("addthreadToForum", { thread });
			commit("addthreadToUser", { thread });

			dispatch("creatPost", { text, threadId: id });

			//return state.threads.find((thread) => thread.id === id);
			return findById(state.threads, id);
		},
		async updateThread({ state, commit }, { text, title, id }) {
			//console.log("updated:", text, title, id);

			const thread = state.threads.find((thread) => thread.id === id);
			//const post = state.posts.find((post) => post.id === thread.posts[0]);
			const post = findById(state.posts, thread.posts[0]);

			//console.log("thread ,post", thread, post);
			const newThread = { ...thread, title };
			const newPost = { ...post, text };
			//console.log("new ", newPost, newThread);
			commit("setThread", { thread: newThread });
			commit("setPost", newPost);
			return newThread;
		},
		updateUser({ commit }, user) {
			commit("setUser", { user, userId: user.id });
		},
	},
	mutations: {
		setPost(state, post) {
			//console.log("mutation post:", post);
			const postIndex = state.posts.findIndex((p) => p.id === post.id);
			//console.log(postIndex);
			if (post.id && postIndex !== -1) {
				state.posts[postIndex] = post;
			} else {
				state.posts.push(post);
			}
		},
		setThread(state, { thread }) {
			//console.log("payload", payload.thread.id);
			const threadIndex = state.threads.findIndex((t) => t.id === thread.id);
			//console.log(threadIndex);
			if (thread.id && threadIndex !== -1) {
				state.threads[threadIndex] = thread;
			} else {
				state.threads.push(thread);
			}
		},
		addPostToThread(state, { threadId, postId }) {
			//console.log("thread payload", payload);
			const thread = state.threads.find((thread) => thread.id === threadId);
			//console.log("thread: ", thread);
			thread.posts = thread.posts || [];
			thread.posts.push(postId);
		},
		addthreadToForum(state, { thread }) {
			//console.log("forum payload", thread);
			//const forum = state.forums.find((forum) => forum.id === thread.forumId);
			const forum = findById(state.forums, thread.forumId);

			//console.log("forum: ", forum);
			forum.threads = forum.threads || [];
			forum.threads.push(thread.id);
			//console.log(forum);
		},
		addthreadToUser(state, { thread }) {
			console.log("user payload", thread);

			//const user = state.users.find((user) => user.id === thread.userId);
			const user = findById(state.users, thread.userId);

			//console.log("user: ", user);
			user.threads = user.threads || [];
			user.threads.push(thread.id);
			console.log("user", user);
		},
		setUser(state, payload) {
			const userIndex = state.users.findIndex(
				(user) => user.id === payload.userId
			);
			state.users[userIndex] = payload.user;
		},
	},
	modules: {},
});
