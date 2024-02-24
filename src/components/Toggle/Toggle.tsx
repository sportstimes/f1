import React, {Component} from "react";
import OpenIcon from "../Icons/OpenIcon"
import CollapsedIcon from "../Icons/CollapsedIcon"

export interface Props {
  collapsed: Boolean;
}

class Toggle extends React.Component<Props> {
	
	render() {
		if(this.props.collapsed){
			return (<CollapsedIcon className="" aria-expanded="false" aria-label="Toggle Row" />);
		} else {
			return (<OpenIcon className="" aria-expanded="true" aria-label="Toggle Row" />);
		}
	}
}

export default Toggle;
