import React, { Component } from 'react';
import './App.css';
import Message from "../components/Message/Message";
import FormMessages from "../components/FormMessage/FormMessage";


const url ='http://146.185.154.90:8000/messages';

class App extends Component {

    state = {
        messages: [],
        message: '',
        author: ''
    };

    changeMessage = (event) => {
        const currentMessage = event.target.value;
        this.setState(prevState => {
            return {message: currentMessage}
        })

    };

    changeAuthor = (event) => {
        const currentAuthor =  event.target.value;
        this.setState(prevState => {
            return {author: currentAuthor}
        })
    };

    getMessage = () => {
        fetch(url).then(resp => {
            if (resp.ok) {
                return resp.json();
            }
            throw new Error('Something went wrong with network request');
        }).then( resp => {
            console.log(resp);
            this.setState(prevState => {
                return {messages: resp.reverse()}
            })
        }).catch(error => {
            console.log(error)
        });
    };

    addMessage = () => {
        let formData = new URLSearchParams();

        formData.append('author', this.state.author);
        formData.append('message', this.state.message);

        fetch(url, {
            method: 'POST',
            body: formData
        }).then(resp => {
            if (resp.ok) {
                return resp.json();
            }
            throw new Error('Something went wrong with network request');
        }).catch(error => {
            console.log(error)
        });
    };

    getNewMessage = () => {
        const messages = [...this.state.messages];
        if (messages.length > 0) {
            const lastMessageDatetime = messages[0].datetime;
            const newUrl = url + '?datetime=' + lastMessageDatetime;

            fetch(newUrl).then(resp => {
                if (resp.ok) {
                    return resp.json();
                }
                throw new Error('Something went wrong with network request');
            }).then( resp => {
                if (resp.length !== 0) {
                    const updateMessages = resp.reverse().concat(messages);
                    this.setState(prevState => {
                        return {messages: updateMessages}
                    })
                }
            }).catch(error => {
                console.log(error)
            });
        }

    };

   updateMessage = () => {
      this.interval = setInterval(this.getNewMessage, 3000)
   };

   cancelRequest = () => {
       clearInterval(this.interval);
   };

    componentDidMount(){
        this.getMessage();
        this.addMessage();
        this.updateMessage();
    };

    componentDidUnmount() {
        this.cancelRequest();
    };


  render() {
    return (
      <div className="container">
          <FormMessages
              changeMes = {this.changeMessage}
              changeAuth = {this.changeAuthor}
              click={this.addMessage}
          />
          <div className="messages-block">
              <h3>Last Messages:</h3>
              <div className="row">
                  {this.state.messages.map(item => {
                      return(
                          <div className="col-12 col-md-6 col-lg-4 message-item"  key = {item._id}>
                              <Message
                                  message={item.message}
                                  author={item.author}
                                  datetime={item.datetime.substr(8,2) +
                                  item.datetime.substr(4,4) +
                                  item.datetime.substr(0,4) + ' ' +
                                  item.datetime.substr(11,8)}
                              />
                          </div>

                      )
                  })}
              </div>
          </div>


      </div>
    );
  }
}

export default App;
