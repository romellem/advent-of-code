import React from 'react';
import { VALID_OPS } from './Device';

const InstructionCount = ({ intructionCount } = {}) => {
	return (
		<div style={{ marginLeft: '1em' }}>
			<b>Instruction Count</b>
			<ul style={{ margin: 0, paddingLeft: '10px' }}>
				{VALID_OPS?.map((v) => (
					<li key={v}>{v}: {intructionCount[v]}</li>
				))}
			</ul>
		</div>
	);
};

export default InstructionCount;
