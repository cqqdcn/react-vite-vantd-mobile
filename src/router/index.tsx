import { createHashRouter } from "react-router-dom";
import Home from "@/pages/home";
import My from "@/pages/my";
import Layout from "@/pages/layout";
import CallList from "@/pages/callList";
import Video from "@/pages/video";
import Detail from "@/pages/detail";
import KeepAlive from 'react-activation'
import Search from "@/pages/search";
import SearchList from "@/pages/search/searchList";
import Login from "@/pages/login";
import Dongtai from "@/pages/my/dongtai"
import Fans from "@/pages/my/fans";
import Profile from "@/pages/my/profile";
import { AutoRoute } from "@/components/autoRoute";
const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [{
      index: true,
      element: <KeepAlive cacheKey="UNIQUE_home"><Home /></KeepAlive>,
    },
    {
      path: "CallList",
      element: <CallList />
    },
    {
      path: "my",
      element: <AutoRoute><My /></AutoRoute>,
    },
    {
      path: "video",
      element: <Video />,
    }]
  },
  {
    path: "/my/dongtai",
    element: <Dongtai />
  },
  {
    path: "/my/fans",
    element: <Fans />
  },
  {
    path: "/my/profile",
    element: <Profile />
  },
  {
    path: "/detail",
    element: <Detail />
  }
  ,
  {
    path: "/search",
    element: <Search />
  },
  {
    path: "/searchList",
    element: <SearchList />
  },
  {
    path: "/login",
    element: <Login />
  }
])

export { router }