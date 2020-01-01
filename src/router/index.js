import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../pages/login/login.vue";
import Home2 from "../pages/home/home2.vue";
// 路由懒加载
const Welcome = () => import("../pages/welcome.vue");
const Job = () => import("../pages/firm/job.vue");
const Firm = () => import("../pages/firm/firm.vue");
const Article = () => import("../pages/article/article.vue");
const Candidate = () => import("../pages/talent/candidate.vue");
const Talents = () => import("../pages/talent/talents.vue");
const Referrer = () => import("../pages/refer/referrer.vue");
const ModuleTest = () => import("../pages/refer/moduleTest.vue");
const Module = () => import("../pages/backManage/module.vue");
const Role = () => import("../pages/backManage/role.vue");
const Password = () => import("../pages/backManage/password.vue");
const Accout = () => import("../pages/backManage/accout.vue");
const AddFirm = () => import("../pages/firm/addFirm.vue");
const JobDetail = () => import("../pages/firm/jobDetail.vue");
const AddJob = () => import("../pages/firm/addJob.vue");
const Intention = () => import("../pages/firm/intention.vue");
const AddArticle = () => import("../pages/article/addArticle.vue");
const AddModule = () => import("../pages/backManage/addModule.vue");
const AddRole = () => import("../pages/backManage/addRole.vue");

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home2"
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/home2",
    name: "home2",
    component: Home2,
    children: [
      {
        path: "/welcome",
        name: "welcome",
        component: Welcome
      },
      {
        path: "/firm",
        name: "firm",
        component: Firm
      },
      {
        path: "/addFirm",
        name: "addFirm",
        component: AddFirm
      },
      {
        path: "/jobDetail",
        name: "jobDetail",
        component: JobDetail
      },
      {
        path: "/job",
        name: "job",
        component: Job
      },
      {
        path: "/addJob",
        name: "addJob",
        component: AddJob
      },
      {
        path: "/article",
        name: "article",
        component: Article
      },
      {
        path: "/addArticle",
        name: "addArticle",
        component: AddArticle
      },
      {
        path: "/intention",
        name: "intention",
        component: Intention
      },
      {
        path: "/candidate",
        name: "candidate",
        component: Candidate
      },
      {
        path: "/talents",
        name: "talents",
        component: Talents
      },
      {
        path: "/referrer",
        name: "referrer",
        component: Referrer
      },
      {
        path: "/moduleTest",
        name: "moduleTest",
        component: ModuleTest
      },
      {
        path: "/module",
        name: "module",
        component: Module
      },
      {
        path: "/addModule",
        name: "addModule",
        component: AddModule
      },
      {
        path: "/role",
        name: "role",
        component: Role
      },
      {
        path: "/addRole",
        name: "addRole",
        component: AddRole
      },
      {
        path: "/password",
        name: "password",
        component: Password
      },
      {
        path: "/accout",
        name: "accout",
        component: Accout
      }
    ]
  }
];

const router = new VueRouter({
  routes
});
// 路由守卫
router.beforeEach((to, from, next) => {
  // to表示将要访问的路径
  // form从哪个路径跳转来
  // next是一个函数表示放行
  if (to.path === "/login") return next();
  // 获取token
  const tokenStr = window.sessionStorage.getItem("token");
  if (!tokenStr) return next("/login");
  next();
});

export default router;
