export default function ListItem({ item, onMove, direction }) {
  const arrowStyle = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px'
  }

  return (
    <div className="item-card">
      <div>
        <p className="item-title">{item.name}</p>
        <p className="item-subtitle">{item.description}</p>
      </div>
      {onMove && (
        <div className="arrow-buttons">
          {(direction === 'left' || direction === 'both') && (
            <button onClick={() => onMove(item, 'left')} style={arrowStyle}>
              <img
                src="https://assets.ccbp.in/frontend/react-js/left-arrow-img.png"
                alt="left arrow"
                style={{ width: '20px' }}
              />
            </button>
          )}
          {(direction === 'right' || direction === 'both') && (
            <button onClick={() => onMove(item, 'right')} style={arrowStyle}>
              <img
                src="https://assets.ccbp.in/frontend/react-js/right-arrow-img.png"
                alt="right arrow"
                style={{ width: '20px' }}
              />
            </button>
          )}
        </div>
      )}
    </div>
  )
}
