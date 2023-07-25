import { setCacheNameDetails, clientsClaim } from 'workbox-core';
import { createHandlerBoundToURL } from 'workbox-precaching';
import { precacheAndRoute } from 'workbox-precaching/precacheAndRoute';
import { NavigationRoute, registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, NetworkOnly } from 'workbox-strategies';

// 设置缓存名称
setCacheNameDetails({
    prefix: 'app',
    suffix: 'v0.0.1',
});

// 更新时自动生效
clientsClaim();

// 预缓存文件，self.__WB_MANIFEST是workbox生成的文件地址数组，项目中打包生成的所有静态文件都会自动添加到里面
precacheAndRoute(self.__WB_MANIFEST || []);

// 单页应用需要应用NavigationRoute进行缓存，此处可自定义白名单和黑名单
// 跳过登录和退出页面的拦截
const handler = createHandlerBoundToURL('/index.html');
const navigationRoute = new NavigationRoute(handler, {
    denylist: [/login/, /logout/],
});
registerRoute(navigationRoute);
// 运行时缓存配置
// 接口数据使用服务端数据
registerRoute(/^api/, new NetworkOnly());

// 图片cdn地址，属于跨域资源，我们使用StaleWhileRevalidate缓存策略
registerRoute(/^https:\/\/img.xxx.com\//, new StaleWhileRevalidate());
