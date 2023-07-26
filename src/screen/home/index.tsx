import { Button } from '@arco-design/web-react';
import { FC, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { RouterEnum } from '../../router/constans';

export const Home: FC = () => {
    const navigate = useNavigate();

    const tologin = useCallback(() => {
        navigate(RouterEnum.LOGIN, { replace: true });
    }, [navigate]);

    return (
        <div className=" w-screen h-screen flex flex-col items-center justify-center">
            <p className="text-[24px] mb-6">hello, welcome 👋 !!! click button to jump router of login👇️ </p>
            <Button size="large" type="primary" onClick={tologin}>
                jump to login
            </Button>
        </div>
    );
};
Home.displayName = 'Home';
