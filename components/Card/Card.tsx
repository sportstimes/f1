import React from "react";

const Card = (props) => {
	return <div className="bg-row-gray rounded-md p-6 mb-10">{props.children}</div>;
};

export default Card;
