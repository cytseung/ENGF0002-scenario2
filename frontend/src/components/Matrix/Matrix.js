import React from 'react'
import { Button } from '@mui/material'

export default class Matrix extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rowSize: "2",
      colSize: "2",
      matrix: [["0","0"],["0","0"]]
    }
  }
  
  renderRow(index) {
	  const matrixInputStyle={
	    minWidth: '7.4ch',
	    maxWidth: '7.4ch',
	    };
  	return this.state.matrix[index].map((val, ind) => {return(
  		<td key={"td"+index+ind}>
  			<input
  			    type="text"
  			    key={"val"+index+ind}
  			    maxLength="6"
  			    style={matrixInputStyle}
  			    value={this.state.matrix[index][ind]}
  			    onChange={(e) => {
  			    	let matrix = [...this.state.matrix];
  			    	matrix[index][ind]=e.target.value;
  			    	this.setState({matrix});
  			    }}
  			    onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}/>
  		</td>
  	)
  	} )
  }
  
  renderMatrix() {
  	return this.state.matrix.map((_, index) => {return(
  	       <tr key={"row"+index}>
  			{this.renderRow(index)}
                </tr>
                )})
  }
  
  render() {
  	const matrixInputStyle={
	    minWidth: '3.4ch',
	    maxWidth: '3.4ch',
	    };
  	return (
  	<div>
  	<input
  	    style={matrixInputStyle}
  	    maxLength="2"
  	    type="text"
  	    value={this.state.rowSize}
  	    onChange={(e) => this.setState({rowSize: e.target.value})}
  	    onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
  	    />
  	<input
  	    style={matrixInputStyle}
  	    maxLength="2"
  	    type="text"
  	    value={this.state.colSize}
  	    onChange={(e) => this.setState({colSize: e.target.value})}
  	    onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
  	    />
  	<Button onClick={() => {this.setState({matrix: Array(parseInt(this.state.rowSize)).fill(0).map(row => new Array(parseInt(this.state.colSize)).fill(0))});}}>
  		Resize
  	</Button>
        <table className="">
          <tbody>
            {this.renderMatrix()}
          </tbody>
        </table>
      </div>
  	);
  }
}
