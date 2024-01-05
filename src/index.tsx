import { createRoot } from 'react-dom/client';
import './assets/css/global.css';
import { Routers } from './router';
import { GlobalStore } from './store/globalStore';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <GlobalStore>
        <Routers />
    </GlobalStore>,
);
