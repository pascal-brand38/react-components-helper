import React from 'react';
interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
}
declare const Button: ({ className, ...props }: Props) => JSX.Element;
export default Button;
