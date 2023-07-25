/* eslint-disable max-lines-per-function */
import { Button, Input, Spin } from '@arco-design/web-react';
import axios from 'axios';
import { FC, useCallback, useLayoutEffect, useRef, useState } from 'react';

const LoadingView: FC<{ loading: boolean; onStart: () => void }> = ({ loading, onStart }) => {
    return (
        <div
            className="w-screen h-screen absolute top-0 left-0  z-10 flex justify-center items-center "
            style={{ background: 'rgba(0,0,0, 0.7)' }}
        >
            {loading ? <Spin dot /> : <Button onClick={onStart}>开始</Button>}
        </div>
    );
};

const videoList = [
    { url: 'https://villaland-web-dev.oss-cn-shanghai.aliyuncs.com/assets-test/idle.mp4', text: '' },
    {
        url: 'https://villaland-web-dev.oss-cn-shanghai.aliyuncs.com/assets-test/text.mp4',
        text: '\n虽然我目前还不能像真人主持一样那么麻溜的和您对话，但是 我可以做数据分析 资料收集，我可以成为最强助理！ 我们数字人连着AI大脑 有超强的学习能力！',
    },
];
export const Index: FC = () => {
    const [loading, setloading] = useState(true);
    const [start, setstart] = useState(false);
    const [idleVideoVisible, setIdleVideoVisible] = useState(true);
    const [answerTextList, setanswerTextList] = useState<string[]>([]);
    const [inputText, setinputText] = useState('');

    const idleRef = useRef<HTMLVideoElement>(null);
    const textVideoRef = useRef<HTMLVideoElement>(null);

    const setTextVideoSrc = useCallback((src: string) => {
        if (!textVideoRef.current) return;

        textVideoRef.current?.pause(); // 正在播放的文本视频停止
        textVideoRef.current.src = src;
    }, []);

    const onPlayEnd = useCallback(() => {
        setTextVideoSrc('');
        setIdleVideoVisible(true);
    }, [setTextVideoSrc]);

    const onPlayText = useCallback(() => {
        axios.post('http://localhost:3000/api/question').then((data) => {
            console.log('data: ', data);
        });
        setinputText('');

        setIdleVideoVisible(true); // 显示idle，隐藏当前播放
        idleRef.current?.play(); // 重新播放idle动画
        // textVideoRef.current?.pause(); // 正在播放的文本视频停止
        setTextVideoSrc('');

        const value = videoList[1];
        setTextVideoSrc(value.url);
        setanswerTextList((pre) => {
            const list = [...pre];
            list.push(value.text);
            return list;
        });
    }, [setTextVideoSrc]);

    const onTextVideoMounted = useCallback(() => {
        if (!textVideoRef.current) return;

        setIdleVideoVisible(false);
        textVideoRef.current.play();
    }, []);

    const onIdleReady = useCallback(() => {
        setloading(false);
    }, []);

    useLayoutEffect(() => {
        if (!start) return;

        idleRef.current?.play();
    }, [start]);

    return (
        <div className=" w-screen h-screen flex flex-col items-center justify-center">
            <div className=" relative w-[618px] h-[347px]">
                <video
                    autoPlay
                    loop
                    ref={idleRef}
                    className="w-full h-full absolute top-0 left-0"
                    style={{ display: idleVideoVisible ? 'block' : 'none' }}
                    src={videoList[0].url}
                    preload={videoList[0].url}
                    onCanPlay={onIdleReady}
                />
                <video
                    ref={textVideoRef}
                    className="w-full h-full absolute top-0 left-0"
                    style={{ display: idleVideoVisible ? 'none' : 'block' }}
                    // src={videoSrc}
                    onCanPlay={onTextVideoMounted}
                    onEnded={onPlayEnd}
                />
            </div>

            <div className=" my-4 relative w-[618px] flex flex-col justify-center items-center">
                <div className="w-[350px] h-[400px]  overflow-y-auto">
                    {answerTextList.map((text, index) => (
                        <p className="m-2 bg-[#F6F7F9] p-2 rounded-sm " key={index}>
                            {text}
                        </p>
                    ))}
                </div>

                <Input
                    value={inputText}
                    onChange={(value) => setinputText(value)}
                    className="my-4"
                    style={{ width: 350 }}
                    allowClear
                />

                <Button type="primary" onClick={onPlayText}>
                    发送
                </Button>
            </div>

            {!start && <LoadingView loading={loading} onStart={() => setstart(true)} />}
        </div>
    );
};
Index.displayName = 'Index';
