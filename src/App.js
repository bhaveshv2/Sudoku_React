import React from 'react';
import generator from 'sudoku';
import Board from './Components/Board';
import produce from 'immer';

/*
    Generate the Structure for filling the above generated puzzle. 
    {
      rows: [
        {
          index:0,
          cols:[
            {
              rowNo:0,
              colNo:1,
              value:9,
              readOnly:true
            },
            {},
            {},...
          ]
        }
      ]
    }
*/

function generatePuzzle(){
  const genPuzzle = generator.makepuzzle(); 
  const genSolution = generator.solvepuzzle(genPuzzle);

  const actualPuzzle = genPuzzle.map(val=>val===null?null:val+1);
  const actualSolution = genSolution.map(e=>e+1);

  const output = {rows:[],solution:actualSolution};

  for(let i =0; i<9; i++){
    const iRow = {index:i,cols:[]}
    for(let j=0;j<9;j++){
      const value = actualPuzzle[i*9+j];
      const jCol = {
        rowNo:i,
        colNo:j,
        value:value,
        readOnly: value!==null
      }
      iRow.cols.push(jCol);
    }
    output.rows.push(iRow);
  }
  return output;
}

function checkSolution(sudoku){
  const attempted = sudoku.rows.map(row=>row.cols.map(col=>col.value)).flat();

  for(let i=0;i<attempted.length;i++){
    if(attempted[i]===null || attempted[i]!==sudoku.solution[i]){
      return false;
    }
  }
  return true;
}

class App extends React.Component {
  constructor(props){
    super(props);
    this.state=produce({},()=>({
      sudoku:generatePuzzle(),
      message:""
    }))
  }
  
  handelChange=(e)=>{
    this.setState(produce((state)=>{
      state.sudoku.rows[e.rowNo].cols[e.colNo].value=e.value;
    }))
  }

  handelSolver=e=>{
    this.setState(produce(state=>{
      state.sudoku.rows.forEach(row=>row.cols.forEach(col=>{
        col.value = state.sudoku.solution[col.rowNo*9+col.colNo]
      }))
    }))
  }

  handelChecker=e=>{
    const check = checkSolution(this.state.sudoku);
    if(check){
      this.setState({message:"Yay! You solved the Sudoku..."});
    }else{
      this.setState({message:"Nah! Please check the sudoku again..."});
    }
  }

  render(){
    return (
      <div className="App">
        <div className="heading">Sudoku - SKM</div>
        <div className="message">{this.state.message}</div>
        <Board sudoku={this.state.sudoku} onChange={this.handelChange} />
        <div className="button-class">
          <button className="solved-btn" onClick={this.handelChecker}>Checker!</button>
          <button className="solved-btn" onClick={this.handelSolver}>Solution</button>
        </div>
      </div>
    );
  }
}

export default App;
