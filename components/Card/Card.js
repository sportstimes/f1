import React from "react";

const Card = (props) => {
	return <div className="bg-row-gray rounded-md p-6">{props.children}</div>;
};

export default Card;
