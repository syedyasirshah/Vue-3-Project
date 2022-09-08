<template>
	<ForumList
		v-for="category in categories"
		:key="category.id"
		:categoryName="category.name"
		:forums="categoryForums(category)"
		:categoryId="category.id"
	/>
</template>

<script>
//
import { useStore } from "vuex";

import ForumList from "../components/ForumList.vue";

export default {
	name: "CategoryList",
	components: { ForumList },
	props: ["categories"],
	setup() {
		const store = useStore();
		function categoryForums(category) {
			const forum = store.state.forums.filter(
				(forum) => forum.categoryId === category.id
			);

			return forum;
		}

		return { categoryForums };
	},
};
</script>

<style></style>
