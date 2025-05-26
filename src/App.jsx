// src/App.jsx
import { useState } from 'react'
import useListApi from './hooks/useListApi'
import Loading from './components/Loading'
import FailureView from './components/FailureView'
import ListContainer from './components/ListContainer'

function App() {
  const { data, status, fetchLists } = useListApi()
  const [selected, setSelected] = useState([])      // which two lists are checked
  const [creating, setCreating] = useState(false)   // are we in “create mode”?
  const [newListItems, setNewListItems] = useState([])

  // toggle checkbox
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
  }

  const updateLists = () => {
    // merge newListItems into data – here you’d usually send API update
    // For now just exit “create mode”
    setCreating(false)
    setNewListItems([])
  }

  // move an item from one list to the “new” list (list_number = 3)
  const moveToNew = (item, origin) => {
    setData(prev =>
      prev.map(i =>
        i.id === item.id ? { ...i, list_number: 3 } : i
      )
    )
    setNewListItems(prev => [...prev, item])
  }

  // move item from new list back to selected[0] or selected[1]
  const moveFromNew = (item, targetListNum) => {
    setData(prev =>
      prev.map(i =>
        i.id === item.id ? { ...i, list_number: targetListNum } : i
      )
    )
    setNewListItems(prev => prev.filter(i => i.id !== item.id))
  }

  if (status === 'loading') return <Loading />
  if (status === 'failure') return <FailureView onRetry={fetchLists} />

  // helper: items in a given list number
  const itemsOf = num => data.filter(i => i.list_number === num)

  // get the two list numbers available in the fetched data
  const listNums = [...new Set(data.map(i => i.list_number))]

  return (
    <div className="p-6">
      <h1 className="list-header">List Creation</h1>

      {!creating && (
        <div className="text-center mb-4">
          <button
            onClick={handleCreateClick}
            className="button"
          >
            Create a new list
          </button>
        </div>
      )}

      <div className="lists-wrapper">
        {/* render each existing list container */}
        {listNums.map(num => (
          <ListContainer
            key={num}
            title={`List ${num}`}
            items={itemsOf(num)}
            checked={!creating ? selected.includes(num) : false}
            onCheck={!creating ? () => toggleList(num) : null}
            direction={
              creating
                ? num === selected[0]
                  ? 'right'
                  : num === selected[1]
                  ? 'left'
                  : null
                : null
            }
            onMoveItem={
              creating && (num === selected[0] || num === selected[1])
                ? item => moveToNew(item, num)
                : null
            }
          />
        ))}

        {/* middle “new list” when creating */}
        {creating && (
          <ListContainer
            title="New List"
            items={newListItems}
            direction="both"
            onMoveItem={item => {
              // decide target: left or right based on current placement
              const target =
                item.list_number === selected[0]
                  ? selected[1]
                  : selected[0]
              moveFromNew(item, target)
            }}
          />
        )}
      </div>

      {creating && (
        <div className="text-center mt-6 space-x-4">
          <button
            onClick={cancelCreate}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Cancel
          </button>
          <button
            onClick={updateLists}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Update
          </button>
        </div>
      )}
    </div>
  )
}

export default App
