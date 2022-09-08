<template>
	<h1>{{ category.name }}</h1>
	<forum-list
		:categoryName="category.name"
		:forums="categoryForums(category)"
	/>
</template>

<script>
import ForumList from "@/components/ForumList.vue";
import sourceData from "../data.json";
import { ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";

export default {
	name: "Category",
	components: { ForumList },
	props: ["id", "forums", "categoryName", "categoryId"],
	setup(props) {
		const categories = ref(sourceData.categories);

		const category = computed(() => {
			return categories.value.find((category) => category.id === props.id);
		});
		const categoryForums = (category) => {
			return sourceData.forums.filter(
				(forum) => forum.categoryId === category.id
			);
		};
		return { category, categoryForums };
	},
};
</script>

<style></style>
