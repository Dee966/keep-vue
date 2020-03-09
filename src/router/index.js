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
import MaLogin from "../components/manager/MaLogin";
import RegCus from "../components/manager/RegCus";
import Hearder from "../components/manager/Hearder";
import LogCus from "../components/manager/LogCus";
import LogCoach from "../components/manager/LogCoach";
import RegCoach from "../components/manager/RegCoach";
import MaShare from "../components/manager/MaShare";
import CheckCode from "../components/my/CheckCode";
import LeaveCoach from "../components/manager/LeaveCoach";
import LeaveCus from "../components/manager/LeaveCus";

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
    {path: '/attendance', name: 'attendanceLink', component: Attendance},

    {path: '/maLogin', name: 'maLoginLink', component: MaLogin},
    {path: '/heard', name: 'logCusLink', component: Hearder,children:
        [
        {path: '/regCus', name: 'regCusLink', component: RegCus},
        {path: '/logCus', name: 'logCusLink', component: LogCus},
        {path: '/logCoach', name: 'logCoachLink', component: LogCoach},
        {path: '/regCoach', name: 'regCoachLink', component: RegCoach},
        {path: '/maShare', name: 'maShareLink', component: MaShare},
        {path: '/checkCode', name: 'checkCodeLink', component: CheckCode},
        {path: '/leaveCus', name: 'leaveCusLink', component: LeaveCus},
        {path: '/leaveCoach', name: 'leaveCoachLink', component: LeaveCoach},
        ]
    },

  ],
  // mode:"history"
})
