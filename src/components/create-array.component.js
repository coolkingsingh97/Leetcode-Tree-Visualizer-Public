import React, { Component } from 'react';
// import publicIp from "public-ip";
import Tree from 'react-d3-tree';
import './custom-tree.css';
import './create-array.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
//const WIDTH = 70;
//const HEIGHT = 80;
// var treedata = 
//   {
//     name: '1',
//     children: [
//       {
//         name: '2',
//         children: [
//           {
//             name: '4',
//             children:[]
//           },
//           {
//             name: '5',
//             children:[]
//           }
//         ],
//       },
//       {
//         name: '3',
    
//         children: [
//           {
//             name: '6',
//             children:[]
//           },
//         ],
//       },
//     ],
//   };

// const orgChart = {
//   name: 'CEO',
//   children: [
//     {
//       name: 'Manager',
//       attributes: {
//         department: 'Production',
//       },
//       children: [
//         {
//           name: 'Foreman',
//           attributes: {
//             department: 'Fabrication',
//           },
//           children: [
//             {
//               name: 'Worker',
//             },
//           ],
//         },
//         {
//           name: 'Foreman',
//           attributes: {
//             department: 'Assembly',
//           },
//           children: [
//             {
//               name: 'Worker',
//             },
//           ],
//         },
//       ],
//     },
//   ],
// };


// export const getClientIp = async () => await publicIp.v4({
//   fallbackUrls: [ "https://ifconfig.co/ip" ]
// });


export default class CreateArray extends Component {
  constructor(props) {
    super(props);
    this.onChangeArray = this.onChangeArray.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    
    this.state = {
      ip_address: '',
      array: [],
      treemap:{},
      country: '',
      city:''
    }
  }
  
  getGeoInfo = () => {
    axios.get('https://ipapi.co/json/').then((response) => {
        let data = response.data;
        this.setState({
            ip_address : data.ip,
            country: data.country_name,
            city: data.city
        });
        //console.log(data)
    }).catch((error) => {
        console.log(error);
    });
};
  

  componentDidMount() {
  //   publicIp.v4()
  // .then(ip => {
  //   // ip is the value, do your logic here
  //   this.setState({ 
  //     ip_address: ip
  //   });
  // })
  // .catch(error => {
  //   // if it throws an error, you can catch it and suppress it here
  //   throw error;
  // });
  
  this.getGeoInfo();


  };

  onChangeArray(e) {
    this.setState({
      array: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
  
    const array_var = {
      array: this.state.array,
      ip_address: this.state.ip_address,
      country : this.state.country,
      city: this.state.city
    };
    
  
  const ip = {"ip_address": array_var.ip_address, "country" : array_var.country, "city":array_var.city}
  //console.log(ip);
  axios.post('https://animated-stardust-e9718e.netlify.app/.netlify/functions/server/ip/add', ip).then(res => console.log(res.data));
  
  // Binary Tree Algorithm //
  function list_to_tree(list,i,map) {
		
    if (map === undefined) {
      map = {"name":"null"};
      }
    
    
    
    if (i < list.length) {
      
      map = {
              "name": list[i],
              "children":[]
            };
      

            //console.log(map.name)
            //console.log(map)
            if (2*i+1 < list.length  ) {
              
                              
            map.children.push(list_to_tree(list,2*i+1,map.children[0]));}
            if (2*i+2 < list.length  ){
            map.children.push(list_to_tree(list,2*i+2,map.children[1])); 
            }
      // initialize the children
      }
      console.log(map.name)
      return map;
      
    }




// const treedata = this.state.map;
// console.log(list_to_tree([1,2,3,4,6,7],0,treemap1));
var string_arr = this.state.array.split(",");
var numberArray = [];
var len = 0;
len = string_arr.length;
  
for (var i = 0; i < len; i++){
  
  numberArray.push(parseInt(string_arr[i]));
}
    // Print the array of numbers
//console.log(numberArray);

const arr = {"arr" : numberArray};
//console.log(arr);
axios.post('https://animated-stardust-e9718e.netlify.app/.netlify/functions/server/array/add', arr).then(res => console.log(res.data));

var treemap1 = {};
this.setState({
  treemap : list_to_tree(numberArray,0,treemap1)
});
//console.log(list_to_tree(numberArray,0,treemap1))
// Binary Tree Algorithm // 
    
    //console.log(ipv4.Promise);
    //window.location = '/';
  }
  render() {
    const treedata_dynamic = this.state.treemap
    return (
      <>
      <div>
        
        
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <div class="form-element">
            <h6> Please enter an array without the brackets and just the elements of your array seperated by a comma. Please see examples below...  </h6>
            <br></br>
            <ul>
            <li> 1,2,3,4,5,6,7</li>
            
            <li> 1,2,,,5 (for null nodes leave blank)</li>
            </ul>
            </div>
            
            <input  type="text"
                required
                className="form-control"
                pattern='^\d[,\d]*'
                value={this.state.array}
                onChange={this.onChangeArray}
            />
          </div>
          <br></br>
          <div className="form-group">
            <input type="submit" value="Create Binary Tree" className="btn btn-primary" />
          </div>
        </form>
      </div>


      <div class="container" id="treeWrapper" style={{ width: "90em", height: "90em"}}>
      <Tree data={treedata_dynamic} 
        rootNodeClassName="node__root"
        branchNodeClassName="node__branch"
        leafNodeClassName="node__leaf"
        orientation= "vertical"
        pathFunc={"straight"}
        translate = {{x: 600 ,y: 100}}
        //dimensions = {{height : 10,width :0}}
      />
    </div>
    </>
    )
  }
}

