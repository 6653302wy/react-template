import { createRoot } from 'react-dom/client';
import './assets/css/global.css';
import { Routers } from './router';
import { GlobalStore } from './store/globalStore';
import '@arco-design/web-react/dist/css/arco.css';
// import { swRegister } from './utils/sw/swRegister';
// swRegister();

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <GlobalStore>
        <Routers />
    </GlobalStore>,
);
