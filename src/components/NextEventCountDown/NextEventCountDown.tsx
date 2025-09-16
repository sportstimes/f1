import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import './styles.css';
import { MoonLoader } from "react-spinners";

interface NextEventCountDownProps {
    nextSessionName: string;
    nextSessionTime: string;
}

const NextEventCountDown: React.FC<NextEventCountDownProps> = ({
    nextSessionName,
    nextSessionTime,
}) => {
    const [timeLeft, setTimeLeft] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = dayjs();
            const sessionTime = dayjs(nextSessionTime);
            const diff = sessionTime.diff(now);

            if (diff <= 0) {
                setTimeLeft('00:00:00');
                clearInterval(interval);
            } else {
                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((diff % (1000 * 60)) / 1000);
                setTimeLeft(
                    `${days.toString().padStart(2,'0')}:${hours.toString().padStart(2, '0')}:${minutes
                        .toString()
                        .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
                );
            }

            setIsLoading(false); // Set loading to false once timeLeft is calculated
        }, 1000);

        return () => clearInterval(interval);
    }, [nextSessionTime]);

    if (isLoading) {
        return <MoonLoader color="#058852" size={30} aria-label="Loading CountDown" data-testid="loader" />
        ;
    }

    const [days,hours, minutes, seconds] = timeLeft.split(':');
    return (
        <div className="countdown">
            {timeLeft === '00:00:00' ? (
                <div className="countdown-wrapper">
                    <div className="countdown-started">
                        <span className="in-live">
                            <span className="red-circle" aria-hidden={true}></span>
                            {'IN LIVE'}
                        </span>
                        - {nextSessionName} {'STARTED'}
                    </div>
                </div>
            ) : (
                <div className="countdown-wrapper">
                    <h1 className="countdown__title">Next Session: {nextSessionName}</h1>
                    <div className="countdown__items">
                    <div className="countdown-item">
                            <span className="countdown-value">{days}</span>
                            <span className="countdown-label">DAYS</span>
                        </div>
                        <div className="countdown-item">
                            <span className="countdown-value">{hours}</span>
                            <span className="countdown-label">HOURS</span>
                        </div>
                        <div className="countdown-item">
                            <span className="countdown-value">{minutes}</span>
                            <span className="countdown-label">MINUTES</span>
                        </div>
                        <div className="countdown-item">
                            <span className="countdown-value">{seconds}</span>
                            <span className="countdown-label">SECONDS</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NextEventCountDown;
