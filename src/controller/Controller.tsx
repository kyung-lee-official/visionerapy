interface ControllerProps {
	seconds: number;
	timeLeft: number;
	isRunning: boolean;
	onStartTimer: () => void;
	onToggleTimer: () => void;
	onResetTimer: () => void;
	onSecondsChange: (value: number) => void;
}

const Controller = ({
	seconds,
	timeLeft,
	isRunning,
	onStartTimer,
	onToggleTimer,
	onResetTimer,
	onSecondsChange,
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
		<div className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-lg space-y-2 min-w-64">
			<div className="flex items-center space-x-2">
				<label
					htmlFor="seconds-input"
					className="text-sm font-medium text-gray-700"
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
					className="w-20 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
				/>
			</div>

			<div className="text-lg font-semibold text-center text-gray-800">
				Time: {timeLeft}s
			</div>

			<div className="flex space-x-2">
				{!isRunning ? (
					<button
						onClick={onStartTimer}
						disabled={seconds <= 0}
						className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white py-2 px-3 rounded text-sm font-medium transition-colors"
					>
						Start
					</button>
				) : (
					<button
						onClick={onToggleTimer}
						className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-3 rounded text-sm font-medium transition-colors"
					>
						Pause
					</button>
				)}
				<button
					onClick={onResetTimer}
					className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded text-sm font-medium transition-colors"
				>
					Reset
				</button>
			</div>
		</div>
	);
};

export default Controller;
