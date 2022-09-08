import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SingleThreadShow from "@/views/SingleThreadShow.vue";
import PageNotFound from "../views/PageNotFound";
import SingleForumShow from "../views/SingleForumShow";
import Category from "../views/Category.vue";
import Profile from "../views/Profile.vue";
//import UserProfileEditor from "../components/UserProfileEditor";
import CreateNewThread from "../views/CreateNewThread";
import EditThread from "../views/EditThread";

import sourceData from "../data.json";
const routes = [
	{
		path: "/",
		name: "home",
		component: HomeView,
	},
	{
		path: "/thread/:id",
		name: "SingleThread",
		component: SingleThreadShow,
		props: true,
		beforeEnter(to, from, next) {
			//console.log("to: ", to, "from: ", from);
			const threadExist = sourceData.threads.find((thread) => {
				return thread.id === to.params.id;
			});
			//console.log(threadExist.id);
			if (threadExist) {
				return next();
			} else {
				next({
					name: "NotFound",
					params: { pathMatch: to.path.substring(1).split("/") },
					// preserve existing query and hash
					query: to.query,
					hash: to.hash,
				});
			}
		},
	},
	{
		path: "/thread/:id/edit",
		name: "EditThread",
		component: EditThread,
		props: true,
	},
	{
		path: "/forum/:id",
		name: "SingleForum",
		component: SingleForumShow,
		props: true,
	},
	{
		path: "/forum/:forumId/thread/create",
		name: "CreateThread",
		component: CreateNewThread,
		props: true,
	},
	{
		path: "/me",
		name: "Profile",
		component: () =>
			import(/* webpackChunkName: "Profile" */ "@/views/Profile"),
		meta: { toTop: true, smoothScroll: true },
	},
	{
		path: "/me/edit",
		name: "ProfileEditor",
		component: Profile,
		props: { edit: true },
		//meta: { requiresAuth: true },
	},
	{
		path: "/category/:id",
		name: "Category",
		component: Category,
		props: true,
	},
	{ path: "/:pathMatch(.*)*", name: "NotFound", component: PageNotFound },
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
	scrollBehavior(to) {
		const scroll = {};
		if (to.meta.toTop) scroll.top = 0;
		if (to.meta.smoothScroll) scroll.behavior = "smooth";

		return scroll;
	},
});

export default router;
