import React from "react";

interface Props {
	children: any;
}

class Card extends React.Component<Props> {
	render() {
		return <div className="bg-row-gray rounded-md p-6 mb-10">{this.props.children}</div>;
	};
};

export default Card;
