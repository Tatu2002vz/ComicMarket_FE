import path from "../utils/path";
import { Chapter, ComicDetail, Home, Profile, ResetPassword, Payment } from "../pages";
import { DefaultLayout, FullLayout } from "../layouts";
import HeaderOnly from "../layouts/HeaderOnly";
import DefaultLayoutAdmin from '../layouts/admin/Default'
import { ComicManager, DashBoard, UserManager, UpdateUser, UpdateComic, UpdateChapter, ChapterManager, IncomeManager} from '../pages/admin'

const publicRoute = [
  { pathRoute: path.HOME, component: Home, layout: DefaultLayout },
  { pathRoute: path.ALL_COMIC, component: Home, layout: DefaultLayout },
  { pathRoute: path.COMIC, component: ComicDetail, layout: HeaderOnly },
  { pathRoute: path.COMIC_SLUG, component: ComicDetail, layout: HeaderOnly },
  { pathRoute: path.CHAPTER, component: Chapter, layout: FullLayout },
  { pathRoute: path.RESET_PASSWORD, component: ResetPassword, layout: DefaultLayout },
  {pathRoute: path.PROFILE, component: Profile, layout: DefaultLayout},
  {pathRoute: path.PAYMENT, component: Payment, layout: DefaultLayout},
  {pathRoute: path.PAYMENT_SUCCESS, component: Payment, layout: DefaultLayout},

];

export const privateRoute = [
  {pathRoute: path.ADMIN, component: DashBoard, layout: DefaultLayoutAdmin},
  {pathRoute: path.DASHBOARD, component: DashBoard, layout: DefaultLayoutAdmin},
  {pathRoute: path.MANAGER_COMIC, component: ComicManager, layout: DefaultLayoutAdmin},
  {pathRoute: path.MANAGER_USER, component: UserManager, layout: DefaultLayoutAdmin},
  {pathRoute: path.MANAGER_CHAPTER, component: ChapterManager, layout: DefaultLayoutAdmin},
  {pathRoute: path.UPDATE_USER, component: UpdateUser, layout: DefaultLayoutAdmin},
  {pathRoute: path.UPDATE_COMIC, component: UpdateComic, layout: DefaultLayoutAdmin},
  {pathRoute: path.UPDATE_CHAPTER, component: UpdateChapter, layout: DefaultLayoutAdmin},
  {pathRoute: path.MANAGE_INCOME, component: IncomeManager, layout: DefaultLayoutAdmin},
]

export default publicRoute;
