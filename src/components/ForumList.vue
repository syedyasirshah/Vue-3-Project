<template>
	<div class="col-full">
		<div class="forum-list">
			<router-link v-if="categoryId" :to="`/category/${categoryId}`"
				><h1>{{ categoryName }}</h1></router-link
			>
			<span v-else>{{ categoryName }}</span>
			<div class="forum-listing" v-for="forum in forums" :key="forum.id">
				<div class="forum-details">
					<router-link
						:to="{ name: 'SingleForum', params: { id: forum.id } }"
						class="text-xlarge"
					>
						{{ forum.name }}</router-link
					>

					<p>{{ forum.description }}</p>
				</div>

				<div class="threads-count">
					<p>
						{{ forum.threads?.length }}
						<span>{{
							forum.threads?.length
								? forum.threads?.length > 1
									? "threads"
									: "thread"
								: "no thread"
						}}</span>
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "ForumList",
	props: ["forums", "categoryName", "categoryId"],
	components: {},
};
</script>

<style></style>
