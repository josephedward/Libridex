import React from "react";
// import axios from 'axios';

function Author(props){

  return (
                   <div className="layout border">
                     <h5>Author</h5>
                   {props.author}
                   </div>
               )  


}

export default Author;
// export default class Author extends React.Component{


//     state={
//         author:[]
       
//     }
       

//        //test visiting to get whole object since book is working

//        componentDidMount() {
//            axios.get(`/api/audiobook`)
//              .then(res => {
//                const bookData = res.data;
//                console.log(bookData);
//                this.setState({ author:bookData.bkAuthor});
//              });
//          }
       
//          render() {
//            return (
//                <div className="layout">
//                <p>{this.state.author}</p>
//                </div>
//            )  
//        }


// }

// function Author (){
//     return(
//             <p className="layout">"this is the Author component" - have to pass it the author name</p>
//     )
// }


// export default Author