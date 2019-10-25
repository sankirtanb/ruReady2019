import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Game extends React.Component {

  constructor() {
    super();
    this.state = {
      news: []
    }
    this.getData()
  }

  getData() {
    var xhr = new XMLHttpRequest()

    // get a callback when the server responds
    xhr.addEventListener('load', () => {
      // update the state of the component with the result here
      let values = xhr.responseText
      let jsonValues = JSON.parse(values)
      // arrayToSend = values.news;
      this.setState({
        news: jsonValues.news
      });
      console.log("array " + JSON.stringify(jsonValues.news));
    })
    // open the request with the verb and the url
    xhr.open('GET', 'http://localhost:5000/get')
    // send the request
    xhr.send()
  }

  render() {



    // let status;
    // if (winner) {
    //   status = 'Winner: ' + winner;
    // } else {
    //   status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    // }
    console.log("from state " + JSON.stringify(this.state.news));
    const moves = this.state.news.map((eachnews) => {
      console.log("eachnews:    ::  " + JSON.stringify(eachnews));
      return ( <
        div className = "card" >
        <
        img src = {
          eachnews.imgsrc
        }
        className = "card-img-top"
        alt = "..." / >
        <
        div className = "card-body" >
        <
        h5 className = "card-title" > {
          eachnews.title
        } < /h5> <
        p className = "card-text" > {
          eachnews.body
        } < /p> <
        p className = "card-text" > < small className = "text-muted" > Last updated 3 mins ago < /small></p >
        <
        /div> < /
        div >
      );
    });

    return (
      // <div className="game">
      //   <div className="game-board">
      //     <Board
      //       squares={current.squares}
      //       onClick={(i) => this.handleClick(i)}
      //     />
      //   </div>
      //   <div className="game-info">
      //     <div>{status}</div>
      //     <ol>{moves}</ol>
      //   </div>
      // </div>

      <
      div > {
        moves
      } < /div>
      // <
      // div class = "card" >
      // <
      // img src = "https://bilder1.n-tv.de/img/incoming/crop21351324/1718675448-cImg_4_3-w250/imago43382643h.jpg"
      // class = "card-img-top"
      // alt = "..." / >
      // <
      // div class = "card-body" >
      // <
      // h5 class = "card-title" > Card title < /h5> <
      // p class = "card-text" > This is a wider card with supporting text below as a natural lead - in to additional content.This content is a little bit longer. < /p> <
      // p class = "card-text" > < small class = "text-muted" > Last updated 3 mins ago < /small></p >
      // <
      // /div> < /
      // div >
    );
  }
}

// ========================================

ReactDOM.render( <
  Game / > ,
  document.getElementById('root')
);





/*








//
// class Dispatchcard extends React.Component {
//   constructor() {
//
//   }
//
//   ReactDOM.render(element, document.getElementById('root'));
// }
//
// class Game extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       history: [{
//         squares: Array(9).fill(null)
//       }],
//       stepNumber: 0,
//       xIsNext: true
//     };
//   }
//
//   handleClick(i) {
//     const history = this.state.history.slice(0, this.state.stepNumber + 1);
//     const current = history[history.length - 1];
//     const squares = current.squares.slice()
//     if (calculateWinner(squares) || squares[i]) {
//       return;
//     }
//     squares[i] = this.state.xIsNext ? 'X' : 'O'
//     this.setState({
//       history: history.concat([{
//         squares: squares,
//       }]),
//       stepNumber: history.length,
//       xIsNext: !this.state.xIsNext
//     })
//   }
//
//   jumpTo(step) {
//     this.setState({
//       stepNumber: step,
//       xIsNext: (step % 2) === 0,
//     })
//
//   }
//
//   render() {
//     const history = this.state.history;
//     const current = history[this.state.stepNumber];
//     const winner = calculateWinner(current.squares)
//
//     const moves = history.map((step, move) => {
//       const desc = move ? 'GO TO MOVE: #' + move : 'Go To start'
//       return ( < li key = {
//           move
//         } >
//         <
//         button onClick = {
//           () => this.jumpTo(move)
//         } > {
//           desc
//         } < /button> < /
//         li > )
//
//     })
//
//     let status;
//     console.log(winner);
//     if (winner) {
//       console.log("You won! " + winner);
//       status = "You won! " + winner;
//     } else {
//       status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
//     }
//
//
//     return ( <
//       div className = "game" >
//       <
//       div className = "game-board" >
//       <
//       Board squares = {
//         current.squares
//       }
//       onClick = {
//         (i) => {
//           this.handleClick(i)
//         }
//       }
//       / > < /
//       div > <
//       div className = "game-info" >
//       <
//       div > {
//         status
//       } < /div> <
//       ol > {
//         moves
//       } < /ol> < /
//       div > <
//       /div>
//     );
//   }
// }


//{// class Square extends React.Component {
//   // constructor(props) {
//   //   super(props);
//   // }
//   render() {
//     return ( <
//       button className = "square"
//       onClick = {
//         () => {
//           this.props.onClick()
//         }
//       } > {
//         this.props.value
//       } <
//       /button>
//     );
//   }
// }
//
//
//
// function calculateWinner(squares) {
//   const lines = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6]
//   ];
//
//   for (let i = 0; i < lines.length; i++) {
//     const [a, b, c] = lines[i]
//     if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
//       console.log("winner winner chicken dinner!");
//       return squares[a]
//     }
//   }
//   return null;
// }
//
// class Board extends React.Component {
//   // constructor(props) {
//   //   super(props);
//   //   this.state = {
//   //     squares: Array(9).fill(null),
//   //     xIsNext: true
//   //   };
//   // }
//
//
//
//   renderSquare(i) {
//     return <Square value = {
//       this.props.squares[i]
//     }
//     onClick = {
//       () => {
//         this.props.onClick(i)
//       }
//     }
//     / > ;
//   }
//
//
//   render() {
//     // const winner = calculateWinner(this.props.squares)
//
//
//     return ( < div >
//       <
//       div className = "board-row" > {
//         this.renderSquare(0)
//       } {
//         this.renderSquare(1)
//       } {
//         this.renderSquare(2)
//       } < /div> <
//       div className = "board-row" > {
//         this.renderSquare(3)
//       } {
//         this.renderSquare(4)tps://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
// <script src="htt
//       } {
//         this.renderSquare(5)
//       } <
//       /div> <
//       div className = "board-row" > {
//         this.renderSquare(6)
//       } {
//         this.renderSquare(7)
//       } {
//         this.renderSquare(8)
//       } <
//       /div> < /
//       div >
//     );
//   }
// }
//
//
//
//
// // ========================================
//
// ReactDOM.render( <
// Game / > ,
//   document.getElementById('root')
// );
//
//
// // function tick() {
//   const element = ( < div >
//     <
//     h1 > Welcome Sir < /h1> <
//     h2 > the time here is {
//       new Date().toLocaleTimeString()
//     } <
//     /h2> < /
//     div >
//   );
//   ReactDOM.render(element, document.getElementById('root'));
// }
//
// setInterval(t)
//}
*/
