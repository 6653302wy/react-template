import { FC } from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { NotFound } from '../screen/404';
import { AppLayOut } from '../screen/app-layout';
import { Index } from '../screen/index';
import { RoutersMap } from './routeList';

export const Routers: FC = () => {
    return (
        <BrowserRouter basename={process.env.ROUTER_BASE}>
            <Routes>
                <>
                    <Route index element={<Index />} />
                    <Route path="*" element={<NotFound />} />
                    <Route>
                        {RoutersMap.single.map((route, index) => {
                            return <Route key={index} path={route.path} element={route.element} />;
                        })}
                    </Route>
                    <Route
                        element={
                            <AppLayOut>
                                <Outlet />
                            </AppLayOut>
                        }
                    >
                        {RoutersMap.layout.map((route, index) => {
                            return <Route key={index} path={route.path} element={route.element} />;
                        })}
                    </Route>
                </>
            </Routes>
        </BrowserRouter>
    );
};

Routers.displayName = 'Routers';
