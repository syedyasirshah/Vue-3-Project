<template>
	<header class="header">
		<router-link :to="{ name: 'home' }" class="logo">
			<div style="dispaly: flex">
				<img style="margin-left: 10px" src="../assets/svg/vueschool-logo.svg" />
			</div>
		</router-link>

		<div>
			<router-link :to="{ name: 'Profile' }"
				><Img class="avatar-small" :src="user.avatar" :alt="`${user.name} `" />
				<p>{{ user.name }}</p></router-link
			>
		</div>
	</header>
</template>

<script>
import { computed } from "@vue/runtime-core";
import { mapGetters, useStore } from "vuex";
export default {
	name: "TheNavbar",
	setup() {
		const store = useStore();

		const user = store.getters.authUser;
		//console.log("getter data", user);
		return { user };
	},
};
</script>

<style></style>
