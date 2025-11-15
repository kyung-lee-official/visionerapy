import { sizeMap } from "../font-size-slider/size-map";

interface DisplayProps {
	currentChars: string[];
	fontSize: string;
}

export const Display = ({ currentChars, fontSize }: DisplayProps) => {
	return (
		/* Center character display */
		<div className="flex items-center justify-center min-h-screen">
			<div className="flex space-x-8 items-center">
				{currentChars.map((char, index) => (
					<div
						key={index}
						className={`flex items-center justify-center min-w-32 min-h-32 p-8
						${sizeMap[fontSize as keyof typeof sizeMap]} font-bold text-neutral-100 
						rounded-xl shadow-2xl`}
					>
						{char}
					</div>
				))}
			</div>
		</div>
	);
};
