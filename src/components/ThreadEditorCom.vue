<template>
	<div>
		<h3>Thread Editor</h3>
		<div class="profile-card">
			<Form @submit.prevent="save">
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
					<button class="btn btn-ghost" @click.prevent="cancel">Cancel</button>
					<button class="btn btn-blue" type="submit" name="Publish">
						{{ existing ? "Update" : "Publish" }}
					</button>
				</div>
			</Form>
		</div>
	</div>
</template>

<script>
import { computed, reactive } from "@vue/runtime-core";
export default {
	name: "ThreadEditorCom",
	props: {
		title: { type: String, default: "" },
		text: { type: String, default: "" },
	},

	setup(props, { emit }) {
		const formData = reactive({
			title: props.title,
			text: props.text,
		});
		const existing = computed(() => {
			return !!formData.title;
		});
		console.log("existing", existing.value);
		// const forum = computed(() => {
		// 	return store.state.forums.find((forum) => forum.id === props.forumId);
		// });
		const save = () => {
			emit("save", { ...formData });
			console.log("formData", formData);
		};
		const cancel = () => {
			emit("cancel");
		};
		return { formData, save, cancel, existing };
	},
};
</script>

<style></style>
