import React from "react";
// import axios from 'axios';



function Description (props){

  return (
                   <div className="layout border">
                     <h5>Description</h5>
                   <p>{props.description}</p>
                   </div>
         )  
}


export default Description;








// export default class Description extends React.Component{


//     state={
//         description:[]
       
//        }
       

//        //test visiting to get whole object since book is working

//        componentDidMount() {
//            axios.get(`/api/audiobook`)
//              .then(res => {
//                const bookData = res.data;
//                console.log(bookData);
//                this.setState({ description:bookData.bkDescription});
//              });
//          }
       
//          render() {
//            return (
//                <div className="layout">
//                <p>{this.state.description}</p>
//                </div>
//            )  
//        }
//     }

// function Description (){
//     return(
// <p className="layout">"This is the description component" - have to pass it the description</p>
//     )
// }

// export default Description