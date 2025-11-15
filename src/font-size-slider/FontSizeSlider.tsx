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
			<div className="flex space-x-2">
				{["s", "m", "l"].map((size) => (
					<button
						key={size}
						onClick={() => handleFontSizeChange(size)}
						className={`flex-1 py-2 px-3 rounded text-sm font-medium transition-colors ${
							fontSize === size
								? "bg-blue-500 text-white"
								: "bg-gray-200 text-gray-700 hover:bg-gray-300"
						}`}
					>
						{sizeLabels[size as keyof typeof sizeLabels]}
					</button>
				))}
			</div>
		</div>
	);
};
