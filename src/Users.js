import React,{useState,useEffect} from "react";
import DataTable, {createTheme} from "react-data-table-component";

export const Users = () => {
const [page,setPage]=useState(1);
const [rows,setRows]=useState();
const [order,setOrder]=useState("");
const [sortMod,setSortMod]=useState("")
const [perPage,setPerPage]=useState(10)
const [users, setUsers] = useState([]);

useEffect(()=>{
  fetch("/users/"+page+"?perPage="+perPage+"&order="+order+"&mod="+sortMod).then(response =>
    response.json().then(data =>{
      setUsers(data.users);
    })
  );
},[page,order,sortMod,perPage])  

useEffect(()=>{
    fetch("/numberOfUsers").then(response =>
      response.json().then(data =>{
        setRows(data.allUsers);
      })
    );
  },[rows])  

const columns = [
  {
    name: "Name",
    selector: "name",
    sortable: true,
    width: '30%',
  },
  {
    name: "Surname",
    selector: "surname",
    sortable: true,
    left: true,
    width: '30%',
  },
  {
    name: "Numbers",
    cell: row => <PhoneNumbers numbers={row.numbers} />,
    sortable: false,
    left: true

  }
];

const handlePageChange = page => {
  setPage(page);
};

const handleOrderChange = (column, sortDirection) => {
  setOrder(column.selector);
  setSortMod(sortDirection);
  console.log(sortDirection);
};

const handlePerRowsChange = newPerPage => {
  setPerPage(newPerPage);
};



return (
<DataTable
 title="Users' data"
 columns={columns}
 data={users}
 pagination
 paginationServer
 paginationTotalRows={rows}
 paginationDefaultPage={page}
 onChangeRowsPerPage={handlePerRowsChange}
 onChangePage={handlePageChange}
 onSort={handleOrderChange}
 sortServer
 theme="custom_theme"
 />
);

}

function PhoneNumbers(props) {
  return (
    <table >
      <tbody>
        {props.numbers.map((number,idx)=>
          <tr key={idx}>
            <td className="type"><b>{number.type}</b></td>
            <td className="phone">{number.phoneNumber}</td>
          </tr>)}
      </tbody>
    </table>
  );
}

createTheme('custom_theme', {
  text: {
    primary: 'black',
    secondary: 'green',
  },
  background: {
    default: 'white',
  },
  context: {
    background: '#E91E63',
    text: 'grey',
  },
  divider: {
    default: '#4CAF50',
  },
  button: {
    default: 'green',
    focus: 'rgba(255, 255, 255, .54)',
    hover: 'lightgreen',
    disabled: 'grey',
  },
  sortFocus: {
    default: 'green',
  },
  selected: {
    default: 'rgba(0, 0, 0, .7)',
    text: '#FFFFFF',
  },
  highlightOnHover: {
    default: 'rgba(0, 0, 0, .7)',
    text: '#FFFFFF',
  },
  striped: {
    color: 'green',
    text: '#FFFFFF',
  },
});
