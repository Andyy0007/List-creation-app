import { useState, useEffect } from 'react'
import useListApi from './hooks/useListApi'
import Loading from './components/Loading'
import FailureView from './components/FailureView'
import ListContainer from './components/ListContainer'
import './App.css' // Import custom CSS

function App() {
  const { data, status, fetchLists } = useListApi()
  const [localData, setLocalData] = useState([])
  const [selected, setSelected] = useState([])
  const [creating, setCreating] = useState(false)
  const [newListItems, setNewListItems] = useState([])

  useEffect(() => {
    if (status === 'success') {
      setLocalData(data)
    }
  }, [status, data])

  const toggleList = num => {
    setSelected(prev =>
      prev.includes(num) ? prev.filter(x => x !== num) : [...prev, num]
    )
  }

  const handleCreateClick = () => {
    if (selected.length !== 2) {
      alert('You should select exactly 2 lists to create a new list')
      return
    }
    setCreating(true)
  }

  const cancelCreate = () => {
    setCreating(false)
    setNewListItems([])
    setLocalData(data)
  }

  const updateLists = () => {
    setCreating(false)
    setNewListItems([])
  }

  const moveToNew = (item, origin) => {
    setLocalData(prev =>
      prev.map(i =>
        i.id === item.id ? { ...i, list_number: 3 } : i
      )
    )
    setNewListItems(prev => [...prev, { ...item, list_number: 3 }])
  }

  const moveFromNew = (item, targetListNum) => {
    setLocalData(prev =>
      prev.map(i =>
        i.id === item.id ? { ...i, list_number: targetListNum } : i
      )
    )
    setNewListItems(prev => prev.filter(i => i.id !== item.id))
  }

  if (status === 'loading') return <Loading />
  if (status === 'failure') return <FailureView onRetry={fetchLists} />

  const itemsOf = num => localData.filter(i => i.list_number === num)
  const listNums = [...new Set(localData.map(i => i.list_number))].filter(n => n !== 3)

  return (
    <div className="app-container">
      <div className="header">
        <h1>List Creation</h1>
        {!creating && (
          <div className="create-button">
            <button onClick={handleCreateClick}>Create a new list</button>
          </div>
        )}
      </div>

      <div className="lists-wrapper">
        {creating ? (
          <>
            <ListContainer
              key={selected[0]}
              title={`List ${selected[0]}`}
              items={itemsOf(selected[0])}
              direction="right"
              onMoveItem={item => moveToNew(item, selected[0])}
            />

            <ListContainer
              title="New List"
              items={newListItems}
              direction="both"
              onMoveItem={(item, dir) => {
                const target = dir === 'left' ? selected[0] : selected[1]
                moveFromNew(item, target)
              }}
            />

            <ListContainer
              key={selected[1]}
              title={`List ${selected[1]}`}
              items={itemsOf(selected[1])}
              direction="left"
              onMoveItem={item => moveToNew(item, selected[1])}
            />
          </>
        ) : (
          listNums.map(num => (
            <ListContainer
              key={num}
              title={`List ${num}`}
              items={itemsOf(num)}
              checked={selected.includes(num)}
              onCheck={() => toggleList(num)}
            />
          ))
        )}
      </div>

      {creating && (
        <div className="action-buttons">
          <button onClick={cancelCreate} className="cancel">Cancel</button>
          <button onClick={updateLists} className="update">Update</button>
        </div>
      )}
    </div>
  )
}

export default App
