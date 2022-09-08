<template>
	<div class="profile-card">
		<h3>Edit Profile</h3>

		<Img
			:src="activeUser.avatar"
			:alt="`${activeUser.name} profile picture`"
			class="avatar-xlarge img-update"
		/>
		<form @submit.prevent="saveChanges">
			<input
				class="form-input"
				type="text"
				label="Username"
				name="username"
				v-model="activeUser.username"
			/><br />
			<input
				class="form-input"
				type="text"
				label="Full Name"
				name="name"
				v-model="activeUser.name"
			/><br />
			<input
				class="form-input"
				type="email"
				label="Full Name"
				name="email"
				v-model="activeUser.email"
			/>
			<div style="font-size: 18px">
				<span>{{ activeUser.userPostsCounts }} posts</span>
				<span style="margin-left: 10px"
					>{{ activeUser.userThreadsCounts }} threads</span
				>
			</div>
			<div class="btn-group space-between">
				<button class="btn-ghost" @click.prevent="cancelEdit">Cancel</button>
				<button type="submit" class="btn-blue">Save</button>
			</div>
		</form>

		<hr />
	</div>
</template>

<script>
import { reactive } from "@vue/reactivity";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
	name: "UserProfileEditor",
	props: ["user"],
	setup(props) {
		const activeUser = reactive({ ...props.user });
		const store = useStore();
		const router = useRouter();
		console.log("Router:", router);
		const saveChanges = () => {
			//console.log("save user");
			store.dispatch("updateUser", { ...activeUser });
			router.push({ name: "Profile" });
		};
		const cancelEdit = () => {
			//console.log("save user");

			router.push({ name: "Profile" });
		};
		console.log("active user", activeUser);
		return { activeUser, saveChanges, cancelEdit };
	},
};
</script>

<style></style>
