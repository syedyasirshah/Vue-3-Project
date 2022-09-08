<template>
	<div class="col-full push-top">
		<h1>
			Create new thread in <i>{{ forum.name }}</i>
		</h1>
		<ThreadEditorCom @save="save" @cancel="cancel" />
		<!-- <div class="profile-card">
			<Form @submit.prevent="saveThread">
				<label for="">Title:</label>
				<input
					style="padding: 7px; margin-bottom: 10px"
					type="text"
					label="Title"
					name="title"
					v-model="formData.title"
					rules="required"
				/><br />
				<p>Text:</p>
				<textarea
					type="text"
					label="Content"
					name="text"
					v-model="formData.text"
					rules="required"
					rows="8"
					cols="80"
				/>

				<div class="btn-group">
					<button class="btn btn-ghost" @click="cancel">Cancel</button>
					<button class="btn btn-blue" type="submit" name="Publish">
						Publish
					</button>
				</div>
			</Form>
		</div> -->
	</div>
</template>

<script>
import { reactive, ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";
import { useRouter, useRoute } from "vue-router";
import ThreadEditorCom from "@/components/ThreadEditorCom.vue";

export default {
	name: "CreateThread",
	components: { ThreadEditorCom },
	props: ["forumId"],
	setup(props) {
		const router = useRouter();
		const store = useStore();
		const forumId = props.forumId;
		//console.log("id", id);
		// const formData = reactive({
		// 	title: " ",
		// 	text: " ",
		// });
		const forum = computed(() => {
			return store.state.forums.find((forum) => forum.id === forumId);
		});
		const save = async ({ title, text }) => {
			//console.log("create thread", title, text, forumId);
			const thread = await store.dispatch("createThread", {
				forumId,
				title,
				text,
			});
			router.push({ name: "SingleThread", params: { id: thread.id } });
		};
		const cancel = () => {
			router.push({ name: "SingleForum", params: { id: forumId } });
		};

		return { save, forum, cancel };
	},
};
</script>

<style></style>
