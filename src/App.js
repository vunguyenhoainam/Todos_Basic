import React, { useRef, useState, useEffect } from "react";
import RenderItem from "./components/RenderItem";
import "./components/css/style.css";

const App = () => {
  
  const [data, setData] = useState([
    { title: "Do the dishes", id: 0, completed: false },
    { title: "Take out the trash", id: 1, completed: false },
    { title: "Finish doing laundry", id: 2, completed: false },
  ]);

  const [search, setSearch] = useState("");
  const [filterName, setFilterName] = useState("top");
  const [filterStatus, setFilterStatus] = useState("All");

  const handleDelAll = () => {
    const delAfter = data.filter((item) => { return item.completed !== true});
    setData(delAfter);
    localStorage.setItem("keyTodos",JSON.stringify(delAfter));
  }

  // const handleCheckAll = () => {
    // const checkAfter = data.map((item) => (item))
    // console.log(checkAfter);
  // }
  
  const handleSearch = data.filter((item) => { return item.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()) })

  const handleFilterName = handleSearch.sort((a, b) => {
    const filterAfter = (filterName === "top") ? 1 : -1;
    return filterAfter * a.title.localeCompare(b.title);
  });

  const handleFilterStatus = handleFilterName.filter(item => {
    if(filterStatus === "All") return data;
    else if(filterStatus === "Complete") return item.completed === true;
    else return item.completed === false;
    // filterStatus === "Complete" ? (item.completed === true) : (item.completed === false)
  })

  const inputRef = useRef();
  const addItem = () => {
    const valueInput = inputRef.current.value;
    if (valueInput !== "") {
      const dataNew = [...data, { title: valueInput, id: Math.random(), completed: false }]
      setData(dataNew);
      localStorage.setItem("keyTodos",JSON.stringify(dataNew));
      inputRef.current.value = "";
    }
  };

  const complete = (id) => {
    const itemCompleted = data.find(item => item.id === id);
    // console.log("COM :",itemCompleted);
    itemCompleted.completed = !itemCompleted.completed;
    const completeUpdate = data.map((item) => (item.id === id ? itemCompleted : item));
    setData(completeUpdate);
    localStorage.setItem("keyTodos", JSON.stringify(completeUpdate));
  };

  const update = (dataNew, id, status) => {
    const objNew = { title: dataNew, id: id, completed: status };
    const valueUpdate = data.map((item) => (item.id === id ? objNew : item));
    setData(valueUpdate); 
    localStorage.setItem("keyTodos",JSON.stringify(valueUpdate));
  };

  useEffect(() => {
    if(JSON.parse(localStorage.getItem("keyTodos")) === null) {
      localStorage.setItem('keyTodos', JSON.stringify([]));
    } else {
      const localTodos = JSON.parse(localStorage.getItem('keyTodos'));
      setData(localTodos);
    }
  }, []);

  const clickEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addItem();
    }
  };

  return (
    <section className="container">
      <div className="header">
        <h1>My to-dos</h1>
          <div className="form-search">
            <form>
              <input 
                type="text"
                placeholder="Search..."
                autoComplete="off"
                spellCheck="false"
                onChange = { e => setSearch(e.target.value) }
              />
            </form>
          </div>
        <select name="#" className="form-filter" onChange={e => setFilterName(e.target.value)}>
          <option value="top">A - Z</option>
          <option value="down">Z - A</option>
        </select>
        <select name="#" className="form-filter" onChange={e => setFilterStatus(e.target.value)}>
          <option value="All">ALL</option>
          <option value="Complete">Complete</option>
          <option value="Uncomplete">Uncomplete</option>
        </select>
      </div>
      <div className="form-control">
        <form>
          <input
            ref={inputRef}
            type="text"
            placeholder="Create a new to-do..."
            onBlur={addItem}
            onKeyDown={clickEnter}
            autoComplete="off"
            spellCheck="false"
          />
        </form>
      </div>
      <div className="btn-del" onClick={handleDelAll}>
        <p>Delete All</p>
      </div>
      <div className="list-element">
        <ul>
          {handleFilterStatus.map((item, index) => (
            <li key={item.id}>
              <RenderItem
                index={index}
                item={item}
                data={data}
                setData={setData}
                update={update}
                complete={complete}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default App;
