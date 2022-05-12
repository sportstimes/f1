import React, {Component} from "react";
import OpenIcon from "../Icons/OpenIcon"
import CollapsedIcon from "../Icons/CollapsedIcon"

class Toggle extends React.Component {
	
	render() {
		return (
			<>
				{this.props.collapsed ? (
					<CollapsedIcon />
				) : (
					<OpenIcon />
				)}
				<aria-hidden
					className={`${
						this.props.collapsed
							? "fas fa-caret-right fa-xs"
							: "fas fa-caret-down fa-xs"
					}`}
				/>
			</>
		);
	}
}

export default Toggle;
