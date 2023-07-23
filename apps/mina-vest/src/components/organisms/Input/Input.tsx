import * as React from "react";
import Children from "react-children-utilities";

import {
	InputButton,
	InputCurrency,
	InputIcon,
	InputLabel,
	InputMax,
	InputStatus,
} from "./Compound";
import { cx } from "src/utils";

type InputProps =
	| {
			value: string;
			setValue: React.Dispatch<React.SetStateAction<string>>;
			className?: string;
			placeholder: string;
			name: string;
			wrapperClassName?: string;
			// validate: typeof inputValidationTypes[number];
			type: "email";
	  }
	| {
			value: string;
			setValue: React.Dispatch<React.SetStateAction<string>>;
			className?: string;
			placeholder: string;
			name: string;
			wrapperClassName?: string;
			// validate: typeof inputValidationTypes[number];
			type: "number";
	  }
	| {
			value: string;
			setValue: React.Dispatch<React.SetStateAction<string>>;
			className?: string;
			placeholder: string;
			name: string;
			wrapperClassName?: string;
			// validate: typeof inputValidationTypes[number];
			type: "number";
	  }
	| {
			value: string;
			setValue: React.Dispatch<React.SetStateAction<string>>;
			className?: string;
			placeholder: string;
			name: string;
			wrapperClassName?: string;
			// validate: typeof inputValidationTypes[number];
			type: "password";
	  }
	| {
			value: string;
			setValue: React.Dispatch<React.SetStateAction<string>>;
			className?: string;
			placeholder: string;
			name: string;
			wrapperClassName?: string;
			// validate: typeof inputValidationTypes[number];
			type: "text";
	  };

const renderInput = (
	type: InputProps["type"],
	name: InputProps["name"],
	className: InputProps["className"],
	value: InputProps["value"],
	setValue: InputProps["setValue"],
) => {
	const defaultClassnames = "";
	if (type === "text") {
		return (
			<input
				type="text"
				id={name}
				name={name}
				className={cx(defaultClassnames, className)}
				value={value}
				onChange={(e) => {
					setValue(e.currentTarget.value);
				}}
			/>
		);
	}
	if (type === "password") {
		return (
			<input
				autoComplete="new-password"
				type="password"
				id={name}
				name={name}
				className={cx(defaultClassnames, className)}
				value={value}
				onChange={(e) => {
					setValue(e.currentTarget.value);
				}}
			/>
		);
	}
	if (type === "email") {
		return (
			<input
				autoComplete="email"
				type="email"
				id={name}
				name={name}
				className={cx(defaultClassnames, className)}
				value={value}
				onChange={(e) => {
					setValue(e.currentTarget.value);
				}}
			/>
		);
	}
	if (type === "number") {
		const inputNumberClassName = cx(
			defaultClassnames,
			"Input--Number",
			className,
		);

		return (
			<input
				autoComplete="off"
				// @ts-ignore Not sure why
				incremental
				type="number"
				id={name}
				name={name}
				className={inputNumberClassName}
				value={value}
				onChange={(e) => {
					setValue(e.currentTarget.value);
				}}
			/>
		);
	}

	throw new Error("Input type is not correct");
};

// const inputValidationTypes = [
// 	"username",
// 	"password",
// 	"repeat_password",
// 	"birth_year",
// 	"email",
// ] as const;

const Input: React.FC<React.PropsWithChildren<InputProps>> & {
	Button: typeof InputButton;
	Currency: typeof InputCurrency;
	Icon: typeof InputIcon;
	Label: typeof InputLabel;
	Max: typeof InputMax;
	Status: typeof InputStatus;
} = ({
	type,
	value = "",
	setValue,
	// validate = "",
	placeholder,
	name,
	// getIsValid,
	children,
	className = "",
	wrapperClassName = "",
}) => {
	const [showError, setShowError] = React.useState<boolean>(false);

	const runValidation = () => {
		// const { error } = schema.validate({
		// 	[validate]: value,
		// });
		// setShowError(!!error);
		// if (getIsValid) {
		// 	getIsValid(!error && value.length > 0);
		// }
	};

	// React.useEffect(() => {
	// 	if (validate && value) {
	// 		runValidation();
	// 	}

	// 	let tm: number;

	// 	if (value === "") {
	// 		tm = setTimeout(() => {
	// 			setShowError(false);
	// 		}, 3000);
	// 	}

	// 	return () => {
	// 		clearTimeout(tm);
	// 	};
	// }, [value]);

	const buttonComponent = Children.filter(children, (item) =>
		Boolean(
			item &&
				React.isValidElement(item) &&
				item.type &&
				item.type === InputButton,
		),
	)[0];
	const labelComponent = Children.filter(children, (item) =>
		Boolean(
			item &&
				React.isValidElement(item) &&
				item.type &&
				item.type === InputLabel,
		),
	)[0];
	const statusComponent = Children.filter(children, (item) =>
		Boolean(
			item &&
				React.isValidElement(item) &&
				item.type &&
				item.type === InputStatus,
		),
	)[0];
	const iconComponent = Children.filter(children, (item) =>
		Boolean(
			item &&
				React.isValidElement(item) &&
				item.type &&
				item.type === InputIcon,
		),
	)[0];
	const maxComponent = Children.filter(children, (item) =>
		Boolean(
			item &&
				React.isValidElement(item) &&
				item.type &&
				item.type === InputMax,
		),
	)[0];
	const currencyComponent = Children.filter(children, (item) =>
		Boolean(
			item &&
				React.isValidElement(item) &&
				item.type &&
				item.type === InputCurrency,
		),
	)[0];

	return (
		<div
			className={cx("max-w-full", {
				[wrapperClassName]: wrapperClassName,
			})}
		>
			{(labelComponent || maxComponent) && (
				<div className="mb-2 flex items-end justify-between">
					{labelComponent}
					{!labelComponent && <div></div>}
					{maxComponent}
				</div>
			)}

			<label
				className={cx(
					"flex h-14 w-full cursor-text flex-row items-center gap-6 overflow-hidden rounded border-gray-600 bg-mina-white border-mina-grey border",
					{
						[className]: className,
						"bg-orange-700": showError,
					},
				)}
				htmlFor={name}
			>
				{iconComponent && (
					<div className={"flex items-center justify-center pl-6"}>
						{iconComponent}
					</div>
				)}
				{!iconComponent && <div></div>}

				<div className="relative w-full cursor-text">
					{renderInput(
						type,
						name,
						cx(
							"z-10 w-full text-base text-black bg-transparent border-none outline-none  placeholder:text-transparent placeholder:bg-transparent",
						),
						value,
						setValue,
					)}
					{!value && (
						<p className="pointer-events-none absolute top-[50%] left-0 z-10 -translate-y-[50%] whitespace-nowrap">
							{placeholder}
						</p>
					)}
				</div>
				{(currencyComponent || buttonComponent) && (
					<div className="ml-auto flex self-stretch whitespace-nowrap">
						{currencyComponent}
						{buttonComponent}
					</div>
				)}
			</label>
			{statusComponent && (
				<div
					className={cx("InputWrapper__Status", {
						"InputWrapper__Status--Hidden": !showError,
					})}
				>
					{statusComponent}
				</div>
			)}
		</div>
	);
};

Input.Button = InputButton;
Input.Currency = InputCurrency;
Input.Icon = InputIcon;
Input.Label = InputLabel;
Input.Max = InputMax;
Input.Status = InputStatus;

export { Input };
