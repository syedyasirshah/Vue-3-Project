<template>
	<div class="col-full">
		<h3>Write Post</h3>
		<Form @submit.prevent="savePost">
			<textarea
				as="textarea"
				name="text"
				v-model="postText"
				rows="10"
				cols="60"
				rules="required"
			/>
			<div class="form-actions">
				<button class="btn-blue">Submit post</button>
			</div>
		</Form>
	</div>
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
	name: "PostEditor",
	props: ["id"],
	emits: ["save"],
	setup(props, { emit }) {
		// console.log(props.id);

		const postText = ref(" ");
		const savePost = () => {
			const post = {
				text: postText.value,

				//publishedAt: Math.floor(Date.now() / 1000),
				threadId: props.id,
				//userId: "jVa6Go6Nl1Urkag1R2p9CHTf4ny1",
			};
			emit("save", { post });
			postText.value = " ";
		};
		return { postText, savePost };
	},
};
</script>

<style></style>
