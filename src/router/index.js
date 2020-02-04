import Vue from 'vue'
import Router from 'vue-router'
import Login from "../components/login/Login";
import Ip from "../components/login/Ip";
import Home from "../components/home/Home";
import Share from "../components/share/Share";
import My from "../components/my/My";
import Comment from "../components/share/Comment"
import PostShare from "../components/share/PostShare";
import UpdatePass from "../components/my/UpdatePass";
import InputPass from "../components/my/InputPass";
import ChooseCoach from "../components/my/ChooseCoach";
import CoachMy from "../components/my/CoachMy";
import Attendance from "../components/my/Attendance";

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', name: 'ipLink', component: Ip},
    {path: '/login', name: 'loginLink', component: Login},
    {path: '/home', name: 'homeLink', component: Home},
    {path: '/share', name: 'shareLink', component: Share},
    {path: '/my', name: 'myLink', component: My},
    {path: '/coachMy', name: 'coachMyLink', component: CoachMy},
    {path: '/comment/:id', name: 'commentLink', component: Comment},
    {path: '/postShare', name: 'postShareLink', component: PostShare},
    {path: '/updPass', name: 'updPassLink', component: UpdatePass},
    {path: '/inputPass', name: 'inputPassLink', component: InputPass},
    {path: '/chooseCoach', name: 'chCoachLink', component: ChooseCoach},
    {path: '/attendance', name: 'attendanceLink', component: Attendance}
  ]
})
