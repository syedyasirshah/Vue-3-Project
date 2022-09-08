<template>
	<div>
		<h2>Edit Thread</h2>

		<div class="col-full push-top">
			<h1>
				<h3>Editing... {{ thread.title }}</h3>
			</h1>
			<ThreadEditorCom
				:title="thread.title"
				:text="text"
				@save="save"
				@cancel="cancel"
			/>
			<!-- <div class="profile-card">
				<Form @submit.prevent="saveUpdate">
					<label for="">Title:</label>
					<input
						style="padding: 10px; margin-bottom: 10px; width: 400px"
						type="text"
						label="Title"
						name="title"
						v-model="updateForm.title"
						rules="required"
					/><br />
					<p>Text:</p>
					<textarea
						type="text"
						label="Content"
						name="text"
						v-model="updateForm.text"
						rules="required"
						rows="20"
						cols="100"
					/>

					<div class="btn-group">
						<button class="btn btn-ghost" @click="cancel">Cancel</button>
						<button class="btn btn-blue" type="submit" name="Publish">
							{{ update ? "Update" : Publish }}
						</button>
					</div>
				</Form>
			</div>-->
		</div>
	</div>
</template>

<script>
import { computed, reactive } from "@vue/runtime-core";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import ThreadEditorCom from "@/components/ThreadEditorCom.vue";

export default {
	name: "EditThread",
	props: ["id"],
	components: { ThreadEditorCom },
	setup(props) {
		const store = useStore();
		const router = useRouter();

		const thread = computed(() => {
			// console.log("threads dsts", store.state.threads[0].id);
			// console.log(props.id);
			return store.state.threads.find((thread) => thread.id === props.id);
		});

		//console.log(thread.value);

		const text = computed(() => {
			return store.state.posts.find((post) => post.id === thread.value.posts[0])
				.text;
		});
		//console.log("post", postText.value);

		// const update = computed(() => {
		// 	return !!updateForm.title;
		// });
		// const updateForm = reactive({
		// 	title: thread.value.title,
		// 	text: postText.value,
		// });
		const save = ({ title, text }) => {
			console.log("edit page", title, text);
			store.dispatch("updateThread", {
				title,
				text,
				id: props.id,
			});
			router.push({ name: "SingleThread", params: { id: props.id } });
		};
		const cancel = () => {
			router.push({ name: "SingleThread", params: { id: props.id } });
		};

		return { thread, text, save, cancel };
	},
};
</script>

<style></style>
