<template><category-list :categories="categories" /></template>
<script>
//import sourceData from "../data.json";
import { useStore } from "vuex";
import CategoryList from "@/components/CategoryList.vue";
//import { ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";

export default {
	name: "HomeView",
	components: { CategoryList },
	setup() {
		const store = useStore();
		console.log("users: ", store.state.users);
		//const categories = ref(sourceData.categories);
		const categories = computed(() => {
			console.log("store data:", store.state.categories);
			return store.state.categories;
		});

		return { categories };
	},
};
</script>
<style></style>
