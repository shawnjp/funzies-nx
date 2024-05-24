import React, { useEffect, useRef } from 'react';

const AudioVisualizer = ({ audioSrc }: { audioSrc: string }) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!audioRef.current || !canvasRef.current) return;

        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const analyser = audioContext.createAnalyser();
        const source = audioContext.createMediaElementSource(audioRef.current);
        source.connect(analyser);
        analyser.connect(audioContext.destination);

        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;

        analyser.fftSize = 256;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const renderFrame = () => {
            requestAnimationFrame(renderFrame);
            analyser.getByteFrequencyData(dataArray);
            ctx.fillStyle = 'rgb(0, 0, 0)';
            ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);

            let barWidth = (canvasRef.current.width / bufferLength) * 2.5;
            let barHeight;
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
                barHeight = dataArray[i];
                ctx.fillStyle = `rgb(${barHeight + 100}, 50, 50)`;
                ctx.fillRect(x, canvasRef.current.height - barHeight / 2, barWidth, barHeight / 2);
                x += barWidth + 1;
            }
        };

        renderFrame();
    }, []);

    return (