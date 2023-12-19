import React from "react";

interface Props {
	children: any;
}

const Card: FunctionComponent<Props> = ({ children }: Props) => {
	return <div className="bg-row-gray rounded-md p-6 mb-10">{children}</div>;
}

export default Card;
