import React from "react";

interface Props {
	className: string;
}

class CalendarIcon extends React.Component<Props> {
	render() {
		return (
			<svg
				className={this.props.className}
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 576 512"
				width="20"
				height="20"
			><path fill="white" d="M128 0C110.3 0 96 14.3 96 32V64H48C21.5 64 0 85.5 0 112v48H448V112c0-26.5-21.5-48-48-48H352V32c0-17.7-14.3-32-32-32s-32 14.3-32 32V64H160V32c0-17.7-14.3-32-32-32zM256 368c0-91.8 70.3-167.2 160-175.3V192H0V464c0 26.5 21.5 48 48 48H330.8C285.6 480.1 256 427.5 256 368zM432 512a144 144 0 1 0 0-288 144 144 0 1 0 0 288zm16-208v48h48c8.8 0 16 7.2 16 16s-7.2 16-16 16H448v48c0 8.8-7.2 16-16 16s-16-7.2-16-16V384H368c-8.8 0-16-7.2-16-16s7.2-16 16-16h48V304c0-8.8 7.2-16 16-16s16 7.2 16 16z"/></svg>
		);
	}
};

export default CalendarIcon;
