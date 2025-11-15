interface DisplayProps {
	currentChars: string[];
}

export const Display = ({ currentChars }: DisplayProps) => {
	return (
		/* Center character display */
		<div className="flex items-center justify-center min-h-screen">
			<div className="flex space-x-8 items-center">
				{currentChars.map((char, index) => (
					<div
						key={index}
						className="text-8xl font-bold text-gray-800 bg-white p-8 rounded-xl shadow-2xl border-2 border-gray-200 min-w-32 min-h-32 flex items-center justify-center"
					>
						{char}
					</div>
				))}
			</div>
		</div>
	);
};
