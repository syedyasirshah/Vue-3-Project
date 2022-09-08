<template>
	<div>
		<div class="profile-card">
			<p class="text-center">
				<Img
					:src="user.avatar"
					:alt="`${user.name} profile picture`"
					class="avatar-xlarge"
				/>
			</p>

			<h1 class="title">{{ user.username }}</h1>

			<p class="text-lead">{{ user.name }}</p>

			<p class="text-justify">{{ user.bio || "No bio specified." }}</p>

			<span class="online">{{ user.username }} is online</span>

			<div class="stats">
				<span>{{ user.userPostsCounts }} posts</span>
				<span>{{ user.userThreadsCounts }} threads</span>
			</div>
			<div class="text-center">
				<router-link
					:to="{ name: 'ProfileEditor' }"
					class="btn-green btn-small"
				>
					Edit Profile
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "User",
	props: {
		user: {
			type: Object,
			required: true,
		},
	},
};
</script>

<style></style>
