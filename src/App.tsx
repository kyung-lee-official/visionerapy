import { useState, useEffect, useRef } from "react";
import { chineseChars } from "./assets/chinese-char";
import Controller from "./controller/Controller";
import Display from "./display/Display";
import "./App.css";

function App() {
	const defaultSeconds = 9;
	const [seconds, setSeconds] = useState<number>(defaultSeconds);
	const [timeLeft, setTimeLeft] = useState<number>(defaultSeconds);
	const [isRunning, setIsRunning] = useState<boolean>(false);
	const [currentChars, setCurrentChars] = useState<string[]>([]);
	const intervalRef = useRef<number | null>(null);

	/* Function to get 5 random Chinese characters */
	const getRandomChars = () => {
		/* Use Fisher-Yates shuffle for proper random distribution */
		const array = [...chineseChars];
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array.slice(0, 5);
	};

	/* Start the timer */
	const startTimer = () => {
		if (seconds <= 0) return;

		setIsRunning(true);
		setTimeLeft(seconds);
		setCurrentChars(getRandomChars());

		if (intervalRef.current) {
			window.clearInterval(intervalRef.current);
		}

		intervalRef.current = window.setInterval(() => {
			setTimeLeft((prevTime) => {
				if (prevTime <= 1) {
					/* Timer reached 0, reset with new characters */
					setCurrentChars(getRandomChars());
					return seconds;
				}
				return prevTime - 1;
			});
		}, 1000);
	};

	/* Pause/resume the timer */
	const toggleTimer = () => {
		if (isRunning) {
			setIsRunning(false);
			if (intervalRef.current) {
				window.clearInterval(intervalRef.current);
			}
		} else {
			startTimer();
		}
	};

	/* Reset the timer */
	const resetTimer = () => {
		setIsRunning(false);
		setTimeLeft(seconds);
		if (intervalRef.current) {
			window.clearInterval(intervalRef.current);
		}
	};

	/* Initialize with random characters */
	useEffect(() => {
		setCurrentChars(getRandomChars());
		return () => {
			if (intervalRef.current) {
				window.clearInterval(intervalRef.current);
			}
		};
	}, []);

	return (
		<div className="min-h-screen bg-gray-100 relative">
			<Controller
				seconds={seconds}
				timeLeft={timeLeft}
				isRunning={isRunning}
				onSecondsChange={(value) => {
					setSeconds(value);
					if (!isRunning) {
						setTimeLeft(value);
					}
				}}
				onStartTimer={startTimer}
				onToggleTimer={toggleTimer}
				onResetTimer={resetTimer}
			/>

			<Display currentChars={currentChars} />
		</div>
	);
}

export default App;
