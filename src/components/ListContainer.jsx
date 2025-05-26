// src/components/ListContainer.jsx
import ListItem from './ListItem'

export default function ListContainer({
  title,
  items,
  checked,
  onCheck,
  onMoveItem,
  direction,
}) {
  return (
    <div className="list-container">
      {onCheck && (
        <label className="list-title">
          <input
            type="checkbox"
            checked={checked}
            onChange={onCheck}
            style={{ marginRight: '0.5rem' }}
          />
          {title}
        </label>
      )}
      {!onCheck && <div className="list-title">{title}</div>}

      {items.map(item => (
        <ListItem
          key={item.id}
          item={item}
          onMove={onMoveItem}
          direction={direction}
        />
      ))}
    </div>
  )
}
