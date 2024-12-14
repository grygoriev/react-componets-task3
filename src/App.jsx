import styles from './App.module.css';
import { useState } from 'react';

const BUTTONS = [
	'7', '8', '9', '/',
	'4', '5', '6', '*',
	'1', '2', '3', '-',
	'C', '0', '=', '+'
];

export const App = () => {
	const [operand1, setOperand1] = useState('0');
	const [operand2, setOperand2] = useState('');
	const [operator, setOperator] = useState('');

	const performCalculation = () => {
		const result = eval(`${operand1}${operator}${operand2}`);
		clear(String(result));
	};

	const isOperator = item => ['+', '-', '/', '*'].includes(item);
	const isEqual = item => item === '=';
	const isCansel = item => item === 'C';

	const isOperand1Done = operator !== '' && operator !== '=' && operand2 === '';
	const isReadyToCalc = operand2 !== '' && isOperator(operator);
	const isResultDone = operand1 !== '0' && operator === '=';

	const clear = (newOperand1 = '0') => {
		setOperand1(newOperand1);
		setOperand2('');
		setOperator(newOperand1 === '0' ? '' : '=');
		return newOperand1;
	};

	const calculate = (item) => {
		if (isCansel(item)) {
			clear();
			return;
		}
		if (isOperator(item)) {
			setOperator(item);
			return;
		}
		if (isEqual(item) || isResultDone) {
			if (isReadyToCalc) {
				performCalculation();
			}
			return;
		}
		if (isOperand1Done) {
			setOperand2((operand2) => operand2 + item);
		} else if (operand1 === '0') {
				setOperand1(item);
		} else {
			setOperand1((operand1) => operand1 + item);
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.calculator}>
				<div className={isResultDone ? `${styles.display} ${styles.result}` : `${styles.display} ${styles.calc}`}>
					{operator === '=' ? operand1 : operand1 + operator + operand2}
				</div>
				<div className={styles.buttons}>
					{BUTTONS.map((item) => {
						let btnClass = styles.button;
						if (isOperator(item))
							btnClass += ' ' + styles.operator;
						if (isEqual(item)) btnClass += ' ' + styles.equal;
						if (item === 'C') btnClass += ' ' + styles.clear;

						return (
							<button
								className={btnClass}
								key={item}
								onClick={() => calculate(item)}
							>
								{item}
							</button>
						);
					})}
				</div>
			</div>
		</div>
	);
};
