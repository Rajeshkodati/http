import React, { Component } from "react";
import http from "./services/httpService";
import config from "./confige.json"
import{ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import "./App.css";


class App extends Component {
  state = {
    posts: []
  };
  async componentDidMount(){
    //promise is the method for javascript callaing data in server
    // const promise = http.get('https://jsonplaceholder.typicode.com/posts');
    //async and await the new method to get respone data but async add befor the function 
    // const response = await promise;
    // console.log(response);
    //short method destructure the server call and update the data
    const {data: posts} = await http.get(config.apiEndPoint);
    this.setState({posts});
    
  }
  handleAdd = async () => {
    const obj = {title:"a", body:"b"}
    const {data:post} = await http.post(config.apiEndPoint, obj);
    const posts=[post, ...this.state.posts]
    this.setState({posts})
    //using post method for add data new items
  };

  handleUpdate = async post => {
   // update the api data
   post.title = 'Updated';
   //using put method is update entire the objectc patch spcifik property update
   await http.put(config.apiEndPoint +"/"+post.id, post);
   const posts = [...this.state.posts];
   //find the index 
    const index = posts.indexOf(post);
    posts[index] = {...post}
    this.setState({posts})
  };

  handleDelete = async post => {
    //original data
    const originalPosts = this.state.posts;
    //delete data only take id
   
    const posts = this.state.posts.filter(p => p.id !==post.id);
   
    this.setState({posts});
    //after we create create http becuse every time taking time so its work immediatly
      try{
        //throe error in server not connectc
        await http.put("s" +config.apiEndPoint +"/"+post.id);
        throw new Error("")
      } catch(ex){
        //expected errors and unexpected errors
        if(ex.response && ex.response.status === 404)
          alert("This post already remove")   
         
        //update the original data
        this.setState({posts:originalPosts});
      }
      //first go to server delete and then  comes alert and then is original data come
  };

  render() {
    return (
      <React.Fragment>
        <ToastContainer/>
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map(post => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
