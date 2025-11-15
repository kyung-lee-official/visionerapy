import { useState, useEffect } from "react";
import { Store } from "@tauri-apps/plugin-store";
import { sizeLabels } from "./size-map";

interface FontSizeSliderProps {
	onFontSizeChange: (size: string) => void;
}

export const FontSizeSlider = ({ onFontSizeChange }: FontSizeSliderProps) => {
	const [fontSize, setFontSize] = useState<string>("l"); // Default to large (text-8xl)
	const [store, setStore] = useState<Store | null>(null);

	/* Initialize store on component mount */
	useEffect(() => {
		const initStore = async () => {
			try {
				const newStore = await Store.load(".settings.dat");
				setStore(newStore);

				// Load saved font size
				const savedSize = await newStore.get<string>("fontSize");
				if (savedSize) {
					setFontSize(savedSize);
					onFontSizeChange(savedSize);
				}
			} catch (error) {
				console.error("Failed to initialize store:", error);
			}
		};
		initStore();
	}, []);

	/* Handle font size change and save to store */
	const handleFontSizeChange = async (newSize: string) => {
		setFontSize(newSize);
		onFontSizeChange(newSize);

		if (store) {
			try {
				await store.set("fontSize", newSize);
				await store.save();
			} catch (error) {
				console.error("Failed to save font size:", error);
			}
		}
	};

	return (
		<div className="flex flex-col space-y-2">
			<label className="text-sm font-medium text-gray-700">
				Font Size: {sizeLabels[fontSize as keyof typeof sizeLabels]}
			</label>
			<div className="relative pt-1">
				<input
					type="range"
					min="0"
					max="2"
					step="1"
					value={["s", "m", "l"].indexOf(fontSize)}
					onChange={(e) => {
						const sizes = ["s", "m", "l"];
						const newSize = sizes[parseInt(e.target.value)];
						handleFontSizeChange(newSize);
					}}
					className="w-full h-2 bg-neutral-400 rounded-lg appearance-none cursor-pointer slider"
				/>
				<div className="flex justify-between text-xs text-neutral-300 mt-1">
					<span>S</span>
					<span>M</span>
					<span>L</span>
				</div>
			</div>
		</div>
	);
};
