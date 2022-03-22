import React from 'react'
import { Button, Box } from '@mui/material'

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
  			    	if(!e.target.value||/^-?\d*\.?\d*$/.test(e.target.value)){
  			    	    matrix[index][ind]=e.target.value.replace(/^0(?=[0-9])/, '').replace(/^-0(?=[0-9])/,'-');
  			    	    this.setState({matrix});
  			    	}else{
  			    	    e.preventDefault();
  			    	}
  			    }}
  			    onKeyPress={(e) => !/[0-9-]/.test(e.key) && e.preventDefault()}/>
  		</td>
  	)
  	} )
  }
  
  submit = () => {
  	let answer = this.state.matrix.slice().map(row => row.map(val =>
  	{
  		let newVal = parseInt(!((val.length==1 || (val.length==2 && val[1]=='0')) && val[0]=='-') ? val : "0");
  		return isNaN(newVal)?0:newVal; 
  	}))
  	this.props.onSubmit(answer);
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
  	<Button onClick={() => {
  		let newMatrix = Array(parseInt(this.state.rowSize)).fill(0).map(row => new Array(parseInt(this.state.colSize)).fill(0))
  		for(var i = 0; i<Math.min(this.state.rowSize, this.state.matrix.length); i++)
  			for(var j = 0; j<Math.min(this.state.colSize, this.state.matrix[0].length); j++)
  				newMatrix[i][j]=this.state.matrix[i][j]
  		this.setState({matrix: newMatrix});}}>
  		Resize
  	</Button>
        <table className="">
          <tbody>
            {this.renderMatrix()}
          </tbody>
        </table>
      <Box sx={{ mb: 10 }}>
      	<Button variant="contained" onClick={this.submit}>Submit</Button>
      </Box>
      </div>
  	);
  }
}
