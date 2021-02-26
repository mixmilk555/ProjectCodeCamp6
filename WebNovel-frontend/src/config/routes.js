import AppHome from '../component/pages/home';
import AppHome2 from '../component/pages/home2';
import LoginPage from '../component/pages/Login';
import RegisterPage from '../component/pages/Register';
import ReadPage from '../component/pages/ReadPage';
import WritingPage from '../component/pages/WritingPage';
import AllChapterPage from '../component/pages/AllChapter';
import MyNovelPage from '../component/pages/MyNovelPage/MyNovel';
import CreateChapterPage from '../component/pages/EditChapter/CreateChapter';
import EditChapterPage from '../component/pages/EditChapter/EditChapter';

const components = {
    home: {
        url: '/',
        component: AppHome
    },
    home2: {
        url: '/home',
        component: AppHome2
    }
    ,
    login: {
        url: '/login',
        component: LoginPage
    },
    register: {
        url: '/register',
        component: RegisterPage
    },
    read: {
        url: '/readPage/:id/:chapterId',
        component: ReadPage
    },
    allChapter: {
        url: '/allChapter/:id',
        component: AllChapterPage
    },
    writing: {
        url: '/writing',
        component: WritingPage
    },
    myNovel: {
        url: '/myNovel',
        component: MyNovelPage
    },
    createChapter: {
        url: '/createChapter/:id',
        component: CreateChapterPage
    },
    editChapter: {
        url: '/editChapter/:id/:chapterId',
        component: EditChapterPage
    },
  
}

export default {
    guest: {
        allowedRoutes: [
            components.home,
            components.login,
            components.register,
            components.read,
            components.allChapter
        ],
        redirectRoutes: '/login'
    },
    user: {
        allowedRoutes: [
            components.home,
            components.read,
            components.allChapter,
            components.writing,
            components.myNovel,
            components.createChapter,
            components.editChapter,
        ],
        redirectRoutes: '/'
    }
}