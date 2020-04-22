import React, { Component } from 'react'

export class Library extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            libraries : [],
            booksByLibId:[]
        }
    }
    componentDidMount() {
        fetch('http://localhost:8080/alllibraries',{    method: 'GET',
    })
        .then(res => res.json())
        .then((data) => {
            console.log(data);
          this.setState({ libraries: data })
        })
        .catch(console.log)
      }
      


    
    render() {
        return (
            <div>
                 <h3>Libraries</h3>
               {
                   this.state.libraries.map((lib)=>
                   <button key={lib.libId} onClick={this.handleClick.bind(this,lib.libId)}>{lib.libName}</button>
                  
                   )
               }
               <div>
            {(this.state.booksByLibId.length > 0) ? this.state.booksByLibId.map((book)=>
            <li key={book.bookId}>{book.bookName}</li>
            ):<h4>Select Library to get books</h4>
    }
            </div>
            </div>
        )
    }
    handleClick =(libId)=>
    {
        console.log("clicked"+libId);
        fetch('http://localhost:8080/getbooks/'+libId,{    method: 'GET',
    })
        .then(res => res.json())
        .then((data) => {
            console.log(data);
          this.setState({ booksByLibId: data })
        })
        .catch(console.log)
    }
}

export default Library
