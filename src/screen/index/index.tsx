import { FC } from 'react';

export const Index: FC = () => {
    return (
        <div>
            <p className="text-primary-base  text-text18">测试主题色</p>
            <div className="rounded-lg text-primary-white w-[100px] h-[100px] bg-primary-base shadow-sm">容器</div>
            <p className=" text  text-primary-hover ">测试文本</p>
        </div>
    );
};
Index.displayName = 'Index';
