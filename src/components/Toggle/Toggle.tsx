import React, {Component} from "react";
import OpenIcon from "../Icons/OpenIcon"
import CollapsedIcon from "../Icons/CollapsedIcon"

export interface Props {
  collapsed: Boolean;
}

class Toggle extends React.Component<Props> {
	
	render() {
		return (
			<>
				{this.props.collapsed ? (
					<CollapsedIcon className="" />
				) : (
					<OpenIcon className="" />
				)}
			</>
		);
	}
}

export default Toggle;
