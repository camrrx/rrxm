import React, { useState, ChangeEvent } from "react";
import "./RadioGroup.scss";

interface RadioGroupBasicProps {
	onValueChange: (value: string) => void;
}

export const RadioGroupBasic: React.FC<RadioGroupBasicProps> = ({
	onValueChange,
}) => {
	const [selectedValue, setSelectedValue] = useState<string>("value1");

	const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setSelectedValue(value);
		onValueChange(value);
	};

	return (
		<div className="radio-input">
			<label>
				<input
					value="value1"
					name="value-radio"
					id="value1"
					type="radio"
					checked={selectedValue === "value1"}
					onChange={handleRadioChange}
				/>
				<span>Upcoming</span>
			</label>
			<label>
				<input
					value="value2"
					name="value-radio"
					id="value2"
					type="radio"
					checked={selectedValue === "value2"}
					onChange={handleRadioChange}
				/>
				<span>A l'affiche</span>
			</label>
			<label>
				<input
					value="value3"
					name="value-radio"
					id="value3"
					type="radio"
					checked={selectedValue === "value3"}
					onChange={handleRadioChange}
				/>
				<span>Les mieux notés</span>
			</label>
			<span className="selection"></span>
		</div>
	);
};
