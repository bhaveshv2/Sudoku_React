import React from "react";
import Block from "./Block";

class Board extends React.Component{
    render(){
        const {sudoku,onChange} = this.props;
        return(
            <div className="board">
                {
                    sudoku.rows.map((row)=><div className="row" key={row.index}>
                        {row.cols.map((block)=> <Block block={block} key={block.colNo} onChange={onChange}  />)}
                    </div>
                    )
                }
            </div>
        );
    }
}

export default Board;