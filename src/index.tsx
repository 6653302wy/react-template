import { Http } from '@vgene/utils';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { createRoot } from 'react-dom/client';
import './assets/css/global.css';
import { Routers } from './router';
import { GlobalStore } from './store/globalStore';
import { initDayjs } from './utils/dayJsInit';

dayjs.extend(customParseFormat);

// 是否测试环境
const isDev = process.env.ENV === 'test';
const httpConf = {
    baseURL: isDev ? '' : process.env.HTTP_BASE_URL ?? '',
    timeout: 30000,
    // responseWithoutInterceptors: ['company/valid-company-name'],
};
Http.setConfig(httpConf, (code: string, err: string) => {
    // 全局错误的message提示UI
    // Toast.error(err ?? code);
    console.warn(err ?? code);
});

initDayjs();

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <GlobalStore>
        <Routers />
    </GlobalStore>,
);
