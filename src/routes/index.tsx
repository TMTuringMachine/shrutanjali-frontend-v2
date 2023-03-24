import { Component, FunctionComponent, Suspense, lazy } from 'react';

//libs
import { Navigate, useRoutes } from 'react-router-dom';

//components
import LoadingScreen from '../components/LoadingScreen';
import AboutGuru from '../pages/About/about.page';

const Loadable = (Component: FunctionComponent) => (props: any) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: '*',
      element: <UserLayout />,
      children: [
        { path: 'coming-soon', element: <ComingSoon /> },
        { path: 'maintenance', element: <Maintenance /> },
        { path: '500', element: <Page500 /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    {
      path: '/',
      element: <LandingPage />,
    },
    {
      path: '/',
      element: <UserLayout />,
      children: [
        {
          path: '/home',
          element: <Home />,
        },
        {
          path: '/about',
          element: <AboutGuru />,
        },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

const ComingSoon = Loadable(lazy(() => import('../components/ComingSoon')));
const Maintenance = Loadable(lazy(() => import('../components/Maintenance')));
const Page500 = Loadable(lazy(() => import('../components/Page500')));
const NotFound = Loadable(lazy(() => import('../components/Page404')));

//pages
const LandingPage = Loadable(
  lazy(() => import('../pages/Landing/landing.page'))
);
const Home = Loadable(lazy(() => import('../pages/Home/home.page')));

//layouts
const UserLayout = Loadable(lazy(() => import('../layouts/user/user.layout')));
