import React from "react";

class Block extends React.Component{
    handelBlock=(e)=>{
        const value = e.target.value===""?null:parseInt(e.target.value,10);      //change the value to integer if string got the input
        this.props.onChange({...this.props.block,value:value});
    }

    render(){
        const {block} = this.props;
        return(
            <input className="block" value={block.value || ""} readOnly={block.readOnly} onChange={this.handelBlock} />
        );
    }
}

export default Block;