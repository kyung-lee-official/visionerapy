import { FontSizeSlider } from "../font-size-slider/FontSizeSlider";

interface ControllerProps {
	seconds: number;
	timeLeft: number;
	isRunning: boolean;
	onStartTimer: () => void;
	onToggleTimer: () => void;
	onResetTimer: () => void;
	onSecondsChange: (value: number) => void;
	onFontSizeChange: (size: string) => void;
}

export const Controller = ({
	seconds,
	timeLeft,
	isRunning,
	onStartTimer,
	onToggleTimer,
	onResetTimer,
	onSecondsChange,
	onFontSizeChange,
}: ControllerProps) => {
	/* Handle input change */
	const handleSecondsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseInt(e.target.value);
		if (!isNaN(value) && value > 0) {
			onSecondsChange(value);
		}
	};
	return (
		/* Upper right controls */
		<div className="absolute top-4 right-4 bg-neutral-700 p-4 rounded-lg shadow-lg space-y-2 min-w-64">
			<div className="flex items-center space-x-2">
				<label
					htmlFor="seconds-input"
					className="text-sm font-medium text-neutral-300"
				>
					Seconds:
				</label>
				<input
					id="seconds-input"
					type="number"
					min="1"
					value={seconds}
					onChange={handleSecondsChange}
					disabled={isRunning}
					className="w-20 px-2 py-1 border border-neutral-500 text-sm text-neutral-300
					disabled:bg-neutral-800
					rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
			</div>

			<div className="text-lg font-semibold text-center text-neutral-300">
				Time: {timeLeft}s
			</div>

			<div className="flex space-x-2">
				{!isRunning ? (
					<button
						onClick={onStartTimer}
						disabled={seconds <= 0}
						className="flex-1 bg-green-500/60 hover:bg-green-600 disabled:bg-gray-400 text-white py-2 px-3 rounded text-sm font-medium transition-colors"
					>
						Start
					</button>
				) : (
					<button
						onClick={onToggleTimer}
						className="flex-1 bg-yellow-500/60 hover:bg-yellow-600 text-white py-2 px-3 rounded text-sm font-medium transition-colors"
					>
						Pause
					</button>
				)}
				<button
					onClick={onResetTimer}
					className="flex-1 bg-red-500/60 hover:bg-red-600 text-white py-2 px-3 rounded text-sm font-medium transition-colors"
				>
					Reset
				</button>
			</div>

			<FontSizeSlider onFontSizeChange={onFontSizeChange} />
		</div>
	);
};
