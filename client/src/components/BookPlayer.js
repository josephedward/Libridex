import React from 'react';

function BookPlayer(props){
  return (
    <div className=" tanish">
      <iframe className="bookPlayer" title="book MP3" src={props.randomChapter.chLink}></iframe>
    </div>    
  )
}

export default BookPlayer;













// let booky = axios.get(`http://localhost:9999`).then(res => {
//   booky = res;
//   console.log(booky.data);


  
//   //   this.setState({ book});
// });

// function Book() {
//   return (
//     <div className="layout">
//       <iframe src={booky.data}></iframe>
//     </div>
//   );
// }
// export default Book;

// export default class Book extends React.Component{

// state={
//  book:[]

// }

// componentDidMount() {
//     axios.get(`/api/audiobook`)
//       .then(res => {
//         const bookData = res.data;
//         this.setState({ book:this.playRandomChapter(bookData)});
//       });
//   }


// function bookPlayer(props) {
//     return (
//         <div className="layout">
//         <iframe title="chapter player" src={this.state.book}></iframe>
//         </div>
//     )  
// }
// }
// // export default Book






//     //   <ul>
//     //     { this.state.persons.map(person => <li>{person.name}</li>)}
//     //   </ul>
//     )
//   }
//     // return(
//     //     <p className="layout">"This is the Book Component" - how to pass it the book URL??
//     //     {/* axios.get(localhost:9999); */}

//     //     </p>

//     // )
// }



// export default class PersonList extends React.Component {
//     state = {
//       persons: []
//     }

//     componentDidMount() {
//       axios.get(`https://jsonplaceholder.typicode.com/users`)
//         .then(res => {
//           const persons = res.data;
//           this.setState({ persons });
//         })
//     }

//     render() {
//       return (
//         <ul>
//           { this.state.persons.map(person => <li>{person.name}</li>)}
//         </ul>
//       )
//     }
//   }
