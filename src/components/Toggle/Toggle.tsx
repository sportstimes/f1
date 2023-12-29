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
					<CollapsedIcon className="" aria-expanded="false" aria-label="Toggle Row" />
				) : (
					<OpenIcon className="" aria-expanded="true" aria-label="Toggle Row" />
				)}
			</>
		);
	}
}

export default Toggle;
