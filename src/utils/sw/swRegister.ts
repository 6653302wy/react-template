import { register } from 'register-service-worker';

export const swRegister = () => {
    console.log('注册sw');
    register('/sw.js', {
        registrationOptions: { scope: './' },
        ready(registration: any) {
            console.log('Service worker is active.', registration);
        },
        registered(registration: any) {
            console.log('Service worker has been registered.', registration);
        },
        cached(registration: any) {
            console.log('Content has been cached for offline use.', registration);
        },
        updatefound(registration: any) {
            console.log('New content is downloading.', registration);
        },
        updated(registration: any) {
            console.log('New content is available; please refresh.', registration);
        },
        offline() {
            console.log('No internet connection found. App is running in offline mode.');
        },
        error(error) {
            console.error('Error during service worker registration:', error);
        },
    });
};
