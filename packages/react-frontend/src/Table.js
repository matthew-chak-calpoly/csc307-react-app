function TableHeader() {
    return (
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Job</th>
          <th>Remove</th>
        </tr>
      </thead>
    );
  }
  
  function TableBody(props) {
    // NOTE: index shouldn't be used here as a key...
    const rows = props.characterData.map((row, index) => {
      return (
        <tr key={row._id}>
            <td>{row._id}</td>
            <td>{row.name}</td>
            <td>{row.job}</td>
            <td>
                <button onClick={() => props.removeCharacter(index)}>
                Delete
                </button>
            </td>
        </tr>
      );
     }
    );
    return (
        <tbody>
          {rows}
         </tbody>
     );
  }

function Table(props) {
    return (
      <table>
        <TableHeader />
        <TableBody characterData={props.characterData} removeCharacter={props.removeCharacter}/>
      </table>
    );
}

export default Table;